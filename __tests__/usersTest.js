const axios = require("axios");

describe("test user resolvers", () => {
  test("allUsers", async () => {
    const response = await axios.post("http://localhost:8080/api", {
      query: `
        query {
          users{
            id
          }
        }
      `,
    });

    const { data } = response;
    expect(data).not.toBeNull();
  });
});
