import { gql } from "@apollo/client";

export const IS_STRIPE_CONNECTED = gql`
  query IsStripeConnected {
    isStripeConnected
  }
`;
