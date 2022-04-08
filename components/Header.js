import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {

    return(
        <View style={styles.container}>
            <Text style={styles.text}>제품 출하 처리</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        // marginTop: 20,
        // marginBottom: 2,
        backgroundColor: '#5050FF',

    },
    text:{
        fontSize: 15,
        color: 'white',
        marginLeft: 35,
        
    },
});