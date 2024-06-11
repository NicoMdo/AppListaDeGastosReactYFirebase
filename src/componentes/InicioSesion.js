import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header'
import Boton from './../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alerta from '../elementos/Alerta';
import { auth } from './../firebase/firebaseConfig';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      establecerCorreo(e.target.value)
    } else if (e.target.name === 'password') {
      establecerPassword(e.target.value)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    //comprobamos del lado del cliente que el correo sea valido.
    //Expresión regular
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor ingresa un correo electrónico valido'
      })
      return;
    }

    if (correo === '' || password === '') {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Por favor rellena todos los datos'
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password);
      navigate('/');
    } catch (error) {
      cambiarEstadoAlerta(true);

      console.log(error)

      let mensaje;

      switch (error.code) {
        case 'auth/invalid-credential':
          mensaje = 'Usuario/Contraseña incorrectos'
          break;
        default:
          mensaje = 'Hubo un error al intentar iniciar la cuenta.'
          break;
      }
      cambiarAlerta({ tipo: 'error', mensaje: mensaje });
    }

  }


  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to='/crear-cuenta'>Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type='email'
          name='email'
          placeholder='Correo Electrónico'
          value={correo}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Contraseña'
          value={password}
          onChange={handleChange}
        />

        <ContenedorBoton>
          <Boton as="button" $botonInicio $primario type='submit'>Iniciar Sesión</Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta
        $tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        $estadoAlerta={estadoAlerta}
        $cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
}

export default InicioSesion;