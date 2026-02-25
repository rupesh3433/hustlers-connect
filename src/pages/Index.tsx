import HeroSection from "../components/hero/HeroSection";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#010106] overflow-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
}