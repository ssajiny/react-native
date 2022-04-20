import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import * as expoPrint from "expo-print";
import { shareAsync } from "expo-sharing";
// json server 통신
// npx json-server --watch data/print.json --port 8000 --host 192.168.56.1

/**
 * 순번, 연락처, 확인
 * SHIPMENT_MGM: 출하일자, 제품번호,  고객사, 차량번호
 * MATERIAL_MGM: 제품번호, 현재 두께, 현재 길이, 현재 폭, 현재 중량, #진도코드, #상태코드
 */

export default function Print({ navigation }) {
  const [data, setData] = useState();
  // 진도코드=4 ,상태코드=4 출하완료 된 제품 조회
  useEffect(() => {
    setData(() => {
      fetch("http://192.168.56.1:8080/api/export/view/shipment",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "startDate": "2022-02-20",
          "endDate": "2022-04-21"
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((list) => {                      
        setData(list.data);                      
      })
      .catch(e => console.log(e));
    });
  }, []);

  // Date
  // start Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [startShow, setStartShow] = useState(false);

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartShow(false);
    setStartDate(currentDate);
  };

  // end Date picker
  const [endDate, setEndDate] = useState(new Date());
  const [endShow, setEndShow] = useState(false);

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndShow(false);
    setEndDate(currentDate);
  };

  return (
    // Main Container
    <View style={styles.container}>
      {/* Date Container */}
      <View style={styles.dateContanier}>
        <Text style={styles.normalText}>출하일자</Text>
        {/* Date Picker */}
        {/* From Selector*/}
        <Pressable
          style={styles.dateSelectorButton}
          onPress={() => {
            setStartShow(true);
          }}
        >
          <Text style={styles.dateSelectorText}>{`${
            startDate.getMonth() + 1
          }월 ${startDate.getDate()}일`}</Text>
        </Pressable>

        <Text style={styles.normalText}>~</Text>

        {/* To Selector*/}
        <Pressable
          style={styles.dateSelectorButton}
          onPress={() => {
            setEndShow(true);
          }}
        >
          <Text style={styles.dateSelectorText}>{`${
            endDate.getMonth() + 1
          }월 ${endDate.getDate()}일`}</Text>
        </Pressable>

        {/* 조회 button */}
        <Pressable
          style={styles.dateButton}
          onPress={() => {
            console.log(startDate + " ~ " + endDate);
            console.log(data);
          }}
        >
          <Text style={styles.dateButtonText}>조회</Text>
        </Pressable>

        {/* 출력 button */}
        <Pressable style={styles.dateButton} onPress={() => {
          console.log(print);
        }}>
          <Text style={styles.dateButtonText}>출력</Text>
        </Pressable>

        {/* DatePicker */}
        {startShow && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={"date"}
            is24Hour={true}
            onChange={onStartChange}
          />
        )}

        {endShow && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={"date"}
            is24Hour={true}
            onChange={onEndChange}
          />
        )}
      </View>

      {/* Data List Container */}
      <View style={styles.dataList}>
        <ScrollView>
          <DataTable>
            <DataTable.Header style={styles.Listheader}>
              <DataTable.Title style={{ flex: 0.5, justifyContent: "center" }}>
                <Text style={styles.title}>순번</Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1.5, justifyContent: "center" }}>
                <Text style={styles.title}>출하일자</Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1.5, justifyContent: "center" }}>
                <Text style={styles.title}>제품번호</Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.title}>중량</Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.title}>고객사</Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1.2, justifyContent: "center" }}>
                <Text style={styles.title}>차량번호</Text>
              </DataTable.Title>
            </DataTable.Header>
            {data &&
              data.map((col, index) => {
                return (
                  <View>
                    <DataTable.Row key={index}>
                      <DataTable.Cell
                        style={{ flex: 0.5, justifyContent: "center" }}
                      >
                        {index + 1}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ flex: 1.5, justifyContent: "center" }}
                      >
                        {col.shipment_date}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ flex: 1.5, justifyContent: "center" }}
                      >
                        {col.material_number}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ flex: 1, justifyContent: "center" }}
                      >
                        {col.weight_shipment}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ flex: 1, justifyContent: "center" }}
                      >
                        {col.client_company}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ flex: 1.2, justifyContent: "center" }}
                      >
                        {col.car_number}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </View>
                );
              })}
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContanier: {
    flex: 1.3,
    backgroundColor: "white",
    flexDirection: "row",
  },
  dateSelectorButton: {
    marginLeft: 5,
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  dateSelectorText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  dateButton: {
    marginLeft: 6,
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
    backgroundColor: "white",
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
    justifyContent: "center",
  },
  normalText: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
