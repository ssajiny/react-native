import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Header from "./components/Header";
import DataList from "./components/DataList";
import Controller from "./components/Controller";
import Registration from "./components/Registration";

export default function App() {
  // data
  const [data, setData] = useState([
    { num: "SGB3727192", fac: "4면", weight: 20500, com: "", carNum: "" },
    {
      num: "SGB3727123",
      fac: "4면",
      weight: 20400,
      com: "광양",
      carNum: "43타1524",
    },
    { num: "SGB3727124", fac: "4면", weight: 10500, com: "", carNum: "" },
    { num: "SGB3727225", fac: "4면", weight: 2500, com: "", carNum: "" },
    { num: "SGB3727126", fac: "4면", weight: 20800, com: "", carNum: "" },
    { num: "SGB3727127", fac: "4면", weight: 22300, com: "", carNum: "" },
    { num: "SGB3727120", fac: "4면", weight: 21560, com: "", carNum: "" },
    {
      num: "SGB3727178",
      fac: "4면",
      weight: 32100,
      com: "포항",
      carNum: "55바1234",
    },
    { num: "SGB3727165", fac: "4면", weight: 12500, com: "", carNum: "" },
    { num: "SGB3727146", fac: "4면", weight: 17500, com: "", carNum: "" },
    { num: "SGB3727192", fac: "4면", weight: 20500, com: "", carNum: "" },
    { num: "SGB3727123", fac: "4면", weight: 20400, com: "", carNum: "" },
    { num: "SGB3727124", fac: "4면", weight: 10500, com: "", carNum: "" },
    { num: "SGB3727225", fac: "4면", weight: 2500, com: "", carNum: "" },
    { num: "SGB3727126", fac: "4면", weight: 20800, com: "", carNum: "" },
    { num: "SGB3727127", fac: "4면", weight: 22300, com: "", carNum: "" },
    { num: "SGB3727120", fac: "4면", weight: 21560, com: "", carNum: "" },
    { num: "SGB3727178", fac: "4면", weight: 32100, com: "", carNum: "" },
    { num: "SGB3727165", fac: "4면", weight: 12500, com: "", carNum: "" },
    { num: "SGB3727146", fac: "4면", weight: 17500, com: "", carNum: "" },
  ]);


  return (
    // container
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Header />
      </View>

      {/* registration */}
      <View style={styles.registration}>
        <Registration />
      </View>

      {/* main list */}
      <View style={styles.list}>
        <ScrollView>
          <DataList data={data} />
        </ScrollView>
      </View>

      {/* controller */}
      <View style={styles.controller}>
        <Controller />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
  },
  registration: {
    flex: 1.3,
  },

  list: {
    flex: 20,
  },
  controller: {
    flex: 2,
  },
});
