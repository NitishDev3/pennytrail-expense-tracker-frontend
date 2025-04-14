import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { setUser } from "./store/userSlice";
import { setToastInfo } from "./store/configSlice";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const toast = useSelector((store) => store.config.toastInfo);
  const dispatch = useDispatch();

  // Fetch user profile on app load
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/user/profile`, { withCredentials: true });
        dispatch(setUser(response.data));
      } catch (error) {
        const message = error.response?.data?.message || "Network Error";
        dispatch(setToastInfo(message));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  // Auto-clear toast after 2 seconds
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => dispatch(setToastInfo(null)), 2000);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (loading) return <Loading />;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Toast Notification */}
      {toast && (
        <div className="bg-green-100 border z-10 border-green-400 text-green-700 px-4 py-3 rounded absolute top-4 left-1/2 transform -translate-x-1/2 mb-4 shadow-md" role="alert">
          <strong className="font-bold">{toast}</strong>
        </div>
      )}

      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
