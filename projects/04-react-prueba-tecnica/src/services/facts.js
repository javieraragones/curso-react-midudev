const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

//función asíncrona
export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const data = await res.json() //Devuelve una promise, por eso usamos await
    const { fact } = data
    return fact
}



//función síncrona 
/*
export const getRandomFact = () => {
    return fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            // TODO : handle error if !res.ok
            if (!res.ok) {
                return ("No se ha podido recuperar la cita")
            }
            return res.json()
        })
        .then(data => {
            const { fact } = data
            return fact
        })
        .catch((err) => {
            //tanto si hay un error con la respuesta 
            //como si hay un error con la petición
            console.log(err)
        })
}
*/