import { gql } from "apollo-server-express";

export const leadTypeDefs = gql`
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service!]!
    createdAt: String!
  }

  type Query {
    leads: [Lead!]!
    lead(name: String!): Lead
  }

  type Mutation {
    register(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      services: [ServiceType!]!
    ): Lead!
  }
`;
