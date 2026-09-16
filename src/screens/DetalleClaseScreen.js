import React, {useState, useMemo, useLayoutEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Alert, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import {color, spacing, typography, radius} from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen ({route, navigation}){
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const {isTablet} = useResponsive();

    return(
        <view style={styles.pantalla}>
            <scrollview
                contentContainerStyle={{paddingBottom: 120}}
                showsVerticalScrollIndicator={false}

            >
                <image
                    source={{uri: clase.imagen}}
                    style={[styles.portada, {height: isTablet ? 300: 200}]}
                    resizeMode='cover'


                />
            </scrollview>
        </view>

        /*descripcion de la clase,
        nombre del profesor completo,
        foto del profesor,
        precio, duracion, cupos, horario y fotos.*/






    )
}


const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: color.fondo },
    portada: { width: '100%', backgroundColor: color.primarioSuave },
    datos: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: color.superficie,
        borderRadius: radius.lg,
        paddingVertical: spacing.lg,
    },
    dato: { alignItems: 'center', gap: 2 },
    datoValor: { fontSize: 16, fontWeight: '800', color: color.texto },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: color.superficie,
        borderRadius: radius.lg,
        padding: spacing.lg,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: color.borde },
    profesorNombre: { fontSize: 15, fontWeight: '700', color: color.texto },
    descripcion: { ...typography.cuerpo, color: color.textoSuave, lineHeight: 22, marginTop: spacing.sm },
    barra: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.superficie,
        borderTopWidth: 1,
        borderTopColor: color.borde,
        paddingVertical: spacing.lg,
        paddingTop: spacing.lg
    },
    precio: { fontSize: 18, fontWeight: '800', color: color.primario },
});

//componente de boton de reserva para la recuperación dle quiz