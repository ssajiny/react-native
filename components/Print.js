import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { DataTable } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function Print({ navigation }) {
  const [data, setData] = useState();
  useEffect(() => {
    setData(() => {
      fetch("http://192.168.56.1:8000/data")
        .then((res) => {
          return res.json();
        })
        .then((list) => {
          setData(list);
        })
        .catch((e) => console.log(e));
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
          <Text style={styles.dateSelectorText}>{`${startDate.getMonth()+1}월 ${startDate.getDate()}일`}</Text>
        </Pressable>

        <Text style={styles.normalText}>~</Text>

        {/* To Selector*/}
        <Pressable
          style={styles.dateSelectorButton}
          onPress={() => {
            setEndShow(true);
          }}
          >
          <Text style={styles.dateSelectorText}>{`${endDate.getMonth()+1}월 ${endDate.getDate()}일`}</Text>
        </Pressable>


        {/* 조회 button */}
        <Pressable
          style={styles.dateButton}
          onPress={() => {
            console.log(startDate + " ~ " + endDate);
          }}
        >
          <Text style={styles.dateButtonText}>조회</Text>
        </Pressable>

        {/* 출력 button */}
        <Pressable
          style={styles.dateButton}
          onPress={() => {
            

          }}
        >
          <Text style={styles.dateButtonText}>출력</Text>
        </Pressable>

        {/* 테스트 버튼 */}

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
          {data &&
            data.map((col, index) => {
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
  }
});
