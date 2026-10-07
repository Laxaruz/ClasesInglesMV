import React, {useState, useEffect, useCallback,useMemo, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_RESERVAS = '@reservas_ingles';

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

    const agregarReserva = useCallback((clase,horario) => {
        const nueva ={
            id: clase.id + '-' + horario, //para que sea unico
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + '-' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadaEn: new Date().toISOString()
        };
        let resultados = {ok: true};
        setReservas((previa)=>{
            if (previa.some((r)=> r.id === nueva.id)){
                resultados = {ok:false, mensaje: 'data duplicada'}
                return previa;
            }
            return [nueva, ...previa];
        });
        return resultados;
    },[]); //cierra callback

    const valor = useMemo(
        () => ({ reservas, cargando, agregarReserva }),
        [reservas, cargando, agregarReserva]
    );
    return <ReservaContext.Provider value={valor}>{children} </ReservaContext.Provider>
}//cierre de funcion provider