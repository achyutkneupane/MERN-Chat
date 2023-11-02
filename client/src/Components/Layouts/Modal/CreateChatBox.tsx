import {FiEdit} from "react-icons/fi";
import {useEffect, useState} from "react";
import ModalLayout from "@chatComponents/Layouts/Modal/ModalLayout.tsx";
import {UserResponse} from "@chatTypes/response.ts";
import {getOtherUsers} from "@chatUtils/fetchers/userFetcher.ts";
import {fullName} from "@chatUtils/helpers.ts";
import toast from "react-hot-toast";
import {createNewBox} from "@chatUtils/fetchers/chatFetcher.ts";
import {useNavigate} from "react-router-dom";

const CreateChatBox = () => {
    const nav = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);

    const [users, setUsers] = useState<UserResponse[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        showModal ? getOtherUsers().then((res) => {
            console.log(res);
            setUsers(res.users);
        }) : setActiveId("");
    }, [showModal]);

    const createChatBox = () => {
        if(activeId == "") {
            toast.error("Select Recipient first!");
            return;
        }
        createNewBox(activeId).then((res) => {
            closeModal();
            nav(`/${res.chatBox._id}`, {
                state: {
                    chatBox: "Test"
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
                <FiEdit className="stroke-white p-2"/>
            </button>
            {showModal && (
                <>
                    <ModalLayout closeModal={closeModal}>
                        {users.length > 0 && users.map((user) => (
                            <div
                                className={`flex flex-row justify-between items-center py-2 px-4 rounded-xl cursor-pointer ${activeId === user._id ? "bg-primary" : ""}`}
                                key={user._id}
                                onClick={() => setActiveId(user._id)}
                            >
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <div className={`w-12 h-12 rounded-full flex justify-center items-center text-white text-2xl ${activeId === user._id ? "bg-white" : "bg-primary"}`}>
                                        <h1 className={`text-2xl text-center ${activeId === user._id ? "text-primary" : "text-white"}`}>
                                            {user.firstName[0]}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <div className={`text-xl ${activeId === user._id ? "text-white" : "text-primary"}`}>
                                            {fullName(user.firstName, user.middleName, user.lastName)}
                                        </div>
                                        <p className={`text-xs ${activeId === user._id ? "text-gray-300" : "text-gray-500"}`}>
                                            {user.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            className={`w-full h-10 bg-primary rounded-md text-white mt-4 ${activeId === "" ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={activeId === ""}
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

export default CreateChatBox;