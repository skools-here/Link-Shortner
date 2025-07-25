import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import UrlInput from "./components/UrlInput";

export default function Home() {
  return (
   <div className=" bg-linear-to-b from- #0f172a to-blue-500 h-screen w-screen">
    <Navbar/>
    <Hero/>
    <UrlInput/>
   </div>
  );
}
