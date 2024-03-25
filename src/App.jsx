import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdProvider } from "./context/AdContext";
import NotFoundPage from "./components/NotFoundPage";
import MainPage from "./pages/MainPage";
import HousePage from "./pages/HousePage";
import CreateCardPage from "./pages/CreateCardPage";
import UserPage from "./pages/UserPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <AdProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/house/:id" element={<HousePage />} />
          <Route path="/createNewAd" element={<CreateCardPage />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/editAd" element={<EditPage />} />
        </Routes>
      </AdProvider>
    </Router>
  );
}

export default App;
