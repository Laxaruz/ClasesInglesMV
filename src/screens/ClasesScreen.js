import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useResponsive from "../hooks/useResponsive";
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import { spacing, color, typography } from '../theme';
import { NIVELES, CLASES } from '../data/clases';

export default function ClasesScreen() {
  const insets = useSafeAreaInsets();
  const [nivel, setNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const clasesFiltradas = useMemo(() => {
    return CLASES.filter((clase) => {
      const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
      const texto = `${clase.titulo} ${clase.profesor.nombre} ${clase.nivel}`.toLowerCase();
      const coincideTexto = texto.includes(busqueda.toLowerCase());
      return coincideNivel && coincideTexto;
    });
  }, [nivel, busqueda]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={{paddingHorizontal}}>
        <Text style={typography.titulo}>Aplicacion de clases de inglés</Text>
      </View>
      <View style={styles.buscadorWrap}>
        <Ionicons name="search" size={20} color={color.textoSuave} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nivel o profesor"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={color.textoSuave}
            onPress={() => setBusqueda('')}
          />
        )}
      </View>

      <FlatList
        data={NIVELES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.nivelesList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <NivelFiltro
            etiqueta={item}
            activo={nivel === item}
            onPress={() => setNivel(item)}
          />
        )}
      />

      <FlatList
        data={clasesFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => <Card clase={item} onPress={() => {}} />}
        ListEmptyComponent={<Text style={styles.vacio}>No se encontraron clases.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.fondo,
    paddingHorizontal: spacing.md,
  },
  titulo: {
    ...typography.titulo,
    marginBottom: spacing.md,
  },
  buscadorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    color: color.texto,
  },
  nivelesList: {
    paddingBottom: spacing.md,
  },
  lista: {
    paddingBottom: spacing.xl,
  },
  vacio: {
    color: color.textoSuave,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});