import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { RequireAuth } from '../../hooks/useRequireAuth';
import { HomePage } from '../../pages/HomePage';
import { CollectionsPage } from '../../pages/CollectionsPage';
import { CollectionDetailsPage } from '../../pages/CollectionDetailsPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { HeroCategoryPage } from '../../pages/HeroCategoryPage';
import { WhatsNewPage } from '../../pages/WhatsNewPage';
import { FlashSalePage } from '../../pages/FlashSalePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { AdminDashboardPage } from '../../pages/AdminDashboardPage';
import { AdminProductsPage } from '../../pages/AdminProductsPage';
import { AdminCollectionsPage } from '../../pages/AdminCollectionsPage';
import { AdminInventoryPage } from '../../pages/AdminInventoryPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'collections', element: <CollectionsPage /> },
        { path: 'collections/:slug', element: <CollectionDetailsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:slug', element: <ProductDetailsPage /> },
        { path: 'hero/category/:categorySlug', element: <HeroCategoryPage /> },
        { path: 'hero/whats-new', element: <WhatsNewPage /> },
        { path: 'hero/flash-sale', element: <FlashSalePage /> },
        { path: 'cart', element: <CartPage /> },
        {
          path: 'checkout',
          element: (
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          ),
        },
        {
          path: 'profile',
          element: (
            <RequireAuth>
              <ProfilePage />
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
  ],
  {
    future: {
      v7_startTransition: true,
    },
  },
);
