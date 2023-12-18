import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import ListUser from './pages/ListUser';
import ListUniversity from './pages/ListUniversity';
import UniDetails from './pages/UniDetails';
import EditAbout from './pages/EditAbout';
import EditContact from './pages/EditContact';
import Feedback from './pages/Feedback';
import SignIn from './pages/signIn';

if (localStorage.length === 0 || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
  localStorage.setItem("token", []);
}

const Admin = () => {
  return (
    <Router>
      <div className='flex'>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path="/list_users" element={<ListUser />} />
            <Route path="/list_universitys" element={<ListUniversity />} />
            <Route path="/list_universitys/:university_id" element={<UniDetails />} />
            <Route path="/edit_about" element={<EditAbout />} />
            <Route path="/edit_contact" element={<EditContact />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  )}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
        setIsLoggedIn(true);
    }
  }, []);

  return (
  <>
  {isLoggedIn ? <Admin/> : <SignIn/> }
  </>
  );
}

export default App;
