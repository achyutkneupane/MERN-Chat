import {anFetch} from "@chatUtils/apiFetchers.ts";
import type {LoginPayload, RegisterPayload} from "@chatTypes/payload.ts";

const basePath = "/auth";

export const loginUser = (body: LoginPayload) => anFetch(basePath + "/login", body, "POST");
export const registerUser = (body: RegisterPayload) => anFetch(basePath + "/register", body, "POST");