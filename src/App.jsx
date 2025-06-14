import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Header from "./components/common/Header";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <Router>
        <SideBar isOpen={true}></SideBar>
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