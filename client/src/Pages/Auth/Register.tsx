import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {RegisterPayload} from "@chatTypes/payload.ts";
import {registerUser} from "@chatUtils/fetchers/authFetcher.ts";
import {HookForm, HookFormProvider} from "@chatWrappers/FormProvider.tsx";
import HOne from "@chatComponents/Typography/HOne.tsx";
import InputText from "@chatComponents/Forms/InputText.tsx";
import InputPassword from "@chatComponents/Forms/InputPassword.tsx";
import Button from "@chatComponents/Forms/Button.tsx";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";
import toast from "react-hot-toast";

const Register = () => {
    const nav = useNavigate();

    const [defaultValues, setDefaultValues] = useState<RegisterPayload|null>(null);

    useEffect(() => {
        setDefaultValues({
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        });
    }, []);

    const handleLogin = (data : RegisterPayload) => {
        registerUser(data).then((res) => {
            toast.success(res.message);
            nav("/login");
        });
    };
    return (
        <div className="w-screen h-screen flex bg-primary justify-center items-center select-none">
            {defaultValues ? (
                <HookFormProvider defaultValues={defaultValues!}>
                    <HookForm onSubmit={(data : RegisterPayload) => handleLogin(data)}>
                        <div className="bg-white p-8 rounded-2xl flex flex-col gap-2">
                            <HOne className="text-center">Register</HOne>
                            <InputText name="firstName" label="First Name" type="text" required/>
                            <InputText name="middleName" label="Middle Name" type="text"/>
                            <InputText name="lastName" label="Last Name" type="text" required/>
                            <InputText name="email" label="Email" type="email" required/>
                            <InputText name="username" label="Username" type="text" required/>
                            <InputPassword name="password" label="Password" required/>
                            <Button type="submit">Register</Button>
                            <div className="text-center">
                                Already Registered? <Link to="/login" className="text-primary">Login</Link>
                            </div>
                        </div>
                    </HookForm>
                </HookFormProvider>
            ) : <CenterSpinner />}
        </div>
    )
}

export default Register;