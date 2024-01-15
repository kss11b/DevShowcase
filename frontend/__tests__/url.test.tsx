import { render, screen, fireEvent, act } from "@testing-library/react";
import url from "url";
import fetchMock from "jest-fetch-mock";
import Url from "../app/url/page";
import nock from "nock";
import http from "http";

const backEndUrl = "http://chowly-backend-demo";
const frontEndUrl = "http://localhost:3000";

const parsedUrl = url.parse(frontEndUrl);

fetchMock.enableMocks();
jest.mock("next/router", () => ({ push: jest.fn() }));

describe("Url page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a POST request when the form is submitted", async () => {
    render(<Url />);
    const input = screen.getByTestId("url-input");
    const button = screen.getByText("Submit");

    fetchMock.mockResponseOnce(JSON.stringify("https://google.com"));

    await act(async () => {
      fireEvent.change(input, { target: { value: "https://google.com" } });
      fireEvent.click(button);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/url/api",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify("https://google.com"),
        signal: expect.anything(),
      })
    );
  });

  it("should handle submission of an invalid URL", async () => {
    render(<Url />);
    const input = screen.getByTestId("url-input");
    const button = screen.getByText("Submit");

    fetchMock.mockResponseOnce(JSON.stringify("Bad Url"), { status: 422 });

    await act(async () => {
      fireEvent.change(input, { target: { value: "invalid-url" } });
      fireEvent.click(button);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/url/api",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify("invalid-url"),
      })
    );

    const response = await fetchMock.mock.results[0].value;
    expect(response.status).toEqual(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual("Bad Url");
  });

  it("should handle submission of a blank URL", async () => {
    render(<Url />);
    const input = screen.getByTestId("url-input");
    const button = screen.getByText("Submit");

    fetchMock.mockResponseOnce(JSON.stringify("Bad Url"), { status: 422 });

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(button);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/url/api",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(""),
      })
    );

    const response = await fetchMock.mock.results[0].value;
    expect(response.status).toEqual(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual("Bad Url");
  });
});

describe("/url/api POST route", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should return 200 and the shortened URL for a valid URL", (done) => {
    const requestBody = JSON.stringify({ redirectUrl: "https://google.com" });
    const responseBody = `${frontEndUrl}/url/BQRvJsg-`;

    nock(backEndUrl).post("/url", requestBody).reply(200, responseBody);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: "/url/api",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toEqual(200);

      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        const parsedData = JSON.parse(rawData);
        expect(parsedData).toEqual(responseBody);
        res.resume();
        done();
      });
    });

    req.on("error", (err) => {
      done(err);
    });

    req.write(JSON.stringify("https://google.com"));
    req.end();
  });

  it("should return 422 for an invalid URL", (done) => {
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: "/url/api",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toEqual(422);
      res.resume();
      done();
    });

    req.on("error", (err) => {
      done(err);
    });

    req.write(JSON.stringify("invalid-url"));
    req.end();
  });
});

describe("URL route", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should redirect to the correct URL for a valid URL", (done) => {
    nock(backEndUrl).get("/url/BQRvJsg-").reply(302, undefined, {
      Location: "https://google.com",
    });

    http
      .get(`${frontEndUrl}/url/BQRvJsg-`, (res) => {
        expect(res.headers.location).toEqual("https://google.com");
        res.resume();
        done();
      })
      .end();
  });

  it("should return 404 for a url which has not been generated", (done) => {
    nock(backEndUrl).get("/url/invalid-url").reply(422);

    http
      .get(`${frontEndUrl}/url/invalid-url`, (res) => {
        if (res.statusCode === 404) {
          expect(res.statusCode).toEqual(404);
          res.resume();
          done();
        } else {
          done(new Error(`Unexpected status code: ${res.statusCode}`));
        }
      })
      .on("error", (err) => {
        done(err);
      })
      .end();
  });
});
