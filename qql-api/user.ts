import gql from "graphql-tag";

export const GET_USERS_DATA = gql`
  query GET_USERS($limit: Int = 20, $offset: Int = 1) {
    payload: POC_users(limit: $limit, offset: $offset) {
      id
      email
      name
      image_url
      role
    }
  }
`;

export const DELETE_USER_BY_ID = gql`
  mutation DELETE_USER($user_id: bigint!) {
    payload: delete_users_by_pk(id: $user_id) {
      id
      email
      name
    }
  }
`;

export const INSERT_USER_ONE = gql`
  mutation MyMutation($email: String!, $image_url: String = "", $name: String = "", $mobile: String!) {
    payload: insert_POC_users_one(object: { email: $email, image_url: $image_url, name: $name, mobile: $mobile }) {
      id
      image_url
      name
      role
    }
  }
`;
