import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Button } from "react-native";
import DataList from "./DataList";
import Controller from "./Controller";
import Registration from "./Registration";
// json server 통신
// npx json-server --watch data/db.json --port 8000 --host 192.168.56.1

/**
 * 순번
 * SHIPMENT_MGM: 제품번호, 중량, #고객사, #차량번호, #출하일자
 * MATERIAL_MGM: 제품번호, 공장, #진도코드, #상태코드
 */

export default function Main({ navigation }) {
  // data fetch from server
  const [data, setData] = useState(null);

  // DataList의 Modal창으로 부터 입력 받은 carNum, com의 정보를 이용하여 json 업데이트
  // data state 수정
  const carHandler = (selected, tmpCarNum, tmpCom) => {
    // 차량, 회사 정보를 입력 안 했을 시
    if (tmpCarNum === null || tmpCom === null) {
      Alert.alert("오류", "차량번호, 회사를 입력 하세요.");
    }

    // Modal창에서 선택 된 값 수정
    else {
      data &&
        data.map((tmp) => {
          if (tmp.materialNumber === selected) {
            //  화면에 보여지는 state update
            tmp.carNumber = tmpCarNum;
            tmp.clientCompany = tmpCom;
            // DB Update
            fetch("http://192.168.56.1:8080/api/export/update/delivery", {
              method: "post",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                materialNumber: `${selected}`,
                clientCompany: `${tmpCom}`,
                carNumber: `${tmpCarNum}`,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .catch((e) => console.log(e));
          }
        });
      // selected: 제품번호, tmpCarNum: 차량번호, tmpCom: 고객사
      // backend update

      console.log(selected + " Main.js");
    }

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
    navigation.navigate("Print");
  };

  // 출하 처리
  const sendingOut = () => {
    // 고객사와 차량번호가 입력 되어 있는지 확인 if(...)  controllNum
    data && data.map(tmp => {
      if(tmp.materialNumber === controllNum){
        if(tmp.carNumber===null || tmp.clientCompany===null){
          Alert.alert('출하처리', '출하 처리 진행 불가\n차량번호와 고객사를 입력하세요.');
        }else{
          // 출하처리
          // shipmentDate 현재 날짜로 업데이트
          

          Alert.alert(
            "출하처리",
            `${controllNum} 출하가 정상적으로 처리 되었습니다.`
          );
        }
      }
    })

    
    // 제품 코드 출하 처리로 변경
    // 상태코드, 진도코드, 출하날짜 업데이트
    fetch("http://192.168.56.1:8080/api/export/update/code", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          materialNumber: `${selected}`,
          clientCompany: `${tmpCom}`,
          carNumber: `${tmpCarNum}`,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((e) => console.log(e));



    // 제품조회 Refresh




  }

  return (

    // container
    <View style={styles.container}>
      {/* registration */}
      <View style={styles.registration}>
        <Registration
          // 제품 번호
          controllNum={controllNum}
          setModalOpen={setModalOpen}
          sendingOut={sendingOut}
          navigation={navigation}
        />
      </View>

      {/* main list */}
      <View style={styles.list}>
        <ScrollView>
          <DataList
            data={data}
            setControllNum={setControllNum}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            carHandler={carHandler}
          />
        </ScrollView>
      </View>

      {/* controller */}
      <View style={styles.controller}>
        <Controller setData={setData} printInfo={printInfo} />
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
