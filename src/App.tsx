import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import './App.css';

const socket = io(`https://localhost:8080`, {
  query: {
    token: sessionStorage.getItem('token'),
  },
  autoConnect: false,
});

function App() {
  useEffect(() => {
    return () => {
      socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
      });
      socket.on('connectToRoom', function (data) {
        console.log(data);
      });
      socket.on('on product create', (...data) => {
        console.log(data);
        notify(data.reduce((a, b) => a + ' ' + b, ''));
      });
    };
  });
  function userToken(e: React.ChangeEvent<HTMLInputElement>) {
    sessionStorage.setItem('token', e.target.value);
    socket.connect();
  }

  const notify = (data: string) => toast.success(data);

  return (
    <div className="App">
      <h1>Hello</h1>
      <input type="text" placeholder="User token here" onChange={userToken} />
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
export default App;
