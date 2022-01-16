import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./Routes";
import WrapperScrollToTop from "./Utils/WrapperScrollToTop";

function App() {
  return (
    <div className="relative w-full max-h-screen">
      <Router>
        <WrapperScrollToTop>
          <Header />
          <AppRoutes />
          <Footer />
        </WrapperScrollToTop>
      </Router>
    </div>
  );
}

export default App;
