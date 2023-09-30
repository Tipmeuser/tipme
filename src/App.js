import "./App.css";
import ThemeCustomization from "./themes";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import 'semantic-ui-css/semantic.min.css'

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
