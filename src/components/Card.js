import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, color, radius, typography } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
  const sinCupos = clase.cupos <= 0;

  return (
      <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.contenedor,
            pressed && styles.presionado,
          ]}
      >
        {/* Imagen superior de la clase */}
        <Image
            source={{ uri: clase.imagen }}
            style={styles.imagen}
            resizeMode="cover"
        />

        {/* Contenido de la tarjeta */}
        <View style={styles.contenido}>
          {/* Fila superior: Nivel y Rating */}
          <View style={styles.filaSuperior}>
            <EtiquetaNivel nivel={clase.nivel} />
            <View style={styles.ratingContenedor}>
              <Ionicons name="star" size={14} color="#F5A623" />
              <Text style={styles.ratingTexto}>{clase.rating}</Text>
            </View>
          </View>

          {/* Título del curso */}
          <Text style={styles.titulo} numberOfLines={1}>
            {clase.titulo}
          </Text>

          {/* Información del Profesor */}
          <View style={styles.profesorFila}>
            <Image source={{ uri: clase.profesor.foto }} style={styles.profesorFoto} />
            <Text style={styles.profesorNombre} numberOfLines={1}>
              {clase.profesor.nombre}
            </Text>
          </View>

          {/* Separador / Línea divisoria sutil */}
          <View style={styles.divisor} />

          {/* Pie de la tarjeta: Duración, Cupos y Precio */}
          <View style={styles.pie}>
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={13} color={color.textoSuave} />
                <Text style={styles.metaTexto}>{clase.duracion} min</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons
                    name="people-outline"
                    size={13}
                    color={sinCupos ? '#D32F2F' : color.textoSuave}
                />
                <Text style={[styles.metaTexto, sinCupos && styles.sinCuposTexto]}>
                  {sinCupos ? 'Agotado' : `${clase.cupos} cupos`}
                </Text>
              </View>
            </View>

            <Text style={styles.precio}>
              {formatearPrecio(clase.precio)}
            </Text>
          </View>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: color.superficie,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.border,
  },
  presionado: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  imagen: {
    width: '100%',
    height: 140,
    backgroundColor: color.primarioSuave,
  },
  contenido: {
    padding: spacing.md,
  },
  filaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  ratingTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: color.texto,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: color.texto,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  profesorFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  profesorFoto: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: color.borde,
  },
  profesorNombre: {
    fontSize: 13,
    color: color.textoSuave,
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: color.borde,
    marginVertical: spacing.sm,
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaTexto: {
    fontSize: 12,
    color: color.textoSuave,
    fontWeight: '500',
  },
  sinCuposTexto: {
    color: '#D32F2F',
    fontWeight: '700',
  },
  precio: {
    fontSize: 15,
    fontWeight: '800',
    color: color.primario,
  },
});