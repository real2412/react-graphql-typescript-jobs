import React from 'react'
import { useQuery } from '@apollo/client';
import styled from 'styled-components'
import {WanderingCubes} from 'styled-spinkit';
import moment from 'moment';

import GET_JOBS from '../graphql/get-jobs'
import {Job} from '../interfaces/jobInterfaces'

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

export default JobsQuery;