import React, { useState, useEffect } from 'react';
import {Alert, View, Text, Pressable, StyleSheet, ScrollView, TextInput, Image,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { color, radius, spacing, typography } from '../theme';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_PERFIL = '@perfil_ingles'

export default function PerfilScreen() {
    const [perfiles, setPerfiles] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState(null);
    const [editandoPerfil, setEditandoPerfil] = useState(false);
    const [cargandoPerfil, setCargandoPerfil] = useState(true);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const perfilGuardado = await AsyncStorage.getItem(CLAVE_PERFIL);

                if (perfilGuardado !== null) {
                    setPerfiles(JSON.parse(perfilGuardado));
                }
            } catch (error) {
                console.log('Error leyendo el perfil', error);
            } finally {
                setCargandoPerfil(false);
            }
        }

        cargarPerfil();
    },[]);

    useEffect(() => {
        if (cargandoPerfil) return;

        AsyncStorage.setItem(CLAVE_PERFIL, JSON.stringify(perfiles)).catch((error) =>
            console.log('Error guardando el perfil:', error)
        );
    }, [perfiles, cargandoPerfil]);

    const hayPerfil = perfiles.length > 0;
    const perfil = perfiles[0];

    const iniciarEdicionDePerfil = () => {
        setCorreo(perfil.correo);
        setTelefono(perfil.telefono);
        setEditandoPerfil(true);
    }

    const guardarCambiosPerfil = () => {
        const perfilActualizado = {
            nombre: perfil.nombre,
            apellido: perfil.apellido,
            correo: correo,
            telefono: telefono,
            foto: perfil.foto,
        };

        setPerfiles([perfilActualizado]);
        setEditandoPerfil(false);
    }


    const seleccionarFoto = async () => {
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
        });

        if (!resultado.canceled) {
            setFoto(resultado.assets[0].uri);
        }
    };

    const guardarPerfil = () => {
        if (!foto) {
            Alert.alert(
                'Foto requerida',
                'Selecciona una foto de la galeria para continuar.'
            );
            return;
        }

        const nuevoPerfil = { nombre, apellido, correo, telefono, foto };
        setPerfiles([nuevoPerfil]);
    };

    return (
        <View style={styles.pantalla}>
            {cargandoPerfil ? (
                <Text style={typography.subtitulo}>Cargando perfil...</Text>
            ) : hayPerfil ? (
                <ScrollView
                    style={styles.formulario}
                    contentContainerStyle={styles.contenido}
                    keyboardShouldPersistTaps={"handled"}
                >
                    {editandoPerfil ? (
                        <View>
                            <Text style={[typography.subtitulo, styles.titulo]}>Editar datos del perfil</Text>
                            <Text style={[typography.cuerpo, styles.etiqueta]}>Correo</Text>
                            <TextInput
                                style={styles.input}
                                value={correo}
                                onChangeText={setCorreo}
                                keyboardType={'email-address'}
                                autoCapitalize="none"
                                />

                            <Text style={[typography.cuerpo, styles.etiqueta]}>Telefono</Text>
                            <TextInput
                                style={styles.input}
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType={'phone-pad'}
                            />

                            <Pressable
                                style={styles.boton}
                                onPress={guardarCambiosPerfil}
                                >
                                    <Text style={styles.textoBoton}>Guardar cambios</Text>
                            </Pressable>

                            <Pressable
                                style={styles.boton}
                                onPress={() => setEditandoPerfil(false)}
                                >
                                    <Text style = {styles.textoBoton}>Cancelar</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View>
                            <Image
                                source={{ uri: perfil.foto }}
                                style={styles.foto}
                                resizeMode="cover"
                            />
                            <Text style={[typography.subtitulo, styles.titulo]}>
                                {perfil.nombre} {perfil.apellido}
                            </Text>
                            <Text style={[typography.cuerpo, styles.detalle]}>
                                Correo: {perfil.correo}
                            </Text>
                            <Text style={[typography.cuerpo, styles.detalle]}>
                                Telefono: {perfil.telefono}
                            </Text>
                            <Pressable
                                style={styles.boton}
                                onPress={iniciarEdicionDePerfil}
                                >
                                    <Text style = {styles.textoBoton}>Editar Perfil</Text>
                            </Pressable>
                        </View>
                    )}
                </ScrollView>
            ) : mostrarFormulario ? (
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
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={[typography.cuerpo, styles.etiqueta]}>Telefono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu telefono"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <Pressable style={styles.boton} onPress={seleccionarFoto}>
                        <Text style={styles.textoBoton}>
                            {foto ? 'Cambiar foto' : 'Elegir foto de galeria'}
                        </Text>
                    </Pressable>

                    {foto && (
                        <Image
                            source={{ uri: foto }}
                            style={styles.foto}
                            resizeMode="cover"
                        />
                    )}

                    <Pressable style={styles.boton} onPress={guardarPerfil}>
                        <Text style={styles.textoBoton}>Guardar perfil</Text>
                    </Pressable>
                </ScrollView>
            ) : (
                <Pressable
                    accessibilityRole="button"
                    style={styles.boton}
                    onPress={() => setMostrarFormulario(true)}
                >
                    <Text style={styles.textoBoton}>Registrar</Text>
                </Pressable>
            )}
        </View>
    );
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
    detalle: {
        marginBottom: spacing.sm,
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
    foto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: 'center',
        marginVertical: spacing.md,
    },
    boton: {
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radius.sm,
        backgroundColor: color.primario,
        marginBottom: spacing.md,
    },
    textoBoton: {
        color: color.fondo,
        fontSize: typography.cuerpo.fontSize,
        fontWeight: '600',
    },
});
