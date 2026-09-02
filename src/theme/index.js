import { Platform } from "react-native";

export const color = {
  fondo: "#F5F5F5",
  primario: "#FF5733",
  texto: "#333333",
  border: "#CCCCCC",
  superficie: "#FFFFFF",
  textoSuave: "#666666",
};

export const colors = {
  ...color,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 18,
  xl: 20,
};

export const radius = {
  sm: 8,
  md: 12,
  full: 999,
};

export const typography = {
  titulo: { fontSize: 28, fontWeight: "800", color: color.texto },
  subtitulo: { fontSize: 20, fontWeight: "600", color: color.texto },
};

export default { color, colors, spacing, radius, typography };