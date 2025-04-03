import { gql } from "@apollo/client";

export const GENERATE_STRIPE_CONNECT_URL = gql`
  mutation GenerateStripeConnectUrl {
    generateStripeConnectUrl
  }
`;
