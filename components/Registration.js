import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

export default function Registration({
  controllNum,
  setModalOpen,
  sendingOut,
  navigation
}) {
  return (
    // 상차등록, 출하처리 View Container
    <View style={styles.container}>
      {/* 상차등록 button */}
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalOpen(true);
        }}
      >
        <Text style={styles.text}>상차등록</Text>
      </Pressable>

      {/* 출하처리 button */}
      <Pressable
        style={styles.button}
        onPress={() => {
          sendingOut();
        }}
      >
        <Text style={styles.text}>출하처리</Text>
      </Pressable>

      {/* 로그아웃 */}
      <Pressable
        style={styles.button}
        onPress={() => {
        navigation.goBack();
        }}
      >
        <Text style={styles.text}>로그아웃</Text>
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
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#464646",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
