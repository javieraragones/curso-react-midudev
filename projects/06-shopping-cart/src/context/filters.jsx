import { createContext, useState } from "react";

//Singleton -> módulo de JavaScript

//1-crear el contexto
export const FiltersContext = createContext()

//2-crear el provider, para proveer el contexto
export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState(
        {
            category: 'all',
            minPrice: 250
        }
    )

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}