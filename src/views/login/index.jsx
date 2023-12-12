import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { login, putAccessToken } from "../../utils/api";
import LoadingIcon from "../../components/LoadingIcon";
import AuthContext from "../../contexts/AuthContext";
import LocaleContext from "../../contexts/LocaleContext";

export default function LoginPage() {
    const { setIsLogin } = useContext(AuthContext);
    const { locale } = useContext(LocaleContext);

    const [user, setUser] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    function onChangeUser(key = "", eVal) {
        setUser((oldState) => {
            return { ...oldState, [key]: eVal };
        });
    }

    function onClickLogin() {
        if (!user.email) {
            window.alert(locale.msgEmailEmpty);
            return;
        }
        if (!user.password) {
            window.alert(locale.msgPasswordEmpty);
            return;
        }
        setIsLoading(true);
        login(user)
            .then((res) => {
                if (!res.error) {
                    putAccessToken(res.data.accessToken);
                    setIsLogin(true);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }

    return (
        <section className="type-section max-w-600 mx-auto">
            <div className="card text-center">
                <h2>{locale.login}</h2>
                <form className="note-form text-start">
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
                </form>
                <Button onClick={onClickLogin} disabled={isLoading}>
                    {isLoading && <LoadingIcon />} {locale.login}
                </Button>
            </div>
        </section>
    );
}
