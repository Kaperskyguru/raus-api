const request = require("supertest");
const http = require("http");
const app = require("../../app");

let server;
let cabin_id;

beforeAll((done) => {
  server = http.createServer(app);
  done();
});

afterAll(() => {
  return server.close();
});

describe("Cabins", () => {
  describe("GET /cabins", () => {
    it("tests store cabin successfully", async () => {
      await request(server)
        .post("/api/v1/cabins")
        .send({
          name: "Test Cabin",
          water: 20,
          temperature: 30,
          country: "Nigeria",
          location: "Port Harcourt",
          state: "Rivers",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          cabin_id = response.body.cabin.id;
          expect(response.body.success).toBeTruthy();
        });
    });

    it("tests user retrieve cabins successfully", async () => {
      await request(server)
        .get("/api/v1/cabins/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    // it("tests user retrieve a cabin successfully", async () => {
    //   await request(server)
    //     .get("/api/v1/cabins/1")
    //     .set("Accept", "application/json")
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body.success).toBeTruthy();
    //     });
    // });

    it("tests store cabin failure", async () => {
      await request(server)
        .post("/api/v1/cabins")
        .send({ name: "Test Cabin" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });

    it("updates cabin successfully", async () => {
      await request(server)
        .put(`/api/v1/cabins/${cabin_id}`)
        .send({ name: "Test Cabin updated" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
          expect(response.body.cabin.name).toBe("Test Cabin updated");
        });
    });

    it("updates cabin failure", async () => {
      await request(server)
        .put(`/api/v1/cabins/0`)
        .send({ name: "Test Cabin updated" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });

    it("deletes cabin successfully", async () => {
      await request(server)
        .delete(`/api/v1/cabins/${cabin_id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBeTruthy();
        });
    });

    it("deletes cabin failure", async () => {
      await request(server)
        .delete(`/api/v1/cabins/0`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .then((response) => {
          expect(response.body.success).toBeFalsy();
        });
    });
  });
});
