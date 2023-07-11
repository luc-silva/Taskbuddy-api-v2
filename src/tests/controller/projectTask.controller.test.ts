import supertest from "supertest";

describe("Project Task controller integration test", () => {
  const endpoint = "http://localhost:8080/api/project-task";
  test("Should not accept string as id param", async () => {
    const response = await supertest(endpoint).get("/a");
    expect(response.status).toBe(400);
  });

  test("Should get project task correctly", async () => {
    const response = await supertest(endpoint).get("/1");
    expect(response.status).toBe(200);
  });

  test("Project task should contain project id", async () => {
    const response = await supertest(endpoint).get("/1");
    const receved_keys = Object.keys(response.body);

    expect(response.status).toBe(200);
    expect(receved_keys).toContain("project_id");
  });
});
