import HOne from "@chatComponents/Typography/HOne.tsx";
import InputText from "@chatComponents/Forms/InputText.tsx";
import InputPassword from "@chatComponents/Forms/InputPassword.tsx";
import Button from "@chatComponents/Forms/Button.tsx";
import {HookForm, HookFormProvider} from "@chatWrappers/FormProvider.tsx";
import {useEffect, useState} from "react";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";
import {loginUser} from "@chatUtils/fetchers/authFetcher.ts";
import {LOGIN_TOKEN} from "@chatSys/env";
import {Link, useNavigate} from "react-router-dom";
import type {LoginPayload} from "@chatTypes/payload.ts";

const Login = () => {
    const nav = useNavigate();

    const [defaultValues, setDefaultValues] = useState<LoginPayload|null>(null);

    useEffect(() => {
        setDefaultValues({username: "", password: ""});
    }, []);

    const handleLogin = (data : LoginPayload) => {
        loginUser(data).then((res) => {
            localStorage.setItem(LOGIN_TOKEN, res.token);
            nav("/");
        });
    };
    return (
        <div className="w-screen h-screen flex bg-primary justify-center items-center select-none">
            {defaultValues ? (
                <HookFormProvider defaultValues={defaultValues!}>
                    <HookForm onSubmit={(data : LoginPayload) => handleLogin(data)}>
                        <div className="bg-white p-8 rounded-2xl flex flex-col gap-2">
                            <HOne className="text-center">Login</HOne>
                            <InputText name="username" label="Username" type="text" required/>
                            <InputPassword name="password" label="Password" required/>
                            <Button type="submit">Login</Button>
                            <div className="text-center">
                                Not a user yet? <Link to="/register" className="text-primary">Register</Link>
                            </div>
                        </div>
                    </HookForm>
                </HookFormProvider>
            ) : <CenterSpinner />}
        </div>
    )
}

export default Login;