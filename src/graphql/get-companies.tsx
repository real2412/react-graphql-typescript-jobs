import { gql } from '@apollo/client';

const GET_COMPANIES = gql`
  {
    companies{
        id
        name
        slug
        logoUrl
    }
  }
`;

export default GET_COMPANIES;
