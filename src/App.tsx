import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './assets/components/Dashboard';
import Login from './assets/components/Login';
import Register from './assets/components/Register';
import NavBar from './assets/components/NavBar';


function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
