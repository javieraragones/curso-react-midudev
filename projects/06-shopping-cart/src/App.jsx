import './App.css'
import { Products } from './Components/Products'
import { products as initialProducts } from './mocks/producs.json'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { IS_DEVELOPMENT } from './config'
import { useFilters } from './hooks/useFilters'
import { Cart } from './Components/Cart'
import { CartProvider } from './context/cart'


function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)


  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
