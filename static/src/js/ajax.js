import { ajax } from "jquery";
const baseUrl = "http://127.0.0.1:3000";
export default {
    get(url, data) {
        return new Promise((resolve, reject) => {
            const config = {
                url: baseUrl + url,
                method: "get",
                data: { ...data },
                headers: {
                    "Content-Type": "application/json;Charset=utf-8"
                },
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            };
            return ajax(config);
        });
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            const config = {
                url: baseUrl + url,
                method: "post",
                data: JSON.stringify({ ...data }),
                headers: {
                    "Content-Type": "application/json;Charset=utf-8"
                },
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            };
            return ajax(config);
        });
    }
};
