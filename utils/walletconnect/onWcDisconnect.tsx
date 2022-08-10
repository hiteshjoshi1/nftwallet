// import { useWalletConnectStoreService } from '@hooks/authentication'
import { CustomWalletConnect } from '.'
import { useContext } from 'react'
import { WalletConnectContext } from '..'

export const useWcDisconnect = () => {
  const { walletConnectList, setWalletConnectList } = useContext(WalletConnectContext)
//   const { localWalletConnectStore } = useWalletConnectStoreService()

  const onWcDisconnect = async (wcSession: CustomWalletConnect, handshakeTopic?: string) => {
    // try {
    //   const currentWcTopic =
    //     handshakeTopic || wcSession?.session?.handshakeTopic || wcSession?.handshakeTopic
    //   const data = await localWalletConnectStore.listAll()
    //   const walletConnectDataItem = data?.filter(
    //     (item) => item?.payload?.handshakeTopic === currentWcTopic,
    //   )[0]
    //   walletConnectDataItem?.id &&
    //     (await localWalletConnectStore.deleteItem(walletConnectDataItem.id))
    //   setWalletConnectList([
    //     ...walletConnectList?.filter((_wc) => _wc?.handshakeTopic !== currentWcTopic),
    //   ])
    // } catch (e) {}
  }

  return { onWcDisconnect }
}
