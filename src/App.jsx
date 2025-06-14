import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import TemporaryDrawer from "./components/TemporaryDrawer";
import Header from "./components/Header";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <Router>
        <TemporaryDrawer isOpen={true}></TemporaryDrawer>
        <Header></Header>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;