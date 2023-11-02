import moment from "moment";
import {useEffect, useRef, useState} from "react";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";
import {fetchMessages, sendMessage as messageSender} from "@chatUtils/fetchers/chatFetcher.ts";
import {MessageResponse} from "@chatTypes/response.ts";
import {AiOutlineSend} from "react-icons/ai";

interface MessageProps {
    id: string;
    message: string;
    time: string|Date;
    isMe: boolean;
    sender: string;
}
const Messages = (props: {
    chatId?: string;
}) => {

    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [message, setMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const messagesArea = useRef(null);

    const navbarHeight = document.getElementById("navbar")?.clientHeight;
    const sendMessageAreaHeight = document.getElementById("sendMessageArea")?.clientHeight;
    const style = {
        height: `calc(100vh - ${navbarHeight}px)`,
        paddingBottom: `${sendMessageAreaHeight! + 20}px`,
    };

    const callMessageFetcher = () => props.chatId ? fetchMessages(props.chatId!).then((res : {
        messages: MessageResponse[];
    }) => {
        setIsLoading(false);
        const messages : MessageProps[] = res.messages.map((message : MessageResponse) => {
            return {
                id: message._id,
                message: message.content,
                time: message.createdAt,
                isMe: message.isMe,
                sender: message.senderName
            };
        });
        setMessages(messages);
    }) : setIsLoading(false);

    useEffect(() => {
        setIsLoading(true);
        callMessageFetcher();
    }, [props.chatId]);

    useEffect(() => {
        const messagesAreaElement = messagesArea.current as unknown as HTMLElement;
        messagesAreaElement.scrollTop = messagesAreaElement.scrollHeight;
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() === "") {
            return;
        }

        messageSender(props.chatId!, message).then(() => {
            callMessageFetcher();
        });

        setMessage("");
    }

    return (
        <>
            <div className="overflow-y-auto scroll-smooth" style={style} ref={messagesArea}>
                <div className="flex flex-col-reverse gap-2 p-4 h-full">
                    {
                        props.chatId ? (
                            <>
                                {
                                    isLoading ? <CenterSpinner/> : (
                                        <>
                                            {messages.length > 0 ? messages.sort((a, b) => {
                                                return new Date(b.time).getTime() - new Date(a.time).getTime();
                                            }).map((message : MessageProps, index) => {
                                                return (
                                                    <div key={index}
                                                         className={`flex flex-col gap-1 ${message.isMe ? "items-end" : "items-start"}`}
                                                         id={message.id}
                                                    >
                                                        <span className="text-gray-500 text-xs">
                                                            {message.sender}
                                                        </span>
                                                        <div
                                                            className={`flex flex-col gap-1 border border-primary rounded-xl px-3 py-2 max-w-xl ${message.isMe ? "items-end text-primary bg-gray-50" : "items-start bg-primary text-white"}`}>
                                                            <p className={`text-sm text-justify ${message.isMe ? "text-right" : "text-left"}`}>{message.message}</p>
                                                            <p className={`text-xs ${message.isMe ? "text-right text-gray-500" : "text-left text-gray-300"}`}>
                                                                {moment(message.time).fromNow()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }) : (
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-gray-400">No messages yet...</h1>
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-400">No chat selected...</h1>
                            </div>
                        )
                    }
                </div>
                {props.chatId && <div className="absolute w-full bottom-0 border">
                    <div className="flex items-center justify-between h-16 border-t border-gray-200 bg-white gap-2 px-4"
                         id="sendMessageArea">
                        <div className="flex items-center justify-between w-full">
                            <input type="text"
                                   className="w-full h-10 p-2 border border-gray-200 rounded-md outline-none focus:border-primary"
                                   placeholder="Type a message" value={message}
                                   onChange={(e) => setMessage(e.target.value)}
                                   onKeyUp={(e) => {
                                       if (e.key === "Enter") {
                                           sendMessage();
                                       }
                                   }}
                                   autoFocus={true}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-10 h-10 bg-primary rounded-full flex justify-center items-center text-xs text-white"
                                onClick={() => sendMessage()}>
                                <AiOutlineSend className="stroke-2 fill-white"/>
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default Messages;