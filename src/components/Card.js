import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import EtiquetaNivel from './EtiquetaNivel';
import { spacing, color, typography } from '../theme';

export default function Card({ clase, onPress }) {
  return (
      <Pressable onPress={onPress} style={styles.contenedor}>
        <View style={styles.contenido}>
          <EtiquetaNivel nivel={clase.nivel} />

          <Text style={styles.profesor}>
            {clase.profesor.nombre}
          </Text>

          <Text style={styles.precio}>
            ${clase.precio.toLocaleString('es-CO')}
          </Text>
        </View>
        <View style={styles.nivel}>
          <Text style={styles.nivelText}>
            {clase.nivel}
          </Text>
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
  nivel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.primario,
  },

});

// Precio, nivel y nombre del profesor
export const CLASES = [
  {
    id: '1',
    nivel: 'Básico',
    precio: 32000,
    profesor: {
      nombre: 'Laura Gómez',
    },
  },

  {
    id: '2',
    nivel: 'Conversacional',
    precio: 45000,
    profesor: {
      nombre: 'Michael Reed',
    },
  },

  {
    id: '3',
    nivel: 'Avanzado',
    precio: 58000,
    profesor: {
      nombre: 'Sofía Ramírez',
    },
  },

  {
    id: '4',
    nivel: 'Intermedio',
    precio: 38000,
    profesor: {
      nombre: 'Andrés Villa',
    },
  },

  {
    id: '5',
    nivel: 'Intermedio',
    precio: 42000,
    profesor: {
      nombre: 'Emma Clarke',
    },
  },

  {
    id: '6',
    nivel: 'Avanzado',
    precio: 65000,
    profesor: {
      nombre: 'Daniel Ortiz',
    },
  },

  {
    id: '7',
    nivel: 'Conversacional',
    precio: 28000,
    profesor: {
      nombre: 'Carolina Peña',
    },
  },

  {
    id: '8',
    nivel: 'Básico',
    precio: 30000,
    profesor: {
      nombre: 'Julián Mesa',
    },
  },
];