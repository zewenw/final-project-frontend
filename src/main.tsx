import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import MyLayout from "./components/MyLayout.tsx";
import Login from "./pages/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/monitor/*" element={<App/>}/>
        <Route path="/admin/*" element={<App/>}/>
        <Route path="/photo/*" element={<App/>}/>
      </Routes>
    </Router>
  </>
);
