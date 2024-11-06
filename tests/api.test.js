import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import "dotenv/config";
import { userID, baseURL, password, user } from "../helpers/data.js";
let token_response;

describe("Api tests", () => {
  it.skip("get request", async () => {
    //skip do pominiecia testu
    const response = await spec().get(`${baseURL}/BookStore/v1/Books`);
    // .inspect();
    const responseB = JSON.stringify(response.body);
    //console.log("is dotenv work?" + " " + process.env.SECRET_PASSWORD)
    expect(response.statusCode).to.eql(200);
    expect(responseB).to.include("Learning JavaScript Design Patterns");
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
  });

  it.skip("Create a use", async () => {
    const response = await spec().post(` ${baseURL}/Account/v1/User`).withBody({
      userName: "AdamSz",
      password: process.env.SECRET_PASSWORD,
    });
    //  .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it.only("Create a Token", async () => {
    //only oznacza tylko ten test
    const response = await spec()
      .post(`${baseURL}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    console.log(token_response);
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  it.skip("Authorize", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/Authorized`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(200);
  });

  it("Add Book", async () => {
    const response = await spec()
      .post(`${baseURL}/BookStore/v1/Books`)
      .withBearerToken(token_response)
      .withBody({
        userId: userID,
        collectionOfIsbns: [{ isbn: "9781593277574" }],
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it.only("Remove Book from user", async () => {
    const response = await spec()
      .delete(`${baseURL}/BookStore/v1/Books?UserId=${userID}`)
      .withBearerToken(token_response)
      .inspect();
    expect(response.statusCode).to.eql(204);
  });

  it.only("check books in user", async () => {
      const response = await spec()
        .get(`${baseURL}/Account/v1/User/${userID}`)
        .inspect()
        .withBearerToken(token_response);
      expect(response.statusCode).to.eql(200);
    });
});
