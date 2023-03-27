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
