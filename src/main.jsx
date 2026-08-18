import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <WishlistProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </WishlistProvider>
    </ToastProvider>
  </React.StrictMode>,
)
