import Hero from "@/components/custom/Hero";
import Navbar  from "@/components/custom/Navbar";
import Upnav from "@/components/custom/Upnav";
import New from "@/./app/(home)/newproducts/page";
import Best from "@/./app/(home)/topsellers/page";
import Sellers from "@/./app/(home)/weeklydiscounts/page";
import Footer from "@/components/custom/Footer";
export default function Home() {
  return (
    <>
      <Upnav />
      <Navbar />
      <Hero />
      <New />
      <Best />  
      <Sellers />  
      <Footer />
    </>
  );
}
