import gql from "graphql-tag";

export const GET_TEAMS = gql`
  query GET_TEAMS($limit: Int = 10, $offset: Int = 0) {
    payload: POC_team(limit: $limit, offset: $offset) {
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

export const CREATE_TEAM_MEMBER = gql`
  mutation CREATE_TEAM_MEMBER($team_id: bigint!, $user_id: bigint!) {
    payload: insert_POC_team_members_one(object: { team_id: $team_id, user_id: $user_id }) {
      id
      team_id
    }
  }
`;
// {
//   "team_id": 6,
//   "user_id": 54
// }
