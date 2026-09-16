import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {color, spacing} from '../theme';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    circulo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: color.fondo,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        color: color.texto,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    mensaje: {
        fontSize: 16,
        color: color.texto,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
});

export default function EstadoVacio({icono = 'search-outline', titulo, mensaje, textoAccion, onAction}){
    return(
        <View style = {styles.contenedor}>
            <View style={styles.circulo}>
                <Ionicons name = {icono} size = {30} color = {color.primario}/>

            </View>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.mensaje}>{mensaje}</Text>

        </View>
    )
}