import gql from "graphql-tag";

export const GET_USERS_DATA = gql`
  query GET_USERS($limit: Int = 20, $offset: Int = 1) {
    payload: POC_users(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      email
      name
      image_url
      role
    }
  }
`;

export const DELETE_USER_BY_ID = gql`
  mutation DELETE_USER_BY_ID($user_id: bigint!) {
    delete_POC_users_by_pk(id: $user_id) {
      id
    }
  }
`;

export const INSERT_USER_ONE = gql`
  mutation CREATE_USER($email: String!, $image_url: String = "", $name: String = "", $mobile: String!, $role: String = "") {
    payload: insert_POC_users_one(object: { email: $email, image_url: $image_url, name: $name, mobile: $mobile, role: $role }) {
      id
      image_url
      name
      role
    }
  }
`;
