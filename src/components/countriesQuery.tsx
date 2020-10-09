import React from 'react'
import { useQuery } from '@apollo/client';


import GET_COUNTRIES from '../graphql/get-countries'
import {Country} from '../interfaces/jobInterfaces'
import {ItemOpcion} from './itemOpcion' 

const CountriesQuery = ({onSelect}) => {

    const { loading, error, data } = useQuery(GET_COUNTRIES);
  
    if (loading) return <p>...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <ItemOpcion>
            <p>País</p>
            <select onChange={(e)=>{onSelect(e.target.value)}}>
                <option key='0' value=''>Todos</option>
                {
                    data.countries.map((item: Country) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </ItemOpcion>
    )
  }

export default CountriesQuery