import axios from "axios";
import {
  getAPI,
  postAPI,
  putMctAPI,
} from "../httpUtils";
import { parentContext } from "../testMockData";
jest.mock("axios");

describe("API call", () => {
  describe("getAPI", () => {
    it("returns the response from the API", async () => {
      const parentContextSuccess = {
        ...parentContext,
        getAuthContext: jest.fn().mockReturnValue({
          getToken: jest.fn().mockResolvedValue("test-token"),
        }),
      };
      const url = "/test-url";
      const expectedResponse = { data: "test-data" };
      (axios.get as jest.Mock).mockResolvedValue(expectedResponse);

      const response = await getAPI(url, parentContextSuccess);

      expect(response).toEqual(expectedResponse);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`,
        {
          headers: {
            Authorization: "Bearer test-token",
            "x-activity-id": expect.any(String),
          },
        }
      );
    });
  });

  describe("postAPI", () => {
    it("returns the response from the API", async () => {
      const appContext = {
        ...parentContext,
        getAuthContext: jest.fn().mockReturnValue({
          getToken: jest.fn().mockResolvedValue("test-token"),
        }),
      };
      const url = "/test-url";
      const postData = { data: "test-data" };
      const expectedResponse = { data: "test-response" };
      (axios.post as jest.Mock).mockResolvedValue(expectedResponse);

      const response = await postAPI(url, postData, appContext);

      expect(response).toEqual(expectedResponse);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`,
        postData,
        {
          headers: {
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
            "x-activity-id": expect.any(String),
          },
        }
      );
    });

    //TODO it("returns the error response if the API call fails"
  });

  describe("putMctAPI", () => {
    it("returns the response from the API", async () => {
      const appContext = {
        ...parentContext,
        getAuthContext: jest.fn().mockReturnValue({
          getToken: jest.fn().mockResolvedValue("test-token"),
        }),
      };
      const url = "/test-url";
      const putData = { data: "test-data" };
      const expectedResponse = { data: "test-response" };
      (axios.put as jest.Mock).mockResolvedValue(expectedResponse);

      const response = await putMctAPI(url, putData, appContext);

      expect(response).toEqual(expectedResponse);
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MCT_API_ENDPOINT}${url}`,
        putData,
        {
          headers: {
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
            "x-activity-id": expect.any(String),
          },
        }
      );
    });

    // TODO it("returns the error response if the API call fails";
  });
});
