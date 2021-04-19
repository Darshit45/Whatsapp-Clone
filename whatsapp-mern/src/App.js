
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from "./axios.js";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then(response => {
        setMessages(response.data);
      }); 
  },[]);

  useEffect(() => {
    const pusher = new Pusher("ebbd9c3048c9a7881242", {
      cluster: "eu",
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      console.log('inserted');
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  
  return (
    <div className="app">
      
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
      {/* Chat componnent */}
      
    </div>
  );
}

export default App;
