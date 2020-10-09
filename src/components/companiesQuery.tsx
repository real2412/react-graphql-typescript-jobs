import React from 'react'
import { useQuery } from '@apollo/client';

import GET_COMPANIES from '../graphql/get-companies'
import {Company} from '../interfaces/jobInterfaces'
import {ItemOpcion} from './itemOpcion' 

const CompaniesQuery = ({onSelectCompany}) => {

    const { loading, error, data } = useQuery(GET_COMPANIES);
  
    if (loading) return <p>...</p>;
    if (error) return <p>Error :(</p>;
        
    return (
        <ItemOpcion>
            <p>Compañia</p>
            <select onChange={(e)=>onSelectCompany(e.target.value)}>
                <option key='0' value=''>Todos</option>
                {
                    data.companies.map((item: Company) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </ItemOpcion>
    )
}

export default CompaniesQuery