import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import "./App.css";
import { Bell } from "react-feather";

const types = ["success", "info", "warning", "error"];

function App() {
  const [token, setToken] = useState("");
  const [count, setCount] = useState(0);
  const socket = io(`http://localhost:9090`, {
    query: {
      token: token,
    },
    autoConnect: false,
  });

  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  socket.on("connectToRoom", function (data) {
    console.log(data);
  });
  socket.on("on product create", (data) => {
    console.log(data);
    console.log(count);

    data.map((message: string) => notify(message));
    setCount(count + 1);
    console.log(count);
  });
  socket.on("on product delete", (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
    // setCount(count + data.length);
  });
  socket.on("on product edit", (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
    // setCount(count + data.length);
  });
  socket.on("on product expiry", (data) => {
    console.log(data);
    data.map((message: string) => notify(message));
    // setCount(count + data.length);
  });

  const notify = (data: string) => toast.success(data);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(socket);
    console.log(socket.connected);

    socket.connect();
    console.log(socket.connected);

  };

  const wrapper = {
    // position: 'relative',
    display: "inline-block",
    color: "#fff",
    // :hover {
    cursor: "pointer",
    marginTop: "10px",
  };
  const badge = {
    // position: 'absolute',
    top: "-8px",
    right: "-8px",
    background: "red",
    borderRadius: "4px",
    width: "22px",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // function Trigger({ count, setCount }: Props) {
  //   return (
  //     <Wrapper onChange={setCount}>
  //       <Bell />
  //       <span>{count}</span>
  //     </Wrapper>
  //   );
  // }
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div className="App">
      <h1>
        👋 Hello From
        <br /> 🌀 Team Cypher 🛍️ 🛒 E-commerce API 🪁 🧑‍🍳 🍽️ 🥬
      </h1>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User token here"
          onChange={(e) => setToken(e.target.value)}
        />
        <button style={{ marginLeft: 10 }}>Set Token</button>
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
      <button style={wrapper} onClick={handleClick}>
        <Bell />
        <span style={badge}>{count}</span>
      </button>
    </div>
  );
}
export default App;
