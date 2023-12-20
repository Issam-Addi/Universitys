import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import AllUniversity from './pages/AllUniversity';
import UniversityDetails from './pages/UniDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from "./components/Footer";
import NotFound from './pages/NotFound';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/all_university" element={<AllUniversity />} />
          <Route path="/university/:university_id" element={<UniversityDetails />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/signIn" element={isLoggedIn? <NotFound message='you are already sign in'/> : <SignIn/>} />
          <Route path="/signUp" element={isLoggedIn? <NotFound message='you are already sign up'/> : <SignUp/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;