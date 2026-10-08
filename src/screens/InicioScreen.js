import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import useReserva from '../hooks/useReserva';

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
    const { reservas, cargando } = useReserva();

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
                    </View>
                )}
            />
        </View>
    );

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
        paddingTop: 40,
        backgroundColor: color.fondo,
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
});