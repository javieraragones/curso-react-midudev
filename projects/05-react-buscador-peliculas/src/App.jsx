//import { useState } from 'react'
import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  //Controlar formulario con useEffect
  useEffect(() => {
    //usamos useRef para que al entrar por primera vez no muestre error
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película por un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener almenos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  //const { movies } = useMovies()
  //forma de hacerlo al hacer click en el botón
  /*
  const inputRef = useRef()
  const handleClick = () => {
    const inputEl = inputRef.current
    const value = inputEl.value
    alert(value)
  }
  */

  //manejar formulario de forma no controlada con el DOM
  /*
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries( //Si tenemos más de un input 
      new window.FormData(event.target) //FormData para recuperar todos los datos del formulario
    )
  }
  
  //manejar formulario de forma controlada con react useState
  //const [query, setQuery] = useState('')
  //const [error, setError] = useState(null)
  /*
  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return //prevalidación para que no empiece por espacio
    setQuery(event.target.value)
    //Podemos controlar la entrada aquí o en un useEffect
    if (newQuery === '') {
      setError('No se puede buscar una película vacía')
      return
    }
  
    if (newQuery.match(/^\d+$/)) {
      setError('No se puede buscar una película por un número')
      return
    }
  
    if (newQuery.length < 3) {
      setError('La búsqueda debe tener almenos 3 caracteres')
      return
    }
    setError(null)
  }
  */


  //---------------Ejercicio final con fetch---------------//
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debouncedGetMovies(newSearch) //búsqueda cada vez que escribimos
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} onChange={handleChange} value={search} name="query" placeholder='Avengers, Star Wars...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
