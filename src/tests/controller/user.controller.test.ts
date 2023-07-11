import supertest from "supertest";

describe("User controller integration test", () => {
  const endpoint = "http://localhost:8080/api/user";

  test("Should not accept string as id param", async () => {
    const response = await supertest(endpoint).get("/a");
    expect(response.status).toBe(400);
  });

  test("Should get user projects correctly", async () => {
    const response = await supertest(endpoint).get("/1/projects");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Should get user todos correctly", async () => {
    const response = await supertest(endpoint).get("/1/todos");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Should get user important todos correctly", async () => {
    const response = await supertest(endpoint).get("/1/todos/important");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
