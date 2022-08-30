import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Components/Login';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector(state => state.isAuth);

  return (
    <div className="App">
      {isAuth ? (
        <>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='/rooms/:id' element={<Chat />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
      
    </div>
  );
}

export default App;
