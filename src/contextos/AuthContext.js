import React, {useEffect, useState ,useContext } from 'react'
import { auth } from './../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

//creamos el contexto, estado global
const AuthContext = React.createContext();

//Hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState();
    const [cargando, cambiarCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false)
        });

        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export  {AuthProvider, AuthContext, useAuth};