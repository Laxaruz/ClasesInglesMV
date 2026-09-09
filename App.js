import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClasesStack from './src/navigation/ClasesStack';
import {color} from './src/theme';

const temaNavegacion = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: color.fondo,
        primary: color.primario,
        text: color.texto,
        border: color.border,
    },
};

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={temaNavegacion}>
                <ClasesStack />
            </NavigationContainer>
            <StatusBar style="dark" />
        </SafeAreaProvider>


    );
}

