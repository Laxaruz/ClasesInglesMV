import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import EtiquetaNivel from './EtiquetaNivel';
import { spacing, color, typography } from '../theme';

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.contenedor}>
      <View style={styles.contenido}>
        <EtiquetaNivel nivel={clase.nivel} />

        <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
        <Text style={styles.precio}>${clase.precio.toLocaleString('es-CO')}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: color.fondo,
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  contenido: {
    padding: spacing.md,
  },
  profesor: {
    ...typography.titulo,
    marginBottom: spacing.sm,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});