//import { useEffect, useState } from "react"  ->no me hace falta con la lógica en la carpeta hooks
//import { getRandomFact } from "./services/facts"->no me hace falta, lo importo en hooks/useCatFact
import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from "./hooks/useCatFact"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = `https://api.thecatapi.com/v1/images/search`
const CAT_PREFIX_IMAGE_URL = `https://cataas.com/`

export function App() {
    //const [fact, setFact] = useState("lorem ipsum fact whatever") //dejo de usarlo porque lo realizo en un custom hook
    //const [factError, setFactError] = useState() manejo de errores en services/facts.js
    const { fact, refreshFact } = useCatFact()
    const { imageURL } = useCatImage({ fact }) //obtenemos imageURL del custom hook
    //aprender fetch ya que a veces no puedes usar dependencias (React Query, SWR, axios, apollo)
    //--Código terminado usando un useEffect antes de mejoras--
    /*
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(data.fact)

                const firstWord = fact.split(" ")[0]
                const threeWords = fact.split(" ").splice(0, 3).join(" ")
                //las tres palabras se pasan en el fetch a la api pero la del ejercicio no funciona,
                //por lo que se va a usar una api que devulve imágenes aleatorias

                fetch(CAT_ENDPOINT_IMAGE_URL)
                    .then(res => res.json())
                    .then(response => {
                        const { url } = response[0]
                        setImageURL(url)
                    })
            }
            )
    }, [])//solo se ejecuta el useEffect la primera vez que se monta el componente

    //--Mejoras al código usando dos useEffect--
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                // TODO : handle error if !res.ok
                if (!res.ok) {
                    setFactError("No se ha podido recuperar la cita")
                }
                return res.json()
            })
            .then(data => {
                const { fact } = data
                setFact(data.fact)
            })
            .catch((err) => {
                //tanto si hay un error con la respuesta 
                //como si hay un error con la petición
                console.log(err)
            })
    }, [])
    //Efecto para recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(" ")[0]
        const threeFirstWords = fact.split(" ", 3).join(" ")
        console.log(threeFirstWords)
        //las tres palabras se pasan en el fetch a la api pero la del ejercicio no funciona,
        //por lo que se va a usar una api que devulve imágenes aleatorias
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                const { url } = response
                setImageURL(url)
            })
    }, [fact])
*/

    //Obtener random fact con la función que se encuentra en el archivo facts.js con la lógica
    //dejo de usarlo porque lo realizo en un custom hook useCatFact
    /*
    useEffect(async () => {
        //getRandomFact().then(setFact) puede ser una mala práctica
        getRandomFact().then(newFact => setFact(newFact))
    }, [])
    const handleClick = async () => {
        const newFact = await getRandomFact()
        setFact(newFact)
    }
*/

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main /*style={{
            display: 'flex', alignItems: 'center', flexDirection: 'column'
        }}*/>
            <h1>Random Cat Fact</h1>

            <button onClick={handleClick}>Get new fact</button>

            {fact && <p>{fact}</p>/*renderizado condicional*/}
            {imageURL && <img src={imageURL} alt={`Image extracted using the first three words for ${fact}`} />}
        </main >
    )
}
