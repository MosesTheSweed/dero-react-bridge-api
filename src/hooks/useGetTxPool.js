import {useCallback, useContext} from 'react';
import {BridgeContext} from '/src/components/providers/bridgeRpcProvider.jsx';
import to from 'await-to-js';
import {ApiContext} from '/src/components/providers/apiResponseProvider.jsx';

/*
  Purpose: Returns the list of pending transactions (not included in a block).

  React API
  Props: None
  ResponseType: String[]
 */

export const useGetTxPool = () => {
  const {deroBridgeApi} = useContext(BridgeContext)
  const {successSet, messageSet, resultSet, funcNameSet} = useContext(ApiContext)

  const getTxPool = useCallback(async() => {
    funcNameSet('getTxPool')
    const [err, res] = await to(deroBridgeApi.daemon('get-tx-pool'))
    if (err) {
      successSet(false)
      messageSet(err.message)
      resultSet({})
    } else if (res.data.result.status === 'OK') {
      console.log('getTxPool success')
      successSet(true)
      messageSet('Retrieved TxPool records')
      resultSet(JSON.stringify(res.data.result.txs))
    }
  }, [deroBridgeApi])

  return {getTxPool}
}