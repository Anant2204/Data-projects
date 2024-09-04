import { IAuthClient } from "@msx/platform-types";
import axios from "axios";

export class Guid {
    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    static newGuid() {
        return (
            this.s4() +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            "-" +
            this.s4() +
            this.s4() +
            this.s4()
        );
    }
}

export const getAPI = async (
    url: string,
    authClient: IAuthClient
): Promise<any> => {
    try {
        const resource: any = process.env.REACT_APP_API_RESOURCE;
        const apiEndPoint = `${process.env.REACT_APP_API_BASE_URL}${url}`;
        const token = await authClient?.acquireToken(resource);
        const request = {
            headers: {
                Authorization: "Bearer " + token,
                "x-activity-id": new Guid().toString(),
            },
        };
        let response = await axios.get(apiEndPoint, request);
        return response;
    } catch (err) {
        if (err?.response) {
            return err.response;
        } else {
            return err;
        }
    }
};