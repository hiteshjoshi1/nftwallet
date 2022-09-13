import { Wallet } from "ethers";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SCAN_SCREEN } from "../constants";
import EthereWalletContext from "../context/Etherwallet";
import { AppButton } from "./components/AppButton";
import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = (txt: string) => {
  console.log(txt)
  Clipboard.setString(txt);
};

export const HomeScreen = ({ navigation }: any) => {
  const wallet = useContext<Wallet>(EthereWalletContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[{
        padding: 15,
        fontSize: 30
      },style.baseText]}>Welcome to crypto wallet demo</Text>
      <View>
      <Text style={[{
        padding: 15
      },style.baseText]}>Your Ethereum Wallet Address</Text>
      </View>

      <View>
      <Text style={[{
        fontWeight: "bold",
      },style.baseText]}
      >{wallet.address}</Text>
      </View>


      <View>
      <TouchableOpacity onPress={()=> copyToClipboard(wallet.address)}>
      <Text style={style.baseText}>Click to copy address to clipboard</Text>
        </TouchableOpacity>
        </View>
        <View style={{padding:10 }}>
        <AppButton title="Click to scan QR" onPress={() => navigation.navigate(SCAN_SCREEN)} />
        </View>
      
    </View>
  );

}

const style = StyleSheet.create({
  baseText : {
    textAlign: "center",
    color: "black"
  }
})

