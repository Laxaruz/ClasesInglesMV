import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ClasesStack from '../navigation/ClasesStack';
import { color, typography } from '../theme';

const Tab = createBottomTabNavigator();

function PantallaTemporal({ titulo }) {
    return (
        <View style={styles.pantalla}>
            <Text style={typography.subtitulo}>{titulo}</Text>
        </View>
    );
}

function ReservasScreen() {
    return <PantallaTemporal titulo="Reservas" />;
}

function PerfilScreen() {
    return <PantallaTemporal titulo="Perfil" />;
}

export default function InicioScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                let nombreIcono = 'book-outline';

                if (route.name === 'Reservas') {
                    nombreIcono = 'calendar-outline';
                } else if (route.name === 'Perfil') {
                    nombreIcono = 'person-outline';
                }

                return {
                    headerShown: false,
                    tabBarActiveTintColor: color.primario,
                    tabBarInactiveTintColor: color.textoSuave,
                    tabBarIcon: ({ color: colorIcono, size }) => (
                        <Ionicons
                            name={nombreIcono}
                            size={size}
                            color={colorIcono}
                        />
                    ),
                };
            }}
        >
            <Tab.Screen name="Clases" component={ClasesStack} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.fondo,
    },
});