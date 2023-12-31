import request from "supertest";
import { app } from "../index";
import { expect } from "chai";

describe("GET /alive", () => {
  it("should respond with correct message", async () => {
    const response = await request(app).get("/alive");
    expect(response.status).to.equal(200);
    expect(response.body).to.equal({ message: "Service is Alive" });
  });
});
