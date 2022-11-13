import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BridgeProvider} from '/src/components/providers/bridgeRpcProvider.jsx';
import {ApiResponseProvider} from '/src/components/providers/apiResponseProvider';

export const Providers = ({children}) => {
  return (
    <BridgeProvider>
      <ApiResponseProvider>
        {children}
      </ApiResponseProvider>
    </BridgeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
