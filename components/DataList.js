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
  const pressHandler = (id) => {
    console.log(id);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState();
  return (
    // Container
    <View style={styles.container}>
      {/* Modal Conatiner*/}
      <Modal
        animationType="slide"
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => {
          console.log("closed");
        }}
      >
        {/* Modal Content */}
        {/* Modal Text */}
        <View style={styles.modalConent}>
          <Text style={styles.modalText}>차량번호</Text>
          <TextInput style={styles.modalInput} onChangeText={setText} />
          <Text style={styles.modalText}>고객사</Text>
          <TextInput style={styles.modalInput} onChangeText={setText} />

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
          <DataTable.Title>제품번호</DataTable.Title>
          <DataTable.Title>공장</DataTable.Title>
          <DataTable.Title>중량</DataTable.Title>
          <DataTable.Title>고객사</DataTable.Title>
          <DataTable.Title>차량번호</DataTable.Title>
        </DataTable.Header>
        {data.map((col, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                pressHandler(col.num);
                setModalOpen(true);
              }}
            >
              <DataTable.Row key={index}>
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
  },
  title: {
    color: "black",
    fontSize: 15,
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
