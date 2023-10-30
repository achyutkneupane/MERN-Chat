import {setActiveChat} from "@chatUtils/helpers.ts";
import Messages from "@chatComponents/Layouts/Messages.tsx";
import {useParams} from "react-router-dom";

const ChatSystem = () => {
    setActiveChat("Chat System One");
    const props = useParams();

    return (
        <>
            <div id="chatArea">
                <Messages chatId={props.id}/>
            </div>
        </>
    )
}

export default ChatSystem;
