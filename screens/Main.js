import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import DataList from "../components/DataList";
import Controller from "../components/Controller";
import Registration from "../components/Registration";

/**
 * 순번
 * SHIPMENT_MGM: 제품번호, 중량, 고객사, 차량번호, 출하일자
 * MATERIAL_MGM: 제품번호, 공장, 상태코드, 진도코드, 상태코드
 */

export default function Main({ navigation }) {
  // data fetch from server 리스트에 보여질 data
  const [data, setData] = useState(null);

  // DataList의 Modal창으로 부터 입력 받은 selected(제품번호), tmpCarNum(차량번호), tmpCom(고객사)를 이용하여
  // 상차등록, data state update
  const carHandler = (selected, tmpCarNum, tmpCom) => {
    // 차량, 회사 정보가 null 일 때
    console.log(selected, tmpCarNum, tmpCom);
    if (tmpCarNum === null || tmpCom === null || tmpCarNum === '' || tmpCom === '') {
      Alert.alert("오류", "차량번호, 회사를 입력 하세요.");
    }
    // Modal창에서 선택 된 값을 이용하여 data update
    else {
      // data가 null이 아니면 실행한다.
      data &&
        data.map((tmp) => {
          // 선택 된 값이면
          if (tmp.materialNumber === selected) {
            //  화면에 보여지는 state update
            tmp.carNumber = tmpCarNum;
            tmp.clientCompany = tmpCom;
            // DB Update
            // 제품번호를 이용하여 나머지 state를 업데이트 한다.
            fetch("http://192.168.0.47:8080/api/export/update/delivery", {
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
    }
  };

  // Modal 창을 controll 하기 위한 useState
  const [modalOpen, setModalOpen] = useState(false);

  // 선택 된 column의 제품번호 저장하기 위한 useState
  const [controllNum, setControllNum] = useState();

  // 송장 출력버튼 클릭시 print 화면으로 이동
  const printInfo = () => {
    navigation.navigate("Print");
  };

  // 출하처리 하기 위한 함수
  const sendingOut = () => {
    // 출하처리 할 제품이 선택되어 있는지 확인
    if (controllNum === null) {
      Alert.alert("오류", "출하처리 할 제품번호를 선택하세요.");
    }

    data &&
      data.map((tmp) => {
        if (tmp.materialNumber === controllNum) {
          if (tmp.carNumber === null || tmp.clientCompany === null) {
            Alert.alert(
              "출하처리",
              "출하 처리 진행 불가\n차량번호와 고객사를 입력하세요."
            );
          } else {
            // 출하처리
            // shipmentDate 현재 날짜로 업데이트
            // 제품 코드 출하 처리로 변경
            fetch("http://192.168.0.47:8080/api/export/update/code", {
              method: "post",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                materialNumber: `${controllNum}`,
                clientCompany: `${tmp.clientCompany}`,
                carNumber: `${tmp.carNumber}`,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .catch((e) => console.log(e));

            // 제품조회 Refresh


            Alert.alert(
              "출하처리",
              `${controllNum} 출하가 정상적으로 처리 되었습니다.`
            );
          }
        }
      });
  };

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
