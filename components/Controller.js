import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable  } from 'react-native';

export default function Controller({setData}) {

    

    return(
        <View style={styles.container}>
            <Pressable style={styles.buttonLeft} onPress={()=>{
                setData(() => {
                  fetch('http://192.168.56.1:8000/data')
                    .then(res => {
                      return res.json()
                    })
                    .then((list) => {
                      setData(list);
                    })
                    .catch(e => console.log(e));
                })
            }}>
                <Text style={styles.textLeft}>제품조회</Text>
            </Pressable>

            <Pressable style={styles.buttonRight} onPress={()=>console.log("right")}>
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