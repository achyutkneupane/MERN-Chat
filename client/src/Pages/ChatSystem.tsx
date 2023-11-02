import Messages from "@chatComponents/Layouts/Messages.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import {usePageTitle} from "@chatHooks/usePageTitle.tsx";

const ChatSystem = () => {
    const params = useParams();
    const loc = useLocation();
    const {setActiveChatBox} = usePageTitle();


    useEffect(() => {
        setActiveChatBox(loc.state ? loc.state.title : "");
    }, [loc.state]);

    return (
        <>
            <div id="chatArea">
                <Messages chatId={params.id}/>
            </div>
        </>
    )
}

export default ChatSystem;
