import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import { DataTable } from "react-native-paper";

export default function Print({navigation}) {

  // 데이터 받아오기
  const [data, setData] = useState();
  useEffect(()=>{
    setData(() => {
      fetch('http://192.168.56.1:8000/data')
        .then(res => {
          return res.json()
        })
        .then((list)=>{
          setData(list);
        })
        .catch(e => console.log(e));
    })
  }, []);

  return (
    // Main Container
    <View style={styles.container}>
     
      {/* Date Container */}
      <View style={styles.dateContanier}>
        <Text style={{fontSize:15, marginTop: 5, marginLeft: 10, marginRight: 10,}}>출하일자</Text>
        {/* Date Picker */}
        <Text>2020-22-03</Text>
        {/* 조회 button */}
        <Pressable
          style={styles.dateButton}
          onPress={()=>{
            console.log('조회');
          }}
        >
          <Text style={styles.dateButtonText}>조회</Text>
        </Pressable>

        {/* 출력 button */}
        <Pressable
          style={styles.dateButton}
          onPress={()=>{
            console.log('출력');
          }}
        >
          <Text style={styles.dateButtonText}>출력</Text>
        </Pressable>
      </View>

      {/* Data List Container */}
      <View style={styles.dataList}>
      <DataTable>
        <DataTable.Header style={styles.Listheader}>
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
        {data && data.map((col, index) => {
          return (
            <View>
              <DataTable.Row key={index}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{col.num}</DataTable.Cell>
                <DataTable.Cell>{col.fac}</DataTable.Cell>
                <DataTable.Cell>{col.weight}</DataTable.Cell>
                <DataTable.Cell>{col.com}</DataTable.Cell>
                <DataTable.Cell>{col.carNum}</DataTable.Cell>
              </DataTable.Row>
            </View>
          );
        })}
      </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },  
  dateContanier: {
    flex: 1.3,
    backgroundColor: "white",
    flexDirection: 'row',
  },
  dateButton: {
    marginLeft: 5,
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#464646",
  },
  dateButtonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  dataList: {
    flex: 22,
    backgroundColor: 'white',
  },
  Listheader: {
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
});
