const request = require("supertest");
const path = require("path");
const http = require("http");
const app = require("../../app");
const crypto = require("crypto");

let server;
let token;
let channel_id;

beforeAll(async (done) => {
  server = http.createServer(app);
  await request(server)
    .post("/api/v1/auth/login")
    .send({ email: "test@example.com", password: "password" })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => {
      token = response.body.token;
      return done();
    })
    .catch((err) => done(err));
});

afterAll(() => {
  return server.close();
});

describe("Channels", () => {
  describe("GET /channels", () => {
    it("tests user retrieve channels successfully", async (done) => {
      await request(server)
        .get("/api/v1/channels")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          console.log(response.data);
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("tests user retrieve a channel successfully", async (done) => {
      await request(server)
        .get("/api/v1/channels/1")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          console.log(response.data);
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("tests user retrieve channels successfully", async (done) => {
      await request(server)
        .get("/api/v1/channels")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          console.log(response.data);
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("tests store channel successfully", async (done) => {
      await request(server)
        .post("/api/v1/channels")
        .send({
          title: "Test",
          description: "This is a test channel",
          url: "https://test.com",
        })
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          channel_id = response.body.channel.id;
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("tests store channel failure", async (done) => {
      await request(server)
        .post("/api/v1/channels")
        .send({ description: "This is a test channel" })
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("updates channel successfully", async (done) => {
      await request(server)
        .put(`/api/v1/channels/${channel_id}`)
        .send({ description: "updated" })
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
          expect(response.body.channel.description).toBe("updated");
          return done();
        })
        .catch((err) => done(err));
    });

    it("updates channel failure", async (done) => {
      await request(server)
        .put(`/api/v1/channels/0`)
        .send({ description: "updated" })
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("deletes channel successfully", async (done) => {
      await request(server)
        .delete(`/api/v1/channels/${channel_id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("deletes channel failure", async (done) => {
      await request(server)
        .delete(`/api/v1/channels/0`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
          return done();
        })
        .catch((err) => done(err));
    });

    it("retrieves connected channels successfully", async (done) => {
      await request(server)
        .get(`/api/v1/channels/connected`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
          return done();
        })
        .catch((err) => done(err));
    });
  });
});
