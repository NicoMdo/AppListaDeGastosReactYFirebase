import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Puntos } from './../imagenes/puntos.svg'

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;

const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
    return (
        <>
            <PuntosArriba />
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                <path
                    fillOpacity="1"
                    d="M0,160L40,176C80,192,160,224,240,245.3C320,267,400,277,480,234.7C560,192,640,96,720,101.3C800,107,880,213,960,240C1040,
            267,1120,213,1200,186.7C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,
            960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></Svg>
            <PuntosAbajo />

        </>
    );
}

export default Fondo;