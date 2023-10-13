import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer() {
    const { filters } = useFilters()

    return (
        <footer className='footer'>
            {
                //visualizar el estado de nuestro filtro
                JSON.stringify(filters, null, 2)
            }
            {
                /*
            <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
            <h5>Shopping Cart con useContext & useReducer</h5>
                */
            }

        </footer>
    )
}