import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import ChangePassword from "@/pages/ChangePassword";
import Dashboard from "@/pages/Dashboard";
import Feed from "@/pages/Feed";
import Kanban from "@/pages/Kanban";
import Rewards from "@/pages/Rewards";
import Ranking from "@/pages/Ranking";
import Mood from "@/pages/Mood";
import Profile from "@/pages/Profile";
import Institution from "@/pages/Institution";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import UserImport from "./pages/UserImport";
import OrgStructure from "./pages/OrgStructure";
import { getCurrentUser } from "@/data/mock";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();


const AppRoutes = () => {
  const { user } = useAuth();
  const currentUser = user ?? getCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/profile" element={<Profile />} />
        {currentUser.role !== "funcionario" && <Route path="/institution" element={<Institution />} />}
        <Route path="/help" element={<Help />} />
        {currentUser.role !== "funcionario" && <Route path="/userimport" element={<UserImport />} />}
        {currentUser.role !== "funcionario" && <Route path="/orgstructure" element={<OrgStructure />} />}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
