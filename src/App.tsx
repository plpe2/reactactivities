import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './assets/components/Dashboard';
import Login from './assets/components/Login';
import Register from './assets/components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
