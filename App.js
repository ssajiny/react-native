import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./routes/MainStack.js";

// json server 통신
// npx json-server --watch data/db.json --port 8000 --host 192.168.56.1

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  }  
});
