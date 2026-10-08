import React, {useState, useEffect, useCallback,useMemo, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_RESERVAS = '@reservas_ingles';

function analizarHorario(horario) {
    const partes = horario.split(' ');
    const dia = partes[0];
    const hora = partes[1];
    const periodo = partes[2];

    const [horas, minutos] = hora.split(':').map(Number);

    let horas24 = horas;

    if (periodo === 'p.m.' && horas !== 12) {
        horas24 += 12;
    }

    if (periodo === 'a.m.' && horas === 12) {
        horas24 = 0;
    }

    return {
        dia,
        minutosInicio: horas24 * 60 + minutos
    };
}
function obtenerIntervalo(horario, duracion) {
    const datosHorario = analizarHorario(horario);

    return {
        dia: datosHorario.dia,
        inicio: datosHorario.minutosInicio,
        fin: datosHorario.minutosInicio + duracion
    };
}

function hayCruce(intervaloNuevo, intervaloExistente) {
    if (intervaloNuevo.dia !== intervaloExistente.dia) {
        return false;
    }

    return (
        intervaloNuevo.inicio < intervaloExistente.fin &&
        intervaloNuevo.fin > intervaloExistente.inicio
    );
}

//NUEVAS FUNCIONES, ESTAS FUNCIONES SON PARA VALIDAR QUE NO SE PUEDAN RESERVAR CLASES QUE SE CRUCEN EN HORARIO


export const ReservaContext = createContext(null);

export function ReservaProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true); //tipo bandera

    //cargar reservas desde almacenamiento local que tengo guardadas, si no tengo nada me devuelve un arreglo vacio

    //el use effect solo va a cargar una sola vez cuando inicemos la app
    useEffect(() => {
        const cargar  = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS); //si es get se usa Parse y si es set se usa stringify
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }
        }catch (error) {
                console.log("Error leyendo las reservas: ", error);
            }finally {
                setCargando(false);
            }
        };
        cargar();

    }, [])

    //hacer el guardado

    useEffect(() => {
        if(cargando) return; //evita sobreescribir el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=> //SET ITEM = STRINGTIFY
        console.log("Error guardando las reservas: ", error)
        );
    },[reservas,cargando]); //matriz de depdencia vacia para que solo se ejecute una vez [], aqui le pedimos en reservas, cargando

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            duracion: clase.duracion,
            creadaEn: new Date().toISOString()
        };


        const existe = reservas.some((r) => r.id === nueva.id);

        if (existe) {
            return {
                ok: false,
                mensaje: 'Ya tienes una reserva para esta clase y horario.'
            };
        }

        const intervaloNuevo = obtenerIntervalo(
            horario,
            clase.duracion
        );

        const hayReservaCruzada = reservas.some((r) => {
            const intervaloExistente = obtenerIntervalo(
                r.horario,
                r.duracion
            );

            return hayCruce(intervaloNuevo, intervaloExistente);
        });

        if (hayReservaCruzada) {
            return {
                ok: false,
                mensaje: 'Ya tienes una reserva que se cruza con este horario.'
            };
        }

        setReservas((previa) => [nueva, ...previa]);

        return {
            ok: true
        };
    }, [reservas]);

    const cancelarReserva = useCallback((idReserva) => {
        setReservas((previas) =>
            previas.filter((reserva) => reserva.id !== idReserva)
        );
    }, []);

    const valor = useMemo(
        () => ({
            reservas,
            cargando,
            agregarReserva,
            cancelarReserva
        }),
        [reservas, cargando, agregarReserva, cancelarReserva]

    );
    return <ReservaContext.Provider value={valor}>{children}</ReservaContext.Provider>
}//cierre de funcion provider

