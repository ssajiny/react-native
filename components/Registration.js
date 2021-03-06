import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Registration({ setModalOpen, sendingOut, navigation, controllNum }) {
  return (
    // 상차등록, 출하처리 View Container
    <View style={styles.container}>
      {/* 상차등록 button */}
      <Pressable
        style={styles.button}
        onPress={() => {
          controllNum && setModalOpen(true);
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
        style={styles.LogoutButton}
        onPress={() => {
          navigation.goBack();
        }}>
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
  LogoutButton: {
    marginLeft: 150,
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
