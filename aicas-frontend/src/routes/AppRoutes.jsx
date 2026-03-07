import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateCampaign from "../pages/CreateCampaign";
import CampaignDetails from "../pages/CampaignDetails";
import CampaignHistory from "../pages/CampaignHistory";
import PlatformSettings from "../pages/PlatformSettings";
import Logs from "../pages/Logs";

import Layout from "../components/layout/Layout";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Layout>
                <CreateCampaign />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/campaign/:id"
          element={
            <PrivateRoute>
              <Layout>
                <CampaignDetails />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <Layout>
                <CampaignHistory />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/platforms"
          element={
            <PrivateRoute>
              <Layout>
                <PlatformSettings />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <Layout>
                <Logs />
              </Layout>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes