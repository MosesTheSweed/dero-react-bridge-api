import './App.css'
import {useContext, useEffect} from 'react';
import {ApiContext} from '/src/components/providers/apiResponseProvider.jsx';
import {useGetInfo} from '/src/hooks/useGetInfo.js';
import {useGetTxPool} from '/src/hooks/useGetTxPool.js';
import {useGetEncryptedBalance} from '/src/hooks/useGetEncryptedBalance.js';

function App() {
  const {getInfo} = useGetInfo()
  const {getTxPool} = useGetTxPool()
  const {getEncryptedBalance} = useGetEncryptedBalance()
  const {success, message, result, funcName} = useContext(ApiContext)

  // Have input to handle for getEncryptedBalance
  const handleGetEncryptedbalance = (e) => {
    e.preventDefault()
    const address = document.getElementById('getEncryptedBalanceAddress').value
    if (address) {
      getEncryptedBalance(address)
    } else {
      alert('A wallet address is required for this function')
    }
  }

  useEffect(() => {
    if (funcName) {
      switch (funcName) {
        case 'getInfo':
        case 'getTxPool':
        case 'getEncryptedBalance':
          const rsl = result ? JSON.parse(result) : {}
          console.log('result', rsl)
      }
    }
  }, [success, message, result])

  return (
    <div className='container'>
      <table className='table'>
        <thead>
        <tr>
          <th>
            Testing Api
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <button onClick={getInfo}>Get Info</button>
          </td>
          {funcName && funcName === 'getInfo' ?
            <>
              <tr><td>Status: {success} -- {message}</td></tr>
              <tr><td>INFO: {result}</td></tr>
            </>
            :
            <td></td>}
        </tr>
        <tr>
          <td>
            <button onClick={getTxPool}>Get Tx Pool</button>
          </td>
          {funcName && funcName === 'getTxPool' ?
            <>
              <tr><td>Status: {success} -- {message}</td></tr>
              <tr><td>TXNS: {result}</td></tr>
            </>
            :
            <td></td>}
        </tr>
        <tr>
          <td>
            <button onClick={handleGetEncryptedbalance}>Get Encrypted Balance</button>
            <br /><input id='getEncryptedBalanceAddress' placeholder='Wallet Address' />
          </td>
          {funcName && funcName === 'getEncryptedBalance' ?
            <>
              <tr><td>Status: {success} -- {message}</td></tr>
              <tr><td>{result}</td></tr>
            </>
            :
            <td></td>}
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
