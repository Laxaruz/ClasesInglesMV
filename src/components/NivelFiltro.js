import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {spacing, color, typography, radius} from '../theme';

export default function NivelFiltro({etiqueta, activo, onPress}) {
    return(
        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                style.chip,
                activo && style.chipActivo,
                pressed && {opacity: 0.7}

            ]}


        >
            <Text style={[style.texto, activo && style.textoActivo]}>
                {etiqueta}
            </Text>
        </Pressable>

    )
}

const style = StyleSheet.create({
    chip: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.lg,
        backgroundColor: color.fondo,
        borderWidth: 1,
        borderColor: color.superficie,
        marginRight: spacing.sm,
    },
    chipActivo: {
        backgroundColor: color.primario,
        borderColor: color.primario,
    },
    texto: { fontSize: 13, fontWeight: '600', color: color.texto },
    textoActivo: { color: '#FFFFFF' },
});