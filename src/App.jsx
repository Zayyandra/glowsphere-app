// import Dashboard from "./pages/Dashboard";
// import Product from "./pages/Product";
// import AddProduct from "./pages/AddProduct";
// import Testimoni from "./pages/Testimoni";
// import AddTestimoni from "./pages/AddTestimoni";
// import Order from "./pages/Order";
// import AddOrder from "./pages/AddOrder";
// import AddFAQ from "./pages/AddFAQ";
// import FAQ from "./pages/FAQ";
// import ErrorPage400 from "./pages/ErrorPage400";
// import ErrorPage401 from "./pages/ErrorPage401";
// import ErrorPage403 from "./pages/ErrorPage403";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./assets/tailwind.css";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Loading = React.lazy(() => import("./components/Loading"));
const Product = React.lazy(() => import("./pages/Product"));
const AddProduct = React.lazy(() => import("./pages/AddProduct"));
const Order = React.lazy(() => import("./pages/Order"));
const ErrorPage400 = React.lazy(() => import("./pages/ErrorPage400"));
const ErrorPage401 = React.lazy(() => import("./pages/ErrorPage401"));
const ErrorPage403 = React.lazy(() => import("./pages/ErrorPage403"));
const AddOrder = React.lazy(() => import("./pages/AddOrder"));
const Testimoni = React.lazy(() => import("./pages/Testimoni"));
const AddTestimoni = React.lazy(() => import("./pages/AddTestimoni"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const AddFAQ = React.lazy(() => import("./pages/AddFAQ"));
const Contactus = React.lazy(() => import("./pages/Contactus"));
const EditContactUs = React.lazy(() => import("./pages/EditContactUs"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faq/add" element={<AddFAQ />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/add" element={<AddOrder />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/testimoni/add" element={<AddTestimoni />} />
          <Route path="/error/400" element={<ErrorPage400 />} />
          <Route path="/error/401" element={<ErrorPage401 />} />
          <Route path="/error/403" element={<ErrorPage403 />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/contactus/edit" element={< EditContactUs/>} />

        </Route>
        <Route path="/*" element={<ErrorPage400 />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
