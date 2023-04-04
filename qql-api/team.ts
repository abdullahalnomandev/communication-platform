import gql from "graphql-tag";

export const GET_TEAMS = gql`
  query GET_TEAMS($limit: Int = 10, $offset: Int = 0) {
    payload: POC_team(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      name
      creator_id
      created_at
      account_id
      updated_at
      POC_messages(limit: 1, order_by: { created_at: desc }) {
        text
      }
    }
  }
`;

export const GET_TEAM_ONE = gql`
  query GET_TEAM_ONE_($team_id: bigint) {
    payload: POC_team(where: { id: { _eq: $team_id } }) {
      id
      name
      creator_id
      account_id
      created_at
      updated_at
    }
  }
`;

export const CREATE_TEAM_MEMBERS = gql`
  mutation CREATE_TEAM_MEMBER($team_members: [POC_team_members_insert_input!]!) {
    payload: insert_POC_team_members(objects: $team_members) {
      returning {
        id
        team_id
      }
    }
  }
`;

export const CREATE_TEAM_ONE = gql`
  mutation CREATE_TEAM_ONE($team_name: String!) {
    payload: insert_POC_team_one(object: { name: $team_name }) {
      id
      name
    }
  }
`;

export const CREATE_NEW_TEAM = gql`
  mutation CREATE_NEW_TEAM($teamName: String!, $userIds: [POC_team_members_insert_input!]!) {
    payload: insert_POC_team(objects: [{ name: $teamName, POC_team_members: { data: $userIds } }]) {
      affected_rows
      returning {
        id
        name
        account_id
        creator_id
      }
    }
  }
`;
