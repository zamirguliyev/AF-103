import Navbar from './components/Navbar';
import Home from './components/Home';
import Add from './pages/Add';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Detail from './pages/Detail';
import Basket from './pages/Basket';
import Wishlist from './pages/Wishlist';

function App() {


  return (
    <>

<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/add" element={<Add/>}/>
  <Route path="/product/:id" element={<Detail/>}/>
  <Route path="/basket" element={<Basket/>}/>
  <Route path="/wishlist" element={<Wishlist/>}/>
</Routes>

</BrowserRouter>

    </>
    
  )
}

export default App
