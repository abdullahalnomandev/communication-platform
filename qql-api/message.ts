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

export const CREATE_MESSAGE = gql`
  mutation CRATE_MESSAGE($team_id: bigint!, $text: String = "") {
    insert_POC_message(objects: { team_id: $team_id, text: $text }) {
      returning {
        id
        text
        team_id
        sender_id
      }
    }
  }
`;
export const UPDATE_MESSAGE_BY_ID = gql`
  mutation UPDATE_TEXT_BY_ID($id: bigint!, $updated_values: POC_message_set_input = {}) {
    update_POC_message_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
      id
      text
      team_id
      sender_id
    }
  }
`;

export const DELETE_MESSAGE_BY_ID = gql`
  mutation DELETE_MESSAGE_BY_MESSAGE_ID($message_id: bigint!) {
    delete_POC_message_by_pk(id: $message_id) {
      id
    }
  }
`;
