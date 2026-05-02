/* src/App.jsx */

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ShortlinksPage from "./pages/ShortlinksPage";

export default function App() {

  return (
    <div className="min-h-screen bg-black text-white">

      <HashRouter>

        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/shortlinks"
            element={<ShortlinksPage />}
          />

        </Routes>

      </HashRouter>

    </div>
  );
}