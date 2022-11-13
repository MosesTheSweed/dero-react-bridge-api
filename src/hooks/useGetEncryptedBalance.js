import {useCallback, useContext} from 'react';
import {BridgeContext} from '/src/components/providers/bridgeRpcProvider.jsx';
import to from 'await-to-js';
import {ApiContext} from '/src/components/providers/apiResponseProvider.jsx';

/*
  Purpose: Returns the balance of the selected asset from a valid DERO address.

  RPC API Call Args
  Note: the value of topoheight is set to -1 in the request to retrieve from the last block directly.
   - NAME, TYPE, REQUIRED, COMMENT
   - address, string, true, Dero Address
   - topoheight, int64, true, balance at specified height
   - scid, hash, false, SCID of asset/token
   - treehash, string, false, Merkle Balance Tree Hash

  React API
  Props: Dero Wallet Address
  ResponseType:
    {
      bits: number;
      blockhash: string;
      data: string;
      dheight: number;
      dtreehash: string;
      height: number;
      registration: number;
      scid: string;
      status: string;
      topoheight: number;
      treehash: string;
    }
 */

export const useGetEncryptedBalance = () => {
  const {deroBridgeApi} = useContext(BridgeContext)
  const {successSet, messageSet, resultSet, funcNameSet} = useContext(ApiContext)

  const getEncryptedBalance = useCallback(async(address) => {
    funcNameSet('getEncryptedBalance')
    const [err, res] = await to(deroBridgeApi.daemon('get-encrypted-balance', {
      address: `${address}`,
      topoheight: -1
    }))
    console.log('RES', res, err)
    if (err) {
      successSet(false)
      messageSet(err.message)
      resultSet({})
    } else if (res.data.result.status === 'OK') {
      successSet(true)
      messageSet('Retrieved Balance')
      resultSet(JSON.stringify(res.data.result))
    }
  })

  return {getEncryptedBalance}
}