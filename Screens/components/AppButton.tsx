import React from "react";
import {  StyleSheet, Text, TouchableOpacity } from "react-native";

interface params {
    onPress: any;
    title: string;
  }

export const AppButton = ({ onPress, title }:params) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#1560BD",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });