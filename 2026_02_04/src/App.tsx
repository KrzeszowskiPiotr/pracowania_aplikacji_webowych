import './App.scss'
import Navbar from './components/Navbar/Navbar.tsx'
import {BrowserRouter} from "react-router";

function App() {

  return (
    <>
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    </>
  )
}

export default App
