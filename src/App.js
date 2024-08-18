import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/misc/PrivateRoute";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminPage from "./components/admin/AdminPage";

import "./App.css";

import { Footer } from "./components/navigation/Footer";
import { Sidebar } from "./components/navigation/SideBar";
import HomePage from "./scenes/home/HomePage";
import Pond from "./scenes/fishfarm/pond/Pond";
import Stocks from "./scenes/fishfarm/fishstock/Stocks";
import { StockDetailsPage } from "./scenes/fishfarm/fishstock/StockDetailsPage";
import FeedStock from "./scenes/stores/feedstock/FeedStock";
import MixedFeed from "./scenes/stores/mixfeed/MixedFeed";
import { CommingSoon } from "./components/navigation/CommingSoon";
import Employee from "./scenes/personnel/employee/Employee";
import Tasks from "./scenes/personnel/task/Tasks";
import Poultry from "./scenes/poultrystock/Poultry";
import { BirdDetailsPage } from "./scenes/poultrystock/BirdDetailsPage";
import Navbar from "./components/navigation/Navbar";
import FeedUsage from "./scenes/stores/feedstock/feedusage/FeedUsage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />

              <div className="container-fluid">
                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/soon" element={<CommingSoon />} />
                    <Route
                      path="/adminpage"
                      element={
                        <PrivateRoute>
                          <AdminPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route
                      path="/ponds"
                      element={
                        <PrivateRoute>
                          <Pond />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/stocks"
                      element={
                        <PrivateRoute>
                          <Stocks />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/emprecords"
                      element={
                        <PrivateRoute>
                          <Employee />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/tasks"
                      element={
                        <PrivateRoute>
                          <Tasks />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/feedstock"
                      element={
                        <PrivateRoute>
                          <FeedStock />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/feedusage"
                      element={
                        <PrivateRoute>
                          <FeedUsage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/mixedfeed"
                      element={
                        <PrivateRoute>
                          <MixedFeed />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/stockDetails/:stockId/:fishPondName/:stockRemaining/:fishSpecy/:nbrOfDays/:reduction/:mortality/:stockDate/:purpose"
                      element={
                        <PrivateRoute>
                          <StockDetailsPage />
                        </PrivateRoute>
                      }
                    />
                    {/* Bird pages  */}

                    <Route
                      path="/animals"
                      element={
                        <PrivateRoute>
                          <Poultry />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/flockDetails/:flockId/:flockType/:stockRemaining/:nbrOfDays/:reduction/:mortality/:stockDate/:purpose"
                      element={
                        <PrivateRoute>
                          <BirdDetailsPage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
