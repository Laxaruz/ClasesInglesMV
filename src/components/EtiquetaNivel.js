import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { spacing, color, typography } from "../theme";

export default function EtiquetaNivel({ nivel }) {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.texto}>{nivel}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        alignSelf: "flex-start",
        backgroundColor: color.primario,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        marginTop: 5,
    },
    texto: {
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.3,
        color: "#fff",
    },
});