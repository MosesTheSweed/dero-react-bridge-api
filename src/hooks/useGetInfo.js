import {useCallback, useContext} from 'react';
import {BridgeContext} from '/src/components/providers/bridgeRpcProvider.jsx';
import to from 'await-to-js';
import {ApiContext} from '/src/components/providers/apiResponseProvider.jsx';

/*
  Purpose: Returns all chain info

  React API
  Props: None
  ResponseType:
    {
      alt_blocks_count number;
      difficulty: number;
      grey_peerlist_size: number;
      height: number;
      stableheight: number;
      topoheight: number;
      treehash: string;
      averageblocktime50: number;
      incoming_connections_count: number;
      outgoing_connections_count: number;
      target: number;
      target_height: number;
      testnet: boolean;
      network: string;
      top_block_hash: string;
      tx_count: number;
      tx_pool_size: number;
      dynamic_fee_per_kb: number;
      total_supply: number;
      median_block_size: number;
      white_peerlist_size: number;
      version: string;
      status: string;
    }
 */

export const useGetInfo = () => {
  const {deroBridgeApi} = useContext(BridgeContext)
  const {successSet, messageSet, resultSet, funcNameSet} = useContext(ApiContext)

  const getInfo = useCallback(async() => {
    funcNameSet('getInfo')
    const [err, res] = await to(deroBridgeApi.daemon('get-info'))
    if (err) {
      successSet(false)
      messageSet(err.message)
      resultSet({})
    } else if (res.data.result.status === 'OK') {
      successSet(true)
      messageSet('Retrieved chain info')
      resultSet(JSON.stringify(res.data.result))
    }
  }, [deroBridgeApi])

  return {getInfo}
}
