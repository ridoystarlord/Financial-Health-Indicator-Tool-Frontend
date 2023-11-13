import { gql } from "@apollo/client";

export const GET_COMPANY_HEALTH_SCORE = gql`
  query GetCompanyHealthData {
    getCompanyHealthData {
      monthName
      healthScore
    }
  }
`;

export const CREATE_MONTHLY_DATA = gql`
  mutation Mutation(
    $income: Float!
    $expenses: Float!
    $debts: Float!
    $assets: Float!
    $monthName: String!
  ) {
    createMonthlyData(
      income: $income
      expenses: $expenses
      debts: $debts
      assets: $assets
      monthName: $monthName
    ) {
      success
      message
      error
    }
  }
`;
