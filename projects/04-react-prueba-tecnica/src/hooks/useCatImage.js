import { useEffect, useState } from "react"
const CAT_PREFIX_IMAGE_URL = `https://cataas.com/`

//Custom hook !!tiene que empezar por use- 
//Diferencia con una función-> podemos usar hooks (useState)
//mandar el fact como objeto es una buena práctica
export function useCatImage({ fact }) {
    const [imageURL, setImageURL] = useState()

    //Efecto para btener imagen dado un random fact
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

    return { imageURL: `${CAT_PREFIX_IMAGE_URL}${imageURL}` }
} // devuelve imageURL
