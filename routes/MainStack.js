import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../screens/Main";
import Print from "../screens/Print";
import Login from '../screens/Login';
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function MainStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
                title: "제품 출하 처리",  
                headerStyle: {
                    backgroundColor: '#5050FF',
                    
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
            }}
            />
            <Stack.Screen 
            name="Main" 
            component={Main} 
            options={{
                title: "제품 출하 처리",  
                headerStyle: {
                    backgroundColor: '#5050FF',
                    
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',

                // Logout button
                headerLeft: () => (
                    <Text></Text>
                )
            }}
           
            />
            <Stack.Screen 
            name="Print" 
            component={Print} 
            options={{
                title: "송장 출력",  
                headerStyle: {
                    backgroundColor: '#5050FF',
                    
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
            }}

            />
        </Stack.Navigator>
    )
}