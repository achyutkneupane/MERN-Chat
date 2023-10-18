import HOne from "@chatComponents/Typography/HOne.tsx";
import InputText from "@chatComponents/Forms/InputText.tsx";
import InputPassword from "@chatComponents/Forms/InputPassword.tsx";
import Button from "@chatComponents/Forms/Button.tsx";

const Login = () => {
    return (
        <div className="w-screen h-screen flex bg-primary justify-center items-center select-none">
            <div className="bg-white p-8 rounded-2xl flex flex-col gap-2">
                <HOne className="text-center">Login</HOne>
                <InputText placeholder="Username" type="text" />
                <InputPassword placeholder="Password" />
                <Button>Login</Button>
            </div>
        </div>
    )
}

export default Login;