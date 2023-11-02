import {anAuthFetch} from "@chatUtils/apiFetchers.ts";

const basePath = "/chatbox";

export const fetchChatBoxes = () => anAuthFetch(basePath, null, "GET");
export const fetchMessages = (chatBoxId: string) => anAuthFetch(`${basePath}/${chatBoxId}`, null, "GET");
export const sendMessage = (chatBoxId: string, content: string) => anAuthFetch(`${basePath}/${chatBoxId}`, {content}, "POST");
export const createNewBox = (receiverId: string) => anAuthFetch(`/chat/${receiverId}`, {}, "POST");
export const createNewGroupBox = (payload: {
    name: string,
    receiverIds: string[]
}) => anAuthFetch(`/chat/group`, payload, "POST");