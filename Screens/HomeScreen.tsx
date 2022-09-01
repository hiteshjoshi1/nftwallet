import { Wallet } from "ethers";
import React, { useContext } from "react";
import { Alert, Button, Text, View } from "react-native";
import { SCAN_SCREEN } from "../constants";
import EthereWalletContext from "../context/Etherwallet";
import { AppButton } from "./components/AppButton";

const x = () => {

}
export const HomeScreen = ({ navigation }: any) => {
  const wallet = useContext<Wallet>(EthereWalletContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Ethereum Wallet Address</Text>
      <Text>{wallet.address}</Text>
      <Button
        title="Cilck to scan QR"

        onPress={() => navigation.navigate(SCAN_SCREEN)}
      />

      {/* <AppButton title="Click to scan QR" onPress={() => navigation.navigate(SCAN_SCREEN)}/> */}

    </View>
  );

}



