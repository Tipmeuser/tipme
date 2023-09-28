import "./App.css";
import ThemeCustomization from "./themes";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeCustomization>
  );
}

export default App;
