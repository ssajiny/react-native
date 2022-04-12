import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import Header from "./Header";
import DataList from "./DataList";
import Controller from "./Controller";
import Registration from "./Registration";

// json server 통신
// npx json-server --watch data/db.json --port 8000 --host 192.168.56.1

export default function Main({navigation}) {
  // data fetch from server
  const [data, setData] = useState(null);

  // DataList의 Modal창으로 부터 입력 받은 carNum, com의 정보를 이용하여 json 업데이트
  // data state 수정
  const carHandler = (selected, tmpCarNum, tmpCom) => {
    
    // 차량, 회사 정보를 입력 안 했을 시
    if(tmpCarNum === null || tmpCom === null){
      Alert.alert('오류', '차량번호, 회사를 입력 하세요.');
    }
    
    // Modal창에서 선택 된 값 수정
    else {data && data.map((tmp) => {
      if(tmp.num === selected){
        tmp.carNum = tmpCarNum;
        tmp.com = tmpCom;
        
      }
    }
    
    );}

    // setData((prevData) => {
    //   return (prevData.filter(data => data.num != selected));
    // });
  };


  // Modal 창 controll
  const [modalOpen, setModalOpen] = useState(false);

  // 선택 된 column의 제품번호 저장
  const [controllNum, setControllNum] = useState();

  // 송장 출력
  const printInfo = () => {
    navigation.navigate('Print');
  }

  return (
    // container
    <View style={styles.container}>
      {/* header */}
      {/* header navigation으로 삭제 예정 */}
      {/* <View style={styles.header}> */}
        {/* <Header /> */}
      {/* </View> */}

      {/* registration */}
      <View style={styles.registration}>
        <Registration 
        // 제품 번호
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
        printInfo={printInfo}
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
