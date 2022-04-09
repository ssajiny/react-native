import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Registration({ controllNum, setModalOpen }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalOpen(true);
          console.log(controllNum + "from Registration.js");
        }}
      >
        <Text style={styles.text}>상차등록</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          Alert.alert('출하처리', '출하가 정상적으로 처리 되었습니다.');
        }}
      >
        <Text style={styles.text}>출하처리</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#464646",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
