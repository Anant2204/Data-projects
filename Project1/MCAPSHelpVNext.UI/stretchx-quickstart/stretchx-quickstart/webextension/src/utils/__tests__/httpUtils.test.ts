import axios from "axios";
import {
  getConsumptionAPI,
  postConsumptionAPI,
  putConsumptionAPI,
} from "../httpUtils";
import { parentContext } from "../testMockData";
jest.mock("axios");

describe("API call", () => {
  describe("getConsumptionAPI", () => {
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

      const response = await getConsumptionAPI(url, parentContextSuccess);

      expect(response).toEqual(expectedResponse);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`,
        {
          headers: {
            Authorization: "Bearer test-token",
            "x-ose-activity-id": expect.any(String),
          },
        }
      );
    });
  });

  describe("postConsumptionAPI", () => {
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

      const response = await postConsumptionAPI(url, postData, appContext);

      expect(response).toEqual(expectedResponse);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`,
        postData,
        {
          headers: {
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
            "x-ose-activity-id": expect.any(String),
          },
        }
      );
    });

    //TODO it("returns the error response if the API call fails"
  });

  describe("putConsumptionAPI", () => {
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

      const response = await putConsumptionAPI(url, putData, appContext);

      expect(response).toEqual(expectedResponse);
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.REACT_APP_Consumption_API_ENDPOINT}${url}`,
        putData,
        {
          headers: {
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
            "x-ose-activity-id": expect.any(String),
          },
        }
      );
    });

    // TODO it("returns the error response if the API call fails";
  });
});
