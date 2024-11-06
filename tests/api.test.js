import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config'
import { userID, baseURL } from "../helpers/data.js";

describe("Api tests", () => {
  it("get request", async () => {
    //skip do pominiecia testu
    const response = await spec()
      .get(`${baseURL}/BookStore/v1/Books`)
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
    const response = await spec()
      .post(` ${baseURL}/Account/v1/User`)
      .withBody({
        userName: "AdamSz",
        password: process.env.SECRET_PASSWORD,
      })
    //  .inspect();
    expect(response.statusCode).to.eql(201);

  });
});
