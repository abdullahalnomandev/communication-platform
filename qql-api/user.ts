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

export const FIND_USER_ONE = gql`
  query FIND_USER_ONE($email: String!) {
    payload: POC_users(where: { email: { _eq: $email } }) {
      id
      email
      name
      role
      image_url
      created_at
      updated_at
    }
  }
`;

export const GET_TEAM_MEMBERS = gql`
  query GET_ALL_TEAM_MEMBERS($team_id: bigint!) {
    payload: POC_team_members(where: { team_id: { _eq: $team_id } }) {
      id
      team_id
      user_id
      updated_at
      created_at
      POC_user {
        id
        name
        email
        image_url
        role
        created_at
        updated_at
        account_id
        POC_accounts {
          id
        }
      }
    }
  }
`;

export const DELETE_TEAM_MEMBER = gql`
  mutation DELETE_TEAM_MEMBERS($team_id: bigint!, $user_id: bigint!) {
    payload: delete_POC_team_members(where: { _and: { team_id: { _eq: $team_id }, user_id: { _eq: $user_id } } }) {
      returning {
        id
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($user_id: bigint!) {
    payload: POC_users_by_pk(id: $user_id) {
      id
      email
      image_url
      name
      role
      mobile
    }
  }
`;

export const UPDATE_USER_BY_ID = gql`
  mutation UPDATE_USER_BY_ID($user_id: bigint!, $updated_value: POC_users_set_input = {}) {
    payload: update_POC_users_by_pk(pk_columns: { id: $user_id }, _set: $updated_value) {
      id
      email
    }
  }
`;
