import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './assets/components/Dashboard';
import Login from './assets/components/Login';
import Register from './assets/components/Register';
import NavBar from './assets/components/NavBar';
import SearchResult from './assets/components/SearchResult';
import UserProfile from './assets/components/UserProfile';
import './assets/styles/App.css'

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/search-results/:val' element={<SearchResult />} />
          <Route path='/view-user/:id' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
