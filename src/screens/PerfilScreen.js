import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView, TextInput} from 'react-native';
import {color,radius, spacing, typography} from '../theme';

export default function PerfilScreen() {
    const [perfiles] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const hayPerfil = perfiles.length > 0;

    return (
        <View style={styles.pantalla}>
            {!hayPerfil && (
                mostrarFormulario ? (
                    <ScrollView
                        style={styles.formulario}
                        contentContainerStyle={styles.contenido}
                        keyboardShouldPersistTaps="handled"

                    >
                        <Text style={[typography.subtitulo, styles.titulo]}>
                            Registrar perfil
                        </Text>

                        <Text style={[typography.cuerpo, styles.etiqueta]}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChangeText={setNombre}
                            autoCapitalize="words"
                        />

                        <Text style={[typography.cuerpo, styles.etiqueta]}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu apellido"
                            value={apellido}
                            onChangeText={setApellido}
                            autoCapitalize="words"
                        />

                        <Text style={[typography.cuerpo, styles.etiqueta]}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo"
                            value={correo}
                            onChangeText={setCorreo}
                            keyboardType={"email-address"}
                            autoCapitalize="none"
                        />

                        <Text style={[typography.cuerpo, styles.etiqueta]}>Telefono</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu telefono"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType={"phone-pad"}
                        />
                    </ScrollView>
                ):(
                    <Pressable
                        accessibilityRole="button"
                        style={styles.boton}
                        onPress={() => setMostrarFormulario(true)}
                    >
                        <Text style={styles.textoBoton}>Registrar</Text>
                    </Pressable>
                )
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
        backgroundColor: color.fondo,
    },
    formulario: {
        flex: 1,
        width: '100%',
    },
    contenido: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: spacing.lg,
    },
    titulo: {
        marginBottom: spacing.lg,
    },
    etiqueta: {
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    input: {
        minHeight: 48,
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
        color: color.texto,
        fontSize: typography.cuerpo.fontSize,
    },
    boton: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radius.sm,
        backgroundColor: color.primario,
    },
    textoBoton: {
        color: color.fondo,
        fontSize: typography.cuerpo.fontSize,
        fontWeight: '600',
    },
});