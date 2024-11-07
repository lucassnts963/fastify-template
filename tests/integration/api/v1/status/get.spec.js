test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.update_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toBeDefined();

  const databaseVersion = responseBody.dependencies.database.version;
  expect(databaseVersion).toBe("16.4");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toBeGreaterThan(100);

  const openedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(openedConnections).toBe(1);
});
