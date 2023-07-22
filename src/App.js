// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Cuisine from "./components/Cuisine";
import Space from "./components/Space";
import Bb from "./components/Bb";
import Events from "./components/Events";
import MemberDash from "./components/MemberDash";
import Surf from "./components/Surf";
import AccountMember from "./components/AccountMember";
import AboutMember from "./components/AboutMember";
import CuisineMember from "./components/CuisineMember";
import SpaceMember from "./components/SpaceMember";
import BbMember from "./components/BbMember";
import EventsMember from "./components/EventsMember";
import Transactions from "./components/Transactions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cuisine" element={<Cuisine />} />
            <Route path="space" element={<Space />} />
            <Route path="bb" element={<Bb />} />
            <Route path="events" element={<Events />} />
            <Route path="memberDash" element={<MemberDash />} />
            <Route path="surf" element={<Surf />} />
            <Route path="accountmember" element={<AccountMember />} /> 
            <Route path="about-member" element={<AboutMember />} />
            <Route path="cuisine-member" element={<CuisineMember />} />
            <Route path="space-member" element={<SpaceMember />} />
            <Route path="bb-member" element={<BbMember />} />
            <Route path="events-member" element={<EventsMember />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
