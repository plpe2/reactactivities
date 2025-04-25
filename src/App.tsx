import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './assets/components/Dashboard';
import NavBar from './assets/components/NavBar';
import SearchResult from './assets/components/SearchResult';
import UserProfile from './assets/components/UserProfile';
import './assets/styles/App.css'
import ViewUsers from './assets/components/ViewUsers';
import { Box } from '@mui/material';
import Sidebar from './assets/components/Sidebar';

function App() {
  return (
      <BrowserRouter>
        <Box sx={{ display: 'flex', position: "relative", backgroundColor: "#F0F4FF", height: "100%" }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, p: 0 }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/search-results/:val' element={<SearchResult />} />
            <Route path='/view-user/:id' element={<UserProfile />} />
            <Route path='/view-users' element={<ViewUsers />} />
          </Routes>
          </Box>
        </Box>
      </BrowserRouter>
  );
}

export default App;
