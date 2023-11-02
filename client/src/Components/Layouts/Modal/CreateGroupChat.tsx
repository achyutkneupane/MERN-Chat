import {useEffect, useState} from "react";
import ModalLayout from "@chatComponents/Layouts/Modal/ModalLayout.tsx";
import {UserResponse} from "@chatTypes/response.ts";
import {getOtherUsers} from "@chatUtils/fetchers/userFetcher.ts";
import {fullName} from "@chatUtils/helpers.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {createNewGroupBox} from "@chatUtils/fetchers/chatFetcher.ts";

const CreateGroupChat = () => {
    const nav = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);

    const [users, setUsers] = useState<UserResponse[]>([]);

    const [name, setName] = useState<string>("");
    const [activeIds, setActiveIds] = useState<string[]>([]);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        showModal ? getOtherUsers().then((res : {
            users: UserResponse[];
        }) => {
            setUsers(res.users);
        }) : setActiveIds([]);
    }, [showModal]);

    const createChatBox = () => {
        if(activeIds.length === 0) {
            toast.error("Select Recipient first!");
            return;
        }
        createNewGroupBox({
            name,
            receiverIds: activeIds
        }).then((res) => {
            closeModal();
            nav(`/${res.chatBox._id}`, {
                state: {
                    title: res.chatBox.name
                }
            });
        });
    }

    return (
        <>
            <button
                className="w-16 h-16 bg-primary bg-opacity-90 rounded-full flex justify-center items-center text-white text-3xl border-4 border-white"
                onClick={openModal}
            >
                <AiOutlineUsergroupAdd className="fill-white p-2"/>
            </button>
            {showModal && (
                <>
                    <ModalLayout closeModal={closeModal}>
                        <div className="mt-4">
                            <input type="text"
                                   className="w-full h-10 rounded-full border-2 border-primary border-opacity-50 px-4 py-2 mb-4"
                                   placeholder="Group Name" value={name}
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {users.length > 0 && users.map((user) => (
                            <div
                                className={`flex flex-row justify-between items-center p-2 rounded-xl cursor-pointer ${activeIds.includes(user._id) ? "bg-primary" : ""}`}
                                key={user._id}
                                onClick={() => {
                                    if(activeIds.includes(user._id)) {
                                        setActiveIds(activeIds.filter((id) => id !== user._id));
                                    } else {
                                        setActiveIds([...activeIds, user._id]);
                                    }
                                }}
                            >
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <div className={`w-12 h-12 rounded-full flex justify-center items-center text-white text-2xl ${activeIds.includes(user._id) ? "bg-white" : "bg-primary"}`}>
                                        <h1 className={`text-2xl text-center ${activeIds.includes(user._id) ? "text-primary" : "text-white"}`}>
                                            {user.firstName[0]}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <div className={`text-xl ${activeIds.includes(user._id) ? "text-white" : "text-primary"}`}>
                                            {fullName(user.firstName, user.middleName, user.lastName)}
                                        </div>
                                        <p className={`text-xs ${activeIds.includes(user._id) ? "text-gray-300" : "text-gray-500"}`}>
                                            {user.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            className={`w-full h-10 bg-primary rounded-md text-white mt-4 ${activeIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={activeIds.length === 0}
                            onClick={createChatBox}
                        >
                            Start Chat
                        </button>
                    </ModalLayout>
                </>
            )}
        </>
    )
}

export default CreateGroupChat;