import React from 'react';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectToDashboard from './components/RedirectToDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to dashboard if the user is logged in */}
        <Route
          path="/sign-in"
          element={
            <RedirectToDashboard>
              <Signin />
            </RedirectToDashboard>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectToDashboard>
              <Signup />
            </RedirectToDashboard>
          }
        />

        {/* Protect the dashboard route, only allow if logged in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Default route can be redirected to sign-in */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
