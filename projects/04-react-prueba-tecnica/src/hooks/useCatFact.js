import { useState, useEffect } from "react"
import { getRandomFact } from "../services/facts"

//Evitar en los custom hooks poner en el nombre la implementación
export function useCatFact() {
    const [fact, setFact] = useState("lorem ipsum fact whatever")

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(refreshFact, [])

    return { fact, refreshFact }
}