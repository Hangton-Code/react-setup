import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import UserContextProvider from "./contexts/User";
import CallbackPage from "./pages/auth/CallbackPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import Header from "./components/Header/Header";
import ThemeProvider from "./contexts/Theme";
import { Container, CssBaseline } from "@mui/material";
import HomePage from "./pages/home/HomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import SettingPage from "./pages/setting/SettingPage";
import AboutPage from "./pages/about/AboutPage";
import EVPage from "./pages/auth/EVPage";
import SettingAccountPage from "./pages/setting/tabs/AccountPage";
import SettingGeneralPage from "./pages/setting/tabs/GeneralPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserContextProvider>
          <ThemeProvider>
            <CssBaseline />
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <Container
              maxWidth="lg"
              sx={{
                paddingTop: 12,
              }}
            >
              <Routes>
                {/* free page */}
                <Route path="" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />

                {/* auth */}
                <Route path="auth/email_verification" element={<EVPage />} />
                <Route path="auth/callback" element={<CallbackPage />} />

                {/* protected page */}
                <Route path="" element={<ProtectedRoute />}>
                  <Route path="setting" element={<SettingPage />}>
                    <Route path="account" element={<SettingAccountPage />} />
                    <Route path="general" element={<SettingGeneralPage />} />
                  </Route>
                </Route>
              </Routes>
            </Container>
          </ThemeProvider>
        </UserContextProvider>
      </AuthProvider>
    </Router>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
