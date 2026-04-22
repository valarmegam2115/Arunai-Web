import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routing from "./Routing"

const App = () => {
    return(
        <div>
            <Navbar/>
            <h1>App</h1>
            <Footer/>
            <Routing/>
        </div>
    )
}

export default App;