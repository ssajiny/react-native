import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../components/Main";
import Print from "../components/Print";

const Stack = createNativeStackNavigator();

export default function MainStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Main" 
            component={Main} 
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