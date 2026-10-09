import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import useReserva from '../hooks/useReserva';

import ClasesStack from '../navigation/ClasesStack';
import PerfilScreen from './PerfilScreen';
import { color, typography } from '../theme';

const Tab = createBottomTabNavigator();

function ReservasScreen() {
    const { reservas, cargando, cancelarReserva } = useReserva();

    const confirmarCancelacion = (reserva) => {
        Alert.alert(
            'Cancelar reserva',
            `¿Estás seguro de que deseas cancelar "${reserva.titulo}"?`,
            [
                {
                    text: 'Volver',
                    style: 'cancel'
                },
                {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: () => cancelarReserva(reserva.id)
                }
            ]
        );
    };

    if (cargando) {
        return (
            <View style={styles.pantalla}>
                <Text style={typography.subtitulo}>
                    Cargando reservas...
                </Text>
            </View>
        );
    }

    if (reservas.length === 0) {
        return (
            <View style={styles.pantalla}>
                <Text style={typography.subtitulo}>
                    No tienes reservas
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.pantalla}>
            <Text style={typography.subtitulo}>
                Mis reservas
            </Text>

            <FlatList
                style={styles.listaReservas}
                data={reservas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tarjetaReserva}>
                        <Text style={styles.tituloReserva}>
                            {item.titulo}
                        </Text>

                        <Text style={styles.nivelReserva}>
                            Nivel: {item.nivel}
                        </Text>

                        <View style={styles.datoReserva}>
                            <Ionicons
                                name="person-outline"
                                size={18}
                                color={color.primario}
                            />
                            <Text style={styles.textoDato}>
                                {item.profesor}
                            </Text>
                        </View>

                        <View style={styles.datoReserva}>
                            <Ionicons
                                name="calendar-outline"
                                size={18}
                                color={color.primario}
                            />
                            <Text style={styles.textoDato}>
                                {item.horario}
                            </Text>
                        </View>

                        <View style={styles.datoReserva}>
                            <Ionicons
                                name="time-outline"
                                size={18}
                                color={color.primario}
                            />
                            <Text style={styles.textoDato}>
                                {item.duracion} minutos
                            </Text>
                        </View>

                        <Text style={styles.precioReserva}>
                            ${item.precio.toLocaleString('es-CO')} COP
                        </Text>
                        <Pressable
                            style={styles.botonCancelar}
                            onPress={() => confirmarCancelacion(item)}
                        >
                            <Text style={styles.textoBotonCancelar}>
                                Cancelar reserva
                            </Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );

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
        paddingTop: 40,
        backgroundColor: color.fondo,
    },
    listaReservas: {
        width: '100%',
        flex: 1,
    },

    tarjetaReserva: {
        width: '90%',
        padding: 18,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 3,
    },

    tituloReserva: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },

    nivelReserva: {
        fontSize: 14,
        color: color.textoSuave,
        marginBottom: 14,
    },

    datoReserva: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },

    textoDato: {
        fontSize: 15,
        color: color.texto,
    },

    precioReserva: {
        fontSize: 17,
        fontWeight: '700',
        marginTop: 8,
    },
    botonCancelar: {
        marginTop: 16,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D32F2F',
        borderRadius: 8,
    },

    textoBotonCancelar: {
        color: '#D32F2F',
        fontSize: 14,
        fontWeight: '600',
    },
});
