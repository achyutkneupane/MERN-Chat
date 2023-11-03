import Messages from "@chatComponents/Layouts/Messages.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useLayoutSetup} from "@chatHooks/useLayoutSetup.tsx";

const ChatSystem = () => {
    const params = useParams();
    const loc = useLocation();
    const {setActiveChatBox} = useLayoutSetup();


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
