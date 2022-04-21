import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { DataTable } from "react-native-paper";

// modal창과 main의 datalist를 controll
export default function DataList({ data, setControllNum, modalOpen, setModalOpen, carHandler }) {
  
  // Modal 창의 input text를 임시 저장하기 위한 값
  const [tmpCarNum, setTmpCarNum] = useState();
  const [tmpCom, setTmpCom] = useState();

  // 선택 된 제품 번호를 저장하여, 선택된 column의 background color를 변경하기 위한 값
  const [selected, setSelected] = useState();

  return (
    // Container
    <View style={styles.container}>
      {/* Modal Conatiner*/}
      <Modal
        animationType="slide"
        visible={modalOpen}
        transparent={true}        
      >
        {/* Modal Content */}
        {/* Modal Text */}
        <View style={styles.modalConent}>
          <Text style={styles.modalText}>차량번호</Text>
          <TextInput 
          style={styles.modalInput} 
          onChangeText={setTmpCarNum}
          />
          <Text style={styles.modalText}>고객사</Text>
          <TextInput 
          style={styles.modalInput} 
          onChangeText={setTmpCom}  
          />

          {/* Modal button */}
          <View style={{ flexDirection: "row" }}>
            {/* 등록 버튼 */}
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalOpen(false);
                // tmp 값에 저장된 값을 Main.js로 전달  
                // Main.js의 carHandler 함수를 호출
                carHandler(selected, tmpCarNum, tmpCom);
                
                // 저장 되어 있는 값을 초기화
                setTmpCarNum(null);
                setTmpCom(null);

              }}
            >
              <Text style={styles.modalButtonText}>등록</Text>
            </Pressable>

              {/* 취소 버튼 */}
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>취소</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* DataTable */}
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={{flex:0.5}}>
            <Text style={styles.title}>순번</Text>
          </DataTable.Title>
          <DataTable.Title style={{flex:1.5, justifyContent: "center"}}>
            <Text style={styles.title}>제품번호</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>공장</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>중량</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>고객사</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.title}>차량번호</Text>
          </DataTable.Title>
        </DataTable.Header>

        {data && data.map((col, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
               // bg color 변경하기 위해
                setSelected(col.materialNumber);
                // App.js로 선택된 제품번호 보내기
                setControllNum(col.materialNumber);
              }}
            >
              {/* 선택 된 column bg color 변경 */}
              <DataTable.Row key={index} style={{backgroundColor:selected === col.materialNumber ? "pink" : "white"}}>
                <DataTable.Cell style={{flex:0.5}}>{index + 1}</DataTable.Cell>
                <DataTable.Cell style={{flex:1.5}}>{col.materialNumber}</DataTable.Cell>
                <DataTable.Cell>{col.factory}</DataTable.Cell>
                <DataTable.Cell>{col.weightPrd}</DataTable.Cell>
                <DataTable.Cell>{col.clientCompany}</DataTable.Cell>
                <DataTable.Cell>{col.carNumber}</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          );
        })}
      </DataTable>
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
    backgroundColor: "#b4b4b4",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center"

  },
  modalConent: {
    backgroundColor: "#00B9FF",
    padding: 35,
    margin: 60,
    marginTop: 200,
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    alignContent: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalInput: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#464646",
    margin: 5,
    padding: 5,
    width: 80,
  },
  modalButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
