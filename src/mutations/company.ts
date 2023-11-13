import { gql } from "@apollo/client";

export const GET_COMPANY_HEALTH_SCORE = gql`
  query GetCompanyHealthData {
    getCompanyHealthData {
      monthName
      healthScore
    }
  }
`;
