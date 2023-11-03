import {useLayoutSetup} from "@chatHooks/useLayoutSetup.tsx";

const Navbar = () => {
    return (
        <>
            <div className="absolute left-96 right-0 top-0" id="navbar">
                <div className="h-16 bg-white border-b-2 border-primary border-opacity-50 px-4 flex justify-start items-center">
                    <h2 className="text-2xl font-bold text-center text-primary">
                        {useLayoutSetup()?.activeChatBox}
                    </h2>
                </div>
            </div>
        </>
    );
}

export default Navbar;