
import "./App.css";

import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import MilkCollection from "./Component/MilkCollection";
import OurStory from "./Component/OurStory";
import Delivery from "./Component/Delivery";
import Order from "./Component/Order";
import Footer from "./Component/Footer";

function App() {
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

export default App;
