import React from "react";
import {  ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface params {
    message: string;
    loaderSize: 'small'| 'large'
  }

export const LoadingScreen = ({ message,loaderSize }:params) => (
    <View>
    <Text style={styles.loader}>{message}</Text>
    <ActivityIndicator color="#00ff00" size = {loaderSize}   style = {[styles.activityIndicator ]} />
  </View>
  );


const styles = StyleSheet.create({
    loader: {
        padding: 15,
        fontSize: 30,
        textAlign: "center",
        color: "black"
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     }
  });