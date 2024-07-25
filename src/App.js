import About from "./components/About";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contacts from "./components/Contacts";


function App() {
    return (
        <div>
            <Navbar />
            <Home />
            <About />
            <Skills/>
            <Work />
            <Contacts />
        </div>

    );
}

export default App;