import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {color, spacing} from '../theme';

export default function PerfilScreen() {
    const [perfiles] = useState([]);
    const hayPerfil = perfiles.length > 0;

    return (
        <View style={styles.pantalla}>
            {!hayPerfil && (
                <Pressable
                    accessibilityRole="button"
                    style={styles.boton}
                    >
                    <Text style={styles.textoBoton}>Registrar</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        backgroundColor: color.fondo,
    },
    boton: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: 6,
        backgroundColor: color.primario,
    },
    textoBoton: {
        color: color.fondo,
        fontSize: 16,
        fontWeight: '600',
    },
});