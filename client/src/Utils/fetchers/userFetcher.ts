import {anAuthFetch} from "@chatUtils/apiFetchers.ts";

const basePath = "/user";
export const getOtherUsers = () => anAuthFetch(basePath, null, "GET");