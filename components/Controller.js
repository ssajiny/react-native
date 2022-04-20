import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable  } from 'react-native';

export default function Controller({setData, printInfo}) {

    return(
        <View style={styles.container}>
            <Pressable style={styles.buttonLeft} onPress={()=>{
              // 제품 조회: backend에서 재료코드=3,진도코드=3인 제품번호를 가져온다. (테스트는 1,1로 가져온다)
                setData(() => {
                  fetch('http://192.168.56.1:8080/api/export/view')
                    .then(res => {
                      return res.json()
                    })
                    .then((list) => {                      
                      setData(list.data);                      
                    })
                    .catch(e => console.log(e));
                })

            }}>
                <Text style={styles.textLeft}>제품조회</Text>
            </Pressable>

            <Pressable style={styles.buttonRight} onPress={()=>{printInfo()}}>
                <Text style={styles.textRight}>송장출력</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        
    },
    buttonLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFE650',
      },
      buttonRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5050FF',
      },
      textLeft: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      textRight: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});