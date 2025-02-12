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

describe("Brighte Register Unit Test", () => {
  it("should register a new lead", async () => {
    const mutation = gql`
      mutation {
        register(
          name: "TestUser1"
          email: "TestUser1@example.com"
          mobile: "123456789"
          postcode: "2000"
          services: [PICKUP]
        ) {
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
      .send({ query: mutation.loc?.source.body });

    expect(response.status).toBe(200);
    expect(response.body.data.register.name).toBe("TestUser1");
    expect(response.body.data.register.email).toBe("TestUser1@example.com");
    expect(response.body.data.register.services).toEqual(
      expect.arrayContaining([{ type: "PICKUP" }])
    );
  });
});
