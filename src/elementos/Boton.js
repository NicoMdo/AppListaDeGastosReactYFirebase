import styled from "styled-components";
import {Link} from 'react-router-dom';
import theme from "../theme";


const Boton = styled(Link)`
    background: ${(props) => props.$primario ? '#5B69E2' : '#000'};
    width: ${(props) => props.$conIcono ? '15.62rem' : 'auto'}; /* 250px */
    margin-left: 1.25rem; /* 20px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.10rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;

    
    &:hover {
        background: ${(props) => props.$botonInicio ? theme.azulOscuro : ''};
        transition: background 0.7s,  box-shadow 0.3s;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.7);
    }
 
    svg {
        height: ${(props) => props.$iconoGrande ? '100%' : '0.75rem;'};  /* 12px */
        fill: white;
    }
`;

export default Boton;