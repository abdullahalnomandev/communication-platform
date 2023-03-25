import gql from "graphql-tag";

export const INSERT_ACCOUNT_ONE = gql`
  mutation CREATE_POC_ACCOUNT_ONE($name: String!, $website_url: String = "") {
    insert_POC_account_one(object: { name: $name, website_url: $website_url }) {
      id
      name
    }
  }
`;
