import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/register-page/page";
import LoginPage from "./pages/login-page/page";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./ProtectedRoutes";
import HomePage from "./pages/dashboard/home-page/page";
import LayoutPage from "./pages/dashboard/layout";
import TopUpPage from "./pages/dashboard/top-up-page/page";
import PaymentPage from "./pages/dashboard/payment-page/page";
import TransactionPage from "./pages/dashboard/transactions-page/page";
import DetailsProfilePage from "./pages/dashboard/details-profile-page/page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LayoutPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="/top-up" element={<TopUpPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/profile" element={<DetailsProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
