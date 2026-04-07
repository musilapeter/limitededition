import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { RequireAuth } from '../../hooks/useRequireAuth';
import { HomePage } from '../../pages/HomePage';
import { CollectionsPage } from '../../pages/CollectionsPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { AdminProductsPage } from '../../pages/AdminProductsPage';
import { AdminCollectionsPage } from '../../pages/AdminCollectionsPage';
import { AdminInventoryPage } from '../../pages/AdminInventoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:slug', element: <ProductDetailsPage /> },
      {
        path: 'cart',
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'admin',
        element: (
          <RequireAuth adminOnly>
            <AdminDashboardPage />
          </RequireAuth>
        ),
        children: [
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'collections', element: <AdminCollectionsPage /> },
          { path: 'inventory', element: <AdminInventoryPage /> },
        ],
      },
    ],
  },
]);
