import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Header from "./components/Header";
import DataList from "./components/DataList";
import Controller from "./components/Controller";
import Registration from "./components/Registration";

// json server 통신
// npx json-server --watch data/db.json --port 8000 --host 192.168.56.1

export default function App() {
  // data fetch from server
  const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch('http://192.168.56.1:8000/data')
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then((list) => {
  //       setData(list);
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  // data state 수정
  const carHandler = (controllNum) => {
    setData(prevData => {
      return prevData.filter(data => data.num != controllNum);
    });
  };

  // Modal 창 controll
  const [modalOpen, setModalOpen] = useState(false);

  // 선택 된 column의 제품번호 저장
  const [controllNum, setControllNum] = useState();
  console.log(controllNum + "from App.js");

  return (
    // container
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Header />
      </View>

      {/* registration */}
      <View style={styles.registration}>
        <Registration 
        controllNum={controllNum} 
        setModalOpen={setModalOpen} 
        />
      </View>

      {/* main list */}
      <View style={styles.list}>
        <ScrollView>
          <DataList data={data} 
          setControllNum={setControllNum} 
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          carHandler={carHandler}
          />
        </ScrollView>
      </View>

      {/* controller */}
      <View style={styles.controller}>
        <Controller 
        setData={setData}
        />
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
