import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Admin />
    </>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default App;
