import React from "react";
import { Component } from "react";
// 라우팅
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Planning from "./routes/Planning";
import Session from "./routes/Session";
import Result from "./routes/Result";
import Pdf from "./routes/Pdf";
import About from "./routes/About";
import Subscription from "./routes/Subscription";
import Workshop from "./routes/Workshop";
import ContactUs from "./routes/ContactUs";
//CSS
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/session" element={<Session />} />
          <Route path="/result" element={<Result />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
