import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as expoPrint from "expo-print";
import moment from "moment";

/**
 * 순번, 연락처, 확인
 * SHIPMENT_MGM: 출하일자, 제품번호,  고객사, 차량번호
 * MATERIAL_MGM: 제품번호, 현재 두께, 현재 길이, 현재 폭, 현재 중량, #진도코드, #상태코드
 */

export default function Print({ navigation }) {
  let start = "2020-02-02";
  let end = moment(new Date()).format("YYYY-MM-DD");

  const [data, setData] = useState();
  // 진도코드=4 ,상태코드=4 출하완료 된 제품 조회
  useEffect(() => {
    setData(() => {
      fetch("http://192.168.0.47:8080/api/export/view/shipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((list) => {
          setData(list.data);
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

  // Print
  const htmltable = () => {
    let t = "";
    for (let i in data) {
      const item = data[i].material_number;
      t =
        t +
        `<tr>
       <td style="text-align:center;">${Number(i) + 1}</td>
       <td style="width:90">${data[i].shipment_date}</td>
       <td>${data[i].material_number}</td>
       <td>${data[i].current_width}</td>
       <td>${data[i].current_length}</td>
       <td>${data[i].current_thickness}</td>
       <td>${data[i].weight_shipment}</td>
       <td>${data[i].client_company}</td>
       <td>${data[i].car_number}</td>
       <td width=70></td>
       <td style="width=40"></td>
     </tr>`;
    }
    return t;
  };

  const htmlContent = `<html>
    <header></header>
    <title></title>
    <style>
        table, th, td {
           border:1px solid black;
        }
    </style>
    <body>
       <table>
        <th style="font-size:7px; background-color:grey">순번</th>
        <th style="background-color:grey">출하일자</th>
        <th style="background-color:grey">제품번호</th>
        <th style="background-color:grey">두께</th>
        <th style="background-color:grey">길이</th>
        <th style="background-color:grey">폭</th>
        <th style="background-color:grey">중량</th>
        <th style="background-color:grey">고객사</th>
        <th style="background-color:grey">차량번호</th>
        <th style="background-color:grey">연락처</th>
        <th style="background-color:grey">확인</th>
          ${htmltable()}
       </table>
    </body>
</html>`;

  const print = () => {
    expoPrint
      .printAsync({
        html: htmlContent,
        width: 3508,
        height: 2480,
      })
      .then(() => {
        setPrintLoadoutLoader(false);
      })
      .catch(() => {
        setPrintLoadoutLoader(false);
      });
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
            // startDate, endDate 변환
            // Wed Apr 20 2022 03:17:44 GMT+0000 to 2022-4-20
            start = moment(startDate).format("YYYY-MM-DD");
            end = moment(endDate).format("YYYY-MM-DD");
            setData(() => {
              fetch("http://192.168.0.47:8080/api/export/view/shipment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  startDate: start,
                  endDate: end,
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((list) => {
                  setData(list.data);
                })
                .catch((e) => console.log(e));
            });
          }}
        >
          <Text style={styles.dateButtonText}>조회</Text>
        </Pressable>

        {/* 출력 button */}
        <Pressable
          style={styles.dateButton}
          onPress={() => {
            print();
          }}
        >
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
    fontWeight: "bold",
    margin: 7,
  },
});
