import React from 'react'
import ReactDOM from 'react-dom/client'
import "@chatSys/index.css";
import {BrowserRouter} from "react-router-dom";
import ChatRoutes from "@chatWrappers/ChatRoutes.tsx";
import AuthStateWrapper from "@chatWrappers/AuthStateWrapper.tsx";
import { IconContext } from 'react-icons';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <IconContext.Provider value={{className: "react-icons", size: "1.5em", color: "#7C5BA9"}}>
                <AuthStateWrapper>
                    <ChatRoutes/>
                </AuthStateWrapper>
            </IconContext.Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
