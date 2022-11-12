import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BridgeProvider} from '/src/components/providers/bridgeRpcProvider.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BridgeProvider>
      <App />
    </BridgeProvider>
  </React.StrictMode>
)
