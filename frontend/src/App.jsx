import './App.css';
import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import PaymentConfirmation from './pages/PaymentConfirmation';
import PaymentGiteway from './pages/PaymentGiteway';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import FineOverview from './pages/FineOverview';
import axios from "axios";
import { UserContextProvider } from './contexts/userContext';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:3000';

function App() {
  return (
  <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment_gateway" element={<PaymentGiteway />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fine_overview" element={<FineOverview />} />
        <Route path="/payment_confirmation" element={<PaymentConfirmation />} />
      </Routes>
    </Router>
  </UserContextProvider>
  );
}

export default App;
