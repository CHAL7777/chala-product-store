import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UpdateFollower } from 'react-mouse-follower'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage defaultCategory="all" />,
      },
      {
        path: '/mens',
        element: <ProductsPage defaultCategory="men" />,
      },
      {
        path: '/womens',
        element: <ProductsPage defaultCategory="women" />,
      },
      {
        path: '/kids',
        element: <ProductsPage defaultCategory="kid" />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]
  }
])

const App = () => {
  return (
    <main className='overflow-x-hidden min-h-screen w-full font-sans relative bg-zinc-950 text-zinc-100'>
      {/* Background Gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #09090b 40%, #042f2e 100%)",
        }}
      />
      <div className='relative z-10'>
        <UpdateFollower
          mouseOptions={{
            backgroundColor: "white",
            zIndex: 10,
            followSpeed: 1.5,
          }}
        >
          <RouterProvider router={router} />
        </UpdateFollower>
      </div>
    </main>
  )
}

export default App
