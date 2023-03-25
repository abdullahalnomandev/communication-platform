import gql from "graphql-tag";

export const INSERT_ACCOUNT_ONE = gql`
  mutation CREATE_ACCOUNT_ONE($name: String = "") {
    insert_POC_account_one(object: { name: $name }) {
      id
      name
    }
  }
`;
// {
//   "name": "Hero One"
// }
