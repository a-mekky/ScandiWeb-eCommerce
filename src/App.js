import './App.css';
import NavBar from './Commponents/Navbar/Navbar';
import PLP from './Pages/PLP/Product_Listing_Page_(PLP)';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import PDP from './Pages/PDP/Product_Description_Page_(PDP)';
import Cart from './Pages/Cart/Cart';



function App() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path='/' element={<Navigate  replace to='/all' />} />
        <Route path='/:category' element={<PLP porps={location.state} navigate={navigate} />} />
        <Route path='/productDetails/:id' element={<PDP props={location.state} navigate={navigate} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes >
    </div>
  );
}

export default App;
