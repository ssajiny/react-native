import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function DataList({ data }) {
  // column clicked
  const pressHandler = (id, com, carNum) => {
    setNum(id);
    setCom(com);
    setCarNum(carNum);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState();

  // 선택 된 제품 번호
  const [num, setNum] = useState();
  const [carNum, setCarNum] = useState();
  const [com, setCom] = useState();

  // 선택 된 제품 번호
  const [selected, setSelected] = useState();

  return (
    // Container
    <View style={styles.container}>
      {/* Modal Conatiner*/}
      <Modal
        animationType="slide"
        visible={modalOpen}
        transparent={true}
        productNum = {num}
        onRequestClose = {()=>{
          setCarNum();
          setCom();
        }}
      >
        {/* Modal Content */}
        {/* Modal Text */}
        <View style={styles.modalConent}>
          <Text style={styles.modalText}>차량번호</Text>
          <TextInput style={styles.modalInput} onChangeText={setText} placeholder={carNum} />
          <Text style={styles.modalText}>고객사</Text>
          <TextInput style={styles.modalInput} onChangeText={setText} placeholder={com} />

          {/* Modal button */}
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalOpen(false);
              }}
            >
              <Text style={styles.modalButtonText}>등록</Text>
            </Pressable>
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
          <DataTable.Title>
            <Text style={styles.title}>순번</Text>
          </DataTable.Title>
          <DataTable.Title>
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
        {data.map((col, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                pressHandler(col.num, col.com, col.carNum);
                setModalOpen(true);
                setSelected(col.num);
              }}
            >
              <DataTable.Row key={index} style={{backgroundColor:selected === col.num ? "pink" : "white"}}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{col.num}</DataTable.Cell>
                <DataTable.Cell>{col.fac}</DataTable.Cell>
                <DataTable.Cell>{col.weight}</DataTable.Cell>
                <DataTable.Cell>{col.com}</DataTable.Cell>
                <DataTable.Cell>{col.carNum}</DataTable.Cell>
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
    backgroundColor: "#787878",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
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
