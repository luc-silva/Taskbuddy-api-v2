import supertest from "supertest";

describe("Todo controller integration test", () => {
  const endpoint = "http://localhost:8080/api/todo";
  test("Should not accept string as id param", async () => {
    const response = await supertest(endpoint).get("/a");
    expect(response.status).toBe(400);
  });

  test("Should get todo correctly", async () => {
    const response = await supertest(endpoint).get("/1");
    expect(response.status).toBe(200);
  });

  test("Todo should contain user id", async () => {
    const response = await supertest(endpoint).get("/1");

    const receved_keys = Object.keys(response.body);
    expect(response.status).toBe(200);
    expect(receved_keys).toContain("user_id");
  });
});
