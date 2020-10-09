import React, {useState, useLayoutEffect, useRef} from 'react';
import { useQuery } from '@apollo/client';
import {WanderingCubes} from 'styled-spinkit';
import moment from 'moment';
import styled from 'styled-components'

import GET_JOBS from '../graphql/get-jobs'
import GET_COUNTRIES from '../graphql/get-countries'
import GET_COMPANIES from '../graphql/get-companies';
import {Job, Country, Company } from '../interfaces/jobInterfaces'

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

const ItemOpcion = styled.div`
    display: flex;
    & p {
        margin: 10px;
        margin-right: 6px;
    }
`
const Select = styled.select`
  width: 100%;
  height: 35px;
  background: #fafafa;
  color: #262626;
  padding-left: 5px;
  font-size: 14px;
  border: 1 px solid #dbdbdb;
  margin-left: 10px;
  border-radius: 3px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Lista = styled.ul`
    margin: 10px auto 0 auto;
    padding: 0;
    .list-title {
        color: cornflowerblue;
        font-weight: 500;
    }
    li{
        display: flex;
        cursor: pointer;
        flex: 4;
        flex-direction: row;
        padding: 20px 30px;
        
        background-color: white;
        border-bottom: 2px dotted palevioletred;
        box-sizing: border-box;
        transition-duration: 0.6s;
        &:last-child {
            margin-bottom: none;
        }
        &:hover{
            background-color: cornflowerblue;
            
            .list-title, .list-company, .list-badge, .list-post-date {
                color: palevioletred
            }
        }
    }
    .list-badge {
        align-self: flex-start;
        display: block;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border: 1px dotted steelblue;
        color: steelblue;
        text-align: center;
        padding: 15px 8px;
    }
      
    .list-item-summary {
        flex: 2;
    }
      
    
      
    .list-company {
        color: gray;
    }
      
    .list-post-date {
        color: gray;
        align-self: center;
    }
    h2{
        margin-top: 12px;
    }
`

const ContainerLista = styled.div`
    padding:20px
`

const CountriesQuery = ({onSelect}) => {

    const { loading, error, data } = useQuery(GET_COUNTRIES);
  
    if (loading) return <p>...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <ItemOpcion>
            <p>País</p>
            <Select onChange={(e)=>{onSelect(e.target.value)}}>
                <option key='0' value=''>Todos</option>
                {
                    data.countries.map((item: Country) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                }
            </Select>
        </ItemOpcion>
    )
  }

  const CompaniesQuery = ({onSelectCompany}) => {

    const { loading, error, data } = useQuery(GET_COMPANIES);
  
    if (loading) return <p>...</p>;
    if (error) return <p>Error :(</p>;
        
    return (
        <ItemOpcion>
            <p>Compañia</p>
            <Select onChange={(e)=>onSelectCompany(e.target.value)}>
                <option key='0' value=''>Todos</option>
                {
                    data.companies.map((item: Company) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                }
            </Select>
        </ItemOpcion>
    )
  }

const JobsQuery = ({jobSearch, companySearch , country, orden}) => {

    const { loading, error, data } = useQuery(GET_JOBS,  {
        variables: { type: "country", slug: country }
    });
  
    if (loading){
        return (
            <ContainerLista>
                <WanderingCubes
                    color="magenta"
                    size={60}
                />
            </ContainerLista>
        )
    } 
    if (error){
        return <ContainerLista>Error :(</ContainerLista>;
    } 
    
    let arrJobs = data.jobs
    if(jobSearch!==''){
        arrJobs = arrJobs.filter((item: Job)=>{
            return item.title.toLowerCase().indexOf(jobSearch.toLowerCase())>=0
        })
    }

    
    arrJobs = arrJobs.filter((item: Job)=>{
        return item.company.slug.toLowerCase().indexOf(companySearch.toLowerCase())>=0
    })
    
    if(arrJobs.length===0){
        return (<ContainerLista>
            <p>No se encontraron resultados :(</p>
        </ContainerLista>)
    }

    if(orden){
        arrJobs = arrJobs.slice().sort((a: Job, b: Job) => {
            return moment(b.postedAt).diff(moment(a.postedAt))
        })
    }else{
        arrJobs.sort((a:Job, b:Job) => {
            return moment(a.postedAt).diff(moment(b.postedAt))
        })
    }

    
    return (
        <ContainerLista>
            <Lista className="list">
                {    
                    arrJobs.map((item: Job) => (

                        <li key={item.id}>
                            <span className="list-badge">{
                                item.company.logoUrl?
                                    <img src={item.company.logoUrl} width={50} height={50} alt="logo" />
                                :
                                    <h2>{item.company.name.substr(0,1)}</h2>
                            }</span>
                            <span className="list-item-summary">
                            <h2 className="list-title">{item.title}</h2>
                            <span className="list-company">{item.company.name}</span>
                            </span>
                            <span className="list-post-date">Posteado el {moment(item.postedAt).format("DD/MM/YYYY HH:mm")}</span>
                            
                        </li>

                    ))
                }
            </Lista>
        </ContainerLista>
    )
  }
  

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
        <div className="results">
            <JobsQuery jobSearch={jobSearch} orden={orden} companySearch={companySearch} country={country}/>
        </div>
    </div>
}