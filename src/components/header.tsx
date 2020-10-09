import React from 'react';
import styled from 'styled-components'

const logoSVG = require('../assets/logographql.svg')

const Title = styled.h1`
  font-size: 2.4em;
  text-align: center;
  color: cornflowerblue;
  padding-left: 6px;
`;

const Cabecera = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    & div{
        display: flex
    }
`



export default () => {
    return (
        <Cabecera>
            <div>
                <img src={logoSVG} alt="logo" width="50" />
                <Title> Buscador de Trabajos</Title>
            </div>
        </Cabecera>
    )
}