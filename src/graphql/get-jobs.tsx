import { gql } from '@apollo/client';

const GET_JOBS = gql`
  query Jobs($type: String!, $slug: String!) {
      jobs(input: { type: $type, slug: $slug }){
        id
        title
        postedAt
        countries{
          id
          name
        }
        company{
          id
          name
          slug
          logoUrl
        }
      }
  }
  
`;

export default GET_JOBS;
