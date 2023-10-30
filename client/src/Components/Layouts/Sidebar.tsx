import {AiFillSetting} from "react-icons/ai";
import moment from "moment";
import {useEffect, useState} from "react";
import {fetchChatBoxes} from "@chatUtils/fetchers/chatFetcher.ts";
import {ChatBoxResponse} from "@chatTypes/response.ts";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";
import {Link} from "react-router-dom";

interface ChatBoxItemProps {
    id: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    iAmLastSender: boolean;
    isUnread: boolean;
}

const Sidebar = () => {
    // const items : ChatBoxItemProps[] = [];
    const [items, setItems] = useState<ChatBoxItemProps[]>([]);
    useEffect(() => {
        fetchChatBoxes().then((res) => {
            const chats = res.chatBoxes.map((chat: ChatBoxResponse) => {
                return {
                    id: chat._id,
                    name: chat.name,
                    lastMessage: chat.lastMessage,
                    lastMessageTime: chat.lastMessageTime,
                    iAmLastSender: chat.iAmLastSender,
                    isUnread: chat.isUnread
                };
            });
            console.log(chats);
            setItems(chats);
        });
    }, []);
    return (
        <>
            <div className="bg-white border-r-2 border-primary border-opacity-50 w-96 h-screen p-3 overflow-y-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start items-center">
                        <div className="w-20 h-20 bg-primary rounded-full"></div>
                        <div className="ml-2">
                            <h1 className="text-xl font-bold text-primary">Username</h1>
                            <h2 className="text-sm">
                                <span className="text-primary">Online</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center">
                        <AiFillSetting/>
                    </div>
                </div>
                <hr className="mt-3"/>
                <div className="mt-3">
                    <input type="text"
                           className="w-full h-10 rounded-full border-2 border-primary border-opacity-50 p-2"
                           placeholder="Search"/>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                    {items.length > 0 ? items.sort((a, b) => {
                        return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
                    }).map((item, index) => (
                        <Link to={`/${item.id}`}>
                            <div key={index}
                                 className="flex flex-row justify-start items-center border border-primary border-opacity-40 p-4 rounded-2xl">
                                <div
                                    className="w-10 h-10 bg-primary rounded-full relative flex justify-center items-center text-center">
                                    {item.isUnread && (
                                        <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0"></div>
                                    )}
                                    <h1 className="text-xl text-white text-center">{item.name[0]}</h1>
                                </div>
                                <div className="ml-2 w-full h-full">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h1 className={`text-base ${item.isUnread ? "font-bold" : ""} text-primary`}>{item.name}</h1>
                                        </div>
                                        <div>
                                            <h2 className={`text-sm text-gray-400`}>
                                                {item.lastMessageTime ? moment(item.lastMessageTime).fromNow() : ""}
                                            </h2>
                                        </div>
                                    </div>
                                    {item.lastMessage ? (
                                        <h2 className={`text-sm ${item.isUnread ? "font-bold" : ""}`}>
                                        <span
                                            className="text-primary">{item.iAmLastSender ? "You: " : item.name.split(" ")[0] + ": "}</span>
                                            <span className="text-primary">{item.lastMessage}</span>
                                        </h2>
                                    ) : (
                                        <h2 className={`text-sm ${item.isUnread ? "font-bold" : ""}`}>
                                            <span className="text-gray-400">No messages yet...</span>
                                        </h2>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <CenterSpinner/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sidebar;