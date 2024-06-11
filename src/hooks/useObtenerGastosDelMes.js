import { useState, useEffect } from "react";
import { db } from './../firebase/firebaseConfig'
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from './../contextos/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

const useObtenerGastosDelMes = () => {
    const [gastos, establecerGastos] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));


        if (usuario) {
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDeMes),
                where('fecha', '<=', finDeMes),
                where('uidUsuario', '==', usuario.uid)
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return { ...documento.data(), id: documento.id }
                }))
            }, (error) => {console.log(error)});

            return unsuscribe;
        }

    }, [usuario]);

    return gastos;
}

export default useObtenerGastosDelMes;