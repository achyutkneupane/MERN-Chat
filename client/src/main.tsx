import React from 'react'
import ReactDOM from 'react-dom/client'
import "@chatSys/index.css";
import {BrowserRouter} from "react-router-dom";
import ChatRoutes from "@chatWrappers/ChatRoutes.tsx";
import AuthStateWrapper from "@chatWrappers/AuthStateWrapper.tsx";
import {IconContext} from 'react-icons';
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthStateWrapper>
            <BrowserRouter>
                <Toaster toastOptions={{
                    position: "top-center",
                    duration: 3000,
                }}/>
                <IconContext.Provider value={{className: "react-icons", size: "1.5em", color: "#7C5BA9"}}>
                    <ChatRoutes/>
                </IconContext.Provider>
            </BrowserRouter>
        </AuthStateWrapper>
    </React.StrictMode>,
)
