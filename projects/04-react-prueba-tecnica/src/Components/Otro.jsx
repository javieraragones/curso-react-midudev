import { useCatImage } from "../hooks/useCatImage"

//Podemos usar este componente para la imagen
export function Otro() {
    const { imageURL } = useCatImage({ fact })

    return (
        <>
            {imageURL && <img src={imageURL} />}
        </>
    )
}