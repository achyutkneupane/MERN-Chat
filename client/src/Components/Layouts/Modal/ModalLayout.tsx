import {FC, ReactNode} from "react";

interface ModalLayoutProps {
    closeModal: () => void;
    children: ReactNode;
};
const ModalLayout : FC<ModalLayoutProps> = ({ closeModal, children }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={closeModal}>
                <div className="bg-white p-5 rounded-xl max-w-3xl" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default ModalLayout;