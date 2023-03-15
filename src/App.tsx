import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const socket = io(`https://team-cyper-ecom-main.onrender.com/`, {
    query: {
      token: token,
    },
    autoConnect: false,
  });
  // useEffect(() => {
  // return () => {
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });
  socket.on('connectToRoom', function (data) {
    console.log(data);
  });
  socket.on('on product create', (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
  });
  socket.on('on product delete', (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
  });
  socket.on('on product edit', (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
  });
  socket.on('on product expiry', (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
  });
  // };
  // };
  // function userToken(e: React.ChangeEvent<HTMLInputElement>) {
  //   sessionStorage.setItem('token', e.target.value);
  //   socket.connect();
  // }

  const notify = (data: string) => toast.success(data);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(socket);
    console.log(socket.connected);

    socket.connect();
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User token here"
          onChange={(e) => setToken(e.target.value)}
        />
        <button>Set Token</button>
      </form>
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
