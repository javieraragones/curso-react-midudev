import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'


//custom hook que se preocupa de hacer el fetching de datos de la película
export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [, setError] = useState(null)
    const previousSearch = useRef(search) //evita la misma búsqueda

    //usamos useMemo para que no se ejecute la función con cada cambio en la búsqueda o el sort
    //Usando useMemo
    /*
    const getMovies = useMemo(() => {
        //al inyectar el search por parámetro, no hace falta indicar las dependencias
        return async ({ search }) => {
            if (search === previousSearch.current) return

            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search //evita la misma búsqueda
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                //se ejecuta tanto en el try como en el catch
                setLoading(false)
            }
        }
    }, [])
*/

    //Usando useCallback (utiliza por debajo useMemo)
    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = search //evita la misma búsqueda
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            //se ejecuta tanto en el try como en el catch
            setLoading(false)
        }
    }, [])


    //Esto hace que se ejecute cada vez al no usar usar useMemo
    /* 
        const sortedMovies = sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) //con localeCompare evitamos errores con los acentos
            : movies
    */
    //Se ejecuta cada vez que sea necesario - No abusar, usar si realmente hay un problema de rendimiento
    //useMemo-> para memorizar computaciones que hemos hecho que queremos evitar que se hagan a no ser que cambien las dependencias que le indicamos
    const sortedMovies = useMemo(() => {  //esta computación se hace cuando cambia la información que queremos (las dependencias)
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) //con localeCompare evitamos errores con los acentos
            : movies
    }, [sort, movies])


    return { movies: sortedMovies, getMovies, loading }
}
