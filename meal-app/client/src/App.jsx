import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Welcome from './pages/Welcome';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Add from './pages/Add';
import Detail from './pages/Detail';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/product/:id'} element={<Detail/>}/>
      <Route path={'/add'} element={<Add/>}/>
      <Route path={'/welcome'} element={<Welcome/>}/>
      <Route path={'/testimonials'} element={<Testimonials/>}/>
      <Route path={'/service'} element={<Services/>}/>
      <Route path={'/menu'} element={<Menu/>}/>
      <Route path={'/contact'} element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
