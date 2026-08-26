import { Navigate, Route, Routes } from "react-router-dom";
import { useAdminSession } from "./utils/auth";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import ListPage from "./components/ListPage/ListPage";
import AppointmentsPage from "./components/AppointmentsPage/AppointmentsPage";
import ListServicePage from "./components/ListServicePage/ListServicePage";
import ServiceAppointmentsPage from "./components/ServiceAppointmentsPage/ServiceAppointmentsPage";
import ServiceDashboard from "./components/ServiceDashboard/ServiceDashboard";

function ProtectedLayout({ children }) {
  const admin = useAdminSession();
  if (!admin) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <DashboardPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedLayout>
            <ListPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedLayout>
            <AppointmentsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedLayout>
            <ListServicePage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/service-appointments"
        element={
          <ProtectedLayout>
            <ServiceAppointmentsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedLayout>
            <ServiceDashboard />
          </ProtectedLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
