import { gql } from "apollo-server-express";

export const serviceTypeDefs = gql`
  enum ServiceType {
    DELIVERY
    PICKUP
    PAYMENT
  }

  type Service {
    id: ID!
    type: ServiceType!
  }
`;
