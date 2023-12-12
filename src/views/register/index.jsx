import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/api";
import LoadingIcon from "../../components/LoadingIcon";
import LocaleContext from "../../contexts/LocaleContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    function onChangeUser(key = "", eVal) {
        setUser((oldState) => {
            return { ...oldState, [key]: eVal };
        });
    }

    function onClickRegister() {
        if (!user.name) {
            window.alert(locale.msgNameEmpty);
            return;
        }
        if (!user.email) {
            window.alert(locale.msgEmailEmpty);
            return;
        }
        if (!user.password) {
            window.alert(locale.msgPasswordEmpty);
            return;
        }
        if (user.password !== user.confirmPassword) {
            window.alert(locale.msgPasswordNotMatch);
            return;
        }
        setIsLoading(true);
        register(user)
            .then((res) => {
                if (!res.error) {
                    window.alert(locale.msgRegisterSuccess);
                    navigate("/login");
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }

    return (
        <section className="type-section max-w-600 mx-auto">
            <div className="card text-center">
                <h2>{locale.register}</h2>
                <form className="note-form text-start">
                    <label>{locale.name}</label>
                    <Input
                        className="note-form-input"
                        type="text"
                        value={user.name}
                        onChange={(e) => onChangeUser("name", e.target.value)}
                    />

                    <label>{locale.email}</label>
                    <Input
                        className="note-form-input"
                        type="email"
                        value={user.email}
                        onChange={(e) => onChangeUser("email", e.target.value)}
                    />

                    <label>{locale.password}</label>
                    <Input
                        type="password"
                        className="note-form-input"
                        value={user.password}
                        onChange={(e) =>
                            onChangeUser("password", e.target.value)
                        }
                    />

                    <label>{locale.confirmPassword}</label>
                    <Input
                        type="password"
                        className="note-form-input"
                        value={user.confirmPassword}
                        onChange={(e) =>
                            onChangeUser("confirmPassword", e.target.value)
                        }
                    />
                </form>
                <Button onClick={onClickRegister} disabled={isLoading}>
                    {isLoading && <LoadingIcon />} {locale.register}
                </Button>
            </div>
        </section>
    );
}
