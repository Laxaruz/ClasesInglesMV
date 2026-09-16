import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color, spacing, radius, typography } from '../theme';

export default function BotonReserva({
                                         titulo = 'Reservar clase',
                                         onPress,
                                         deshabilitado = false,
                                         icono = 'calendar-outline',
                                         style,
                                     }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={deshabilitado}
            style={({ pressed }) => [
                styles.boton,
                deshabilitado && styles.botonDeshabilitado,
                pressed && !deshabilitado && styles.botonPresionado,
                style,
            ]}
        >
            {icono && (
                <Ionicons
                    name={icono}
                    size={18}
                    color="#FFFFFF"
                    style={styles.icono}
                />
            )}
            <Text style={styles.texto}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primario,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.md,
        gap: spacing.sm,
    },
    botonPresionado: {
        opacity: 0.8,
    },
    botonDeshabilitado: {
        backgroundColor: color.border,
        opacity: 0.6,
    },
    texto: {
        ...typography.cuerpo,
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    icono: {
        marginRight: 2,
    },
});