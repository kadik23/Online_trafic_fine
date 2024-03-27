import './App.css';
import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import PaymentGiteway from './pages/PaymentGiteway';
import LandingPage from './pages/LandingPage';
import FineOverview from './pages/FineOverview';
import axios from "axios";
import { UserContextProvider } from './contexts/userContext';
import Toast from './components/Toast';
import useToast from './hooks/useToast';
import ToastContext from './contexts/ToastContext';
import Popup from './components/Popup'
import PopupContext from './contexts/PopupContext'
import usePopup from './hooks/usePopup'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://online-trafic-fine-7.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const toastManager = useToast();
  const popupManager = usePopup();
  return (
  <UserContextProvider>
    <ToastContext.Provider value={toastManager}>
    <PopupContext.Provider value={popupManager}>

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment_gateway/:id" element={<PaymentGiteway />} />
        <Route path="/fine_overview/:id" element={<FineOverview />} />
      </Routes>
    </Router>
    <Toast/>
    <Popup />
    </PopupContext.Provider>
    </ToastContext.Provider>
  </UserContextProvider>
  );
}

export default App;
