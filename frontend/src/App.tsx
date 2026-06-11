import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import SignChatPage from "@/pages/SignChatPage";

import ProtectedRoute from "@/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SignChatPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

