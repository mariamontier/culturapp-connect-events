
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { EventProvider } from "@/context/EventContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import ParticipantDashboard from "./pages/participant/Dashboard";
import ParticipantProfile from "./pages/participant/Profile";

import OrganizerDashboard from "./pages/organizer/Dashboard";
import OrganizerProfile from "./pages/organizer/Profile";
import OrganizerEvents from "./pages/organizer/Events";
import CreateEvent from "./pages/organizer/CreateEvent";
import EditEvent from "./pages/organizer/EditEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <EventProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Signup />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/:id" element={<EventDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sobre" element={<About />} />
              
              {/* Participant Routes */}
              <Route 
                path="/participante/inicio" 
                element={
                  <ProtectedRoute requiredUserType="participant">
                    <ParticipantDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/participante/perfil" 
                element={
                  <ProtectedRoute requiredUserType="participant">
                    <ParticipantProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Organizer Routes */}
              <Route 
                path="/organizador/inicio" 
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <OrganizerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizador/perfil" 
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <OrganizerProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizador/eventos" 
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <OrganizerEvents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizador/criar-evento" 
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <CreateEvent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/organizador/editar-evento/:id" 
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <EditEvent />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </EventProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
