//guardar datos localmente --> persistencia de datos local
import { useState,useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(clave, valorInicial) {
    //hacerle los hooks
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);
    useEffect( () => {
        let activo = true; //bandera para saber si estoy guardadno el componente o montando el componente

        AsyncStorage.getItem(clave)
            .then((guardando) => {
                if (activo && guardando !== null) setValor(JSON.parse(guardando));

            })
            .catch((error) => console.log("Error Leyendo " + clave, error))
            .finally(() => activo && setListo(true));
        return(() => {
            activo = false;
        });

    },[clave]);
//aprender estos conceptos de mejor forma
    const actualizar = useCallback(
        async(nuevoValor) => {
            setValor(nuevoValor);
            try {
                await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));

            }catch (error){
                console.log("Error Guardando " + clave, error)
            }
        }, [clave] //es una funcion con matriz de dependiencia por eso depende de clave
    );

};