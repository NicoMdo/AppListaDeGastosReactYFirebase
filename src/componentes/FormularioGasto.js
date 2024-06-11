import React, { useState, useEffect } from 'react'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import { fromUnixTime } from "date-fns";
import { getUnixTime } from "date-fns";
import { useAuth } from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';


const FormularioGasto = ({ gasto }) => {
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const [enviando, cambiarEnviando] = useState(false); // Nuevo estado;

    const { usuario } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        //comprobamos si ya hay algun gasto
        //de ser asi establecemos todo el state con los valores del gasto.
        if (gasto) {
            //comprobamos que el gasto sea del usuario actual
            // Para eso comprobamos el uid guardado en el gasto con el uid del usuario.

            if (gasto.data().uidUsuario === usuario.uid) {
                cambiarCategoria(gasto.data().categoria)
                cambiarFecha(fromUnixTime(gasto.data().fecha))
                cambiarInputDescripcion(gasto.data().descripcion)
                cambiarInputCantidad(gasto.data().cantidad)
            } else {
                navigate('/lista');
            }
        }
    }, [gasto, usuario, navigate]);

    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            cambiarInputDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (enviando) {
            return; // Evitar el envío múltiple
        }

        cambiarEnviando(true);

        try {
            let cantidad = parseFloat(inputCantidad).toFixed(2);

            if (inputDescripcion !== '' && inputCantidad !== '') {
                if (cantidad) {
                    if (gasto) {
                        await editarGasto({
                            id: gasto.id,
                            categoria: categoria,
                            descripcion: inputDescripcion,
                            cantidad: cantidad,
                            fecha: getUnixTime(fecha)
                        });
                        navigate('/lista');
                    } else {
                        await agregarGasto({
                            categoria: categoria,
                            descripcion: inputDescripcion,
                            cantidad: cantidad,
                            fecha: getUnixTime(fecha),
                            uidUsuario: usuario.uid
                        });

                        cambiarCategoria('hogar');
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());

                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'exito', mensaje: 'El gasto fue agregado correctamente!.' });
                    }
                } else {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'error', mensaje: 'El valor que ingresaste no es correcto!.' });
                }
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'Por favor rellena todos los campos.' });
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Independientemente de si fue exitoso o no, establecer enviando nuevamente en false.
            cambiarEnviando(false);
        }
    }


    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
            </ContenedorFiltros>

            <div>
                <Input
                    type='text'
                    name='descripcion'
                    id='descripcion'
                    placeholder='Descripción'
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type='text'
                    name='cantidad'
                    id='cantidad'
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" $primario $conIcono type='submit'>
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta
                $tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                $estadoAlerta={estadoAlerta}
                $cambiarEstadoAlerta={cambiarEstadoAlerta}

            />
        </Formulario>
    );
}

export default FormularioGasto;