import HotelList from "./components/common/HotelList";
import About from "./components/HomeComponent/About";
import HeroBanner from "./components/HomeComponent/HeroBanner";
import HotelSearch from "./components/HomeComponent/HotelSearch";
import Service from "./components/HomeComponent/Service";
import Team from "./components/HomeComponent/Team";


export default function Home() {
  return (
    <>
   <HeroBanner/>
   <HotelSearch/>
   <About/>
   <Service/>
    <Team/>
    <HotelList limit={3} />
   </>
  );
}
