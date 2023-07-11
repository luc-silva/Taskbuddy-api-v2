import supertest from "supertest";

describe("Project controller integration test", () => {
  const endpoint = "http://localhost:8080/api/project";
  test("Should not accept string as id param", async () => {
    const response = await supertest(endpoint).get("/a");
    expect(response.status).toBe(400);
  });

  test("Should get project correctly", async () => {
    const response = await supertest(endpoint).get("/3");
    expect(response.status).toBe(200);
  });

  test("Project should contain an array of tasks", async () => {
    const response = await supertest(endpoint).get("/3");
    const receved_keys = Object.keys(response.body);
    expect(response.status).toBe(200);
    expect(receved_keys).toContain("project_task");
  });

  test("Project should contain user id", async () => {
    const response = await supertest(endpoint).get("/3");

    const receved_keys = Object.keys(response.body);
    expect(response.status).toBe(200);
    expect(receved_keys).toContain("user_id");
  });
});
