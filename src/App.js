import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { Logout } from "./features/auth/components/Logout";
import { Protected } from "./features/auth/components/Protected";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
} from "./pages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { GeneralConditions } from "./pages/GeneralConditions";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { DemanderDevis } from "./pages/DemanderDevis";
import { AddCategory } from "./features/admin/components/AddCategory";
import { ProductList } from "./features/products/components/ProductList";
import { ShopPage } from "./features/products/Shop";
import { CollectionPage } from "./features/products/CollectionPage";
import { PolitiqueConfidentialite } from "./pages/PolitiqueConfidentialite";

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:passwordResetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />
        <Route
          exact
          path="/product-details/:id"
          element={
            <Protected>
              <ProductDetailsPage />
            </Protected>
          }
        />
        <Route path="/conditions-generales" element={<GeneralConditions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/demanderDevis" element={<DemanderDevis />} />
        <Route path="/collection/:type" element={<Protected><CollectionPage /></Protected>} />
        <Route path="/boutique" element={<ShopPage />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />

        {/* {
          loggedInUser?.isAdmin?( */}
        {/* // admin routes
            <> */}
        <Route
          path="/admin/dashboard"
          element={
            <Protected>
              <AdminDashboardPage />
            </Protected>
          }
        />
        <Route
          path="/admin/product-update/:id"
          element={
            <Protected>
              <ProductUpdatePage />
            </Protected>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <Protected>
              <AddProductPage />
            </Protected>
          }
        />
            <Route path="/admin/add-category" element={<Protected><AddCategory /></Protected>} />

        <Route
          path="/admin/orders"
          element={
            <Protected>
              <AdminOrdersPage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
        {/* </> */}
        {/* ):( */}
        {/* // user routes
            <> */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <UserProfilePage />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <CheckoutPage />
            </Protected>
          }
        />
        <Route
          path="/order-success/:id"
          element={
            <Protected>
              <OrderSuccessPage />
            </Protected>
          }
        />
        <Route
          path="/orders"
          element={
            <Protected>
              <UserOrdersPage />
            </Protected>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Protected>
              <WishlistPage />
            </Protected>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
