import logo from "./logo.svg";
import CallTextEmail from "./CallTextEmail";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CallTextEmail />
    </div>
  );
}

export default App;
