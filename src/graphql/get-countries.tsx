import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  {
    countries{
        id
        name
        slug
        type
    }
  }
`;

export default GET_COUNTRIES;
