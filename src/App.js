import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <div className="container-fluid text-white">
            <div className="row  align-items-end bg-dark bg-gradient align-content-center " id='header'>
                <div className="col-4 h1 m-1 text-white">
                    <Header></Header>
                </div>
            </div>
            <div className="row min-vh-100 main">
                <div className="col-3 bg-secondary bg-gradient " id='menu'>
                    <Menu></Menu>
                </div>
                <div className="col-9 text-black" id='content'>
                    <Outlet/>
                </div>
            </div>
            <div className="row  align-items-end bg-dark align-content-center " id='footer'>
                <div className="col h3 m-1 fst-italic fw-lighter fs-5">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
}

export default App;
