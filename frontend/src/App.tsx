import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import Chat from "./pages/Admin/Chat";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Chat />} />
      </Route>
      <Route path="/admin/login" element={<LoginAdmin />} />
    </Routes>
  );
}

export default App;
