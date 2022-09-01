
import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from "../HomeScreen";

import WalletConnectEvents from "../WalletConnectEvents/WalletConnectEvents";
import {HOME_SCREEN, SCAN_SCREEN, WC_SCREEN } from "../../constants";
import ScanScreen from "../ScanScreen";

const HomeStack = createNativeStackNavigator();
export const  HomeStackScreen: FunctionComponent<{}> =() => {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name={HOME_SCREEN} component={HomeScreen} />       
    <HomeStack.Screen name={SCAN_SCREEN}  component={ScanScreen} />
    <HomeStack.Screen name={WC_SCREEN}  component={WalletConnectEvents} />
   </HomeStack.Navigator>
  );
}