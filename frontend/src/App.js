
import { Button } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/ChatPage';
import {Toaster }from "../src/components/ui/toaster";
function App() {
  return (
    <>
      <Toaster />
    <Routes>
      
      <Route path="/" element={<Homepage />} exact />
      <Route path="/chats" element={<Chatpage />} />
    </Routes>
    </>
  );
}

export default App;
