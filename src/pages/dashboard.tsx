import React, {useState, useLayoutEffect, useRef} from 'react';

import styled from 'styled-components'

import CountriesQuery from '../components/countriesQuery'
import CompaniesQuery from '../components/companiesQuery'
import JobsQuery from '../components/jobsQuery'

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 7px;
  border-radius: 3px;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  width:400px;
  background: #fafafa;
 
  &:active,
  &:focus {
    text-align: left;
  }
`;

const Buscador = styled.section`
    text-align: center;
    margin-bottom:10px;
    form{
        justify-content: center;
        display: flex;
        align-content: center;
        justify-content: center;
        p{
            margin: 6px;
            margin-right: 6px;}
        }
    }
`
const OpcionesBusqueda = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    & div.orden {
        cursor: pointer;
        color: cornflowerblue;
        display: flex;
        margin-top: 10px;
        margin-left: 10px;
        &.active{
            color: blue;
        }
    }
`

export default () => {

    const [jobSearch, setJobSearch] = useState('')
    const [companySearch, setCompanySearch] = useState('')
    const [country, setCountry] = useState('')
    const [orden, setOrden] = useState(true)
    const searchInput  = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        console.log(searchInput); 
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(searchInput && searchInput.current){
            setJobSearch(searchInput.current.value)
        }
    }
    
    const onSelect = (countrySlug: string) => {
        if(countrySlug!=null){
            setCountry(countrySlug)
        }
    }

    const onSelectCompany = (companySlug: string) => {
        if(companySlug!=null){
            setCompanySearch(companySlug)
        }
    }

    const handleOrdenar = () => {
        setOrden(!orden)
    }

    return <div className="container">
        <Buscador>
            <form onSubmit={handleSubmit}>
                <p>Título de trabajo</p>
                <Input 
                    type="search" 
                    ref={searchInput}
                    placeholder="ingrese titulo de trabajo"
                />
                <Button type="submit">
                    Buscar
                </Button>    
            </form>
        </Buscador>
        <OpcionesBusqueda>
            <CountriesQuery onSelect={onSelect} />
            <CompaniesQuery onSelectCompany={onSelectCompany}/>
            <div className={orden?"active orden":"orden"}
                onClick={handleOrdenar}>
                    Ordenar por fecha { orden? "ascendente": "descendente"}
            </div>
        </OpcionesBusqueda>
        <JobsQuery jobSearch={jobSearch} orden={orden} companySearch={companySearch} country={country}/>
    </div>
}