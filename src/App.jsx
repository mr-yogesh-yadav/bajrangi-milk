
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import MilkCollection from "./Component/MilkCollection";
import OurStory from "./Component/OurStory";
import Delivery from "./Component/Delivery";
import Order from "./Component/Order";
import Footer from "./Component/Footer";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MilkCollection />
        <OurStory />
        <Delivery />
        <Order />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
