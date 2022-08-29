
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Settings } from "react-native";
import { ContactScreen } from "../ContactScreen";
import { HomeScreen } from "../HomeScreen";
import { QRScanScreen } from "../QRScanScreen";

const HomeStack = createNativeStackNavigator();
export const  HomeStackScreen =() => {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />       
    <HomeStack.Screen name="Contact" component={ContactScreen} />
    <HomeStack.Screen name="QR"  key="QR" component={QRScanScreen} />
   </HomeStack.Navigator>
  );
}