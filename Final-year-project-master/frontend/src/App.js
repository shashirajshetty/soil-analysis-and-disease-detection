import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DiseaseDetection from "./pages/DiseaseDetection"
import Home from "./pages/Home"
import SoilAnalysis from "./pages/SoilAnalysis"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"
import Crop from "./pages/Crop"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soil_analysis" element={<SoilAnalysis />} />
          <Route path="/disease_detection" element={<DiseaseDetection />} />
          <Route path="/crop/:crop" element={<Crop />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-left"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme='dark' />
    </>
  )
}

export default App
