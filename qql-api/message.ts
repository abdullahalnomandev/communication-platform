import gql from "graphql-tag";

export const GET_MESSAGE = gql`
  query GET_MESSAGE($limit: Int = 10, $offset: Int = 0, $team_id: bigint!) {
    payload: POC_message(limit: $limit, offset: $offset, where: { team_id: { _eq: $team_id } }) {
      id
      text
      sender_id
      team_id
      created_at
      attachment
      updated_at
      POC_user {
        id
        name
        email
        image_url
      }
      POC_team {
        id
        name
      }
    }
  }
`;
