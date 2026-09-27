import "./globals.css";
import Header from "./common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./common/Footer";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Mainlayout from "./Mainlayout";

export const metadata = {
  title: "Hotelier",
  description: "Hotelier Hotel Booking Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Mainlayout>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </Mainlayout>
      </body>
    </html>
  );
}