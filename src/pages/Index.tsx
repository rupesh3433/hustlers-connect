import HeroSection from "../components/hero/HeroSection";
import Footer from "../components/layout/footer/Footer";
import Navbar from "../components/layout/navbar/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#010106] overflow-hidden">
      <Navbar />
      <HeroSection />
      <Footer/>
    </div>
  );
}