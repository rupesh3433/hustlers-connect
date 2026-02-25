import HeroSection from "../components/hero/HeroSection";
import Footer from "../components/layout/footer/Footer";
import Navbar from "../components/layout/navbar/Navbar";
import Services from "../components/services/ServicesSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#010106] overflow-x-hidden">
      <Navbar />

      <main className="w-full">
        <HeroSection />
        {/* <Services /> */}
      </main>

      <Footer />
    </div>
  );
}