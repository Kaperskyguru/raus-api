const request = require("supertest");
const http = require("http");
const app = require("../../app");

let server;
let user_id;

beforeAll(() => {
  server = http.createServer(app);
});

afterAll(() => {
  return server.close();
});

describe("Channels", () => {
  describe("GET /users", () => {
    it("tests store user successfully", async () => {
      await request(server)
        .post("/api/v1/users")
        .send({
          name: "Test User",
          email: "solomon@testuser1.com",
          phone_number: "+2348145655380",
          home_address: "100 Ogologo",
          job_title: "Software Engineer",
          country: "Nigeria",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          user_id = response.body.user.id;
          expect(response.body.success).toBeTruthy();
        });
    });

    it("tests user retrieve users successfully", async () => {
      await request(server)
        .get("/api/v1/users/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    it("tests user retrieve a user successfully", async () => {
      await request(server)
        .get("/api/v1/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    it("tests store user failure", async () => {
      await request(server)
        .post("/api/v1/users")
        .send({ name: "Test User" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });

    it("updates user successfully", async () => {
      await request(server)
        .put(`/api/v1/users/${user_id}`)
        .send({ name: "Test User updated" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
          expect(response.body.user.description).toBe("updated");
        });
    });

    it("updates user failure", async () => {
      await request(server)
        .put(`/api/v1/users/0`)
        .send({ name: "Test User updated" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });

    it("assigns cabin to user successfully", async () => {
      await request(server)
        .put(`/api/v1/users/${user_id}/assign`)
        .set("Accept", "application/json")
        .send({ cabin: 1 })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    it("deletes user successfully", async () => {
      await request(server)
        .delete(`/api/v1/users/${user_id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    it("deletes user failure", async () => {
      await request(server)
        .delete(`/api/v1/users/0`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });
  });
});
