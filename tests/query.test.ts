import request from "supertest";
import { gql } from "apollo-server-express";
import App from "../src/app"; // Adjust the import path if needed

let app: any;
const server = new App();


beforeAll(async () => {
  await server.connectDB();
  app = server.app;
});

afterAll(async () => {
  await server.closeDB()
});

describe("Brighte Queries Unit Test", () => {
  it("should fetch all leads", async () => {
    const query = gql`
      query {
        leads {
          id
          name
          email
          services {
            type
          }
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query: query.loc?.source.body });

    expect(response.status).toBe(200);
    expect(response.body.data.leads.length).toBeGreaterThan(0);
  });

  it("should fetch a specific lead by name", async () => {
    const query = gql`
      query {
        lead(name: "Thomas Wayne" ) {
          id
          name
          email
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query: query.loc?.source.body });

    expect(response.status).toBe(200);
    expect(response.body.data.lead.name).toBe("Thomas Wayne");
  });
});
