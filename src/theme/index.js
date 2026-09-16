import { Platform } from 'react-native';



export const color = {
  fondo: "#ffffff",
  superficie: "#dbc9c9",
  primario: "rgb(230 219 219)",
  texto: "#080808",
  textoSecundario: "#080808",
  textoTerciario: "#080808",
  border: "#CCCCCC",
  primarioSuave: "#111010",
  textoSuave: "#090909",
  borde: "#f7f1f1",


};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 18,
  lg: 20,
  xl: 20,
}

export const radius = {
  sm: 6,
  md: 10,
  lg: 20,
}

export const typography = {
  titulo: {fontSize: 28, fontWeight: "800", color: color.texto},
  subtitulo: {fontSize: 20, fontWeight: "600", color: color.texto},
  cuerpo: { fontSize: 14, fontWeight: "400", color: color.texto },

}

export default {color, spacing, radius, typography};


