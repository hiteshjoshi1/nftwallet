import { Wallet } from 'ethers';
import React from 'react'

const EthereWalletContext = React.createContext<Wallet|any>({});
export const EtherWalletProvider = EthereWalletContext.Provider
export default EthereWalletContext