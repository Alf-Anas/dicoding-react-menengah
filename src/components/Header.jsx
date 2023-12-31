import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioButton from "./RadioButton";
import Button from "./Button";
import { removeAccessToken } from "../utils/api";
import AuthContext from "../contexts/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import { MdGTranslate, MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsLogin, userData } = useContext(AuthContext);
    const { toggleLanguage, locale } = useContext(LocaleContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [selected, setSelected] = useState(location.pathname);

    function onSelectedChanged(val = "/") {
        navigate(val);
    }

    useEffect(() => {
        setSelected(location.pathname);
    }, [location.pathname]);

    function onClickLogout() {
        removeAccessToken();
        setIsLogin(false);
    }

    const listButton = [
        { id: "/", label: locale.notes },
        { id: "/archived", label: locale.archived },
    ];

    return (
        <header className="bg-primary header-container">
            <h1>
                {userData?.name} {locale.notes}
            </h1>
            <RadioButton
                options={listButton}
                onChange={onSelectedChanged}
                value={selected}
            />
            <div style={{ display: "flex" }}>
                <Button className="p-025 mr-05" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <MdLightMode size={28} />
                    ) : (
                        <MdOutlineDarkMode size={28} />
                    )}
                </Button>
                <Button className="p-025 mr-05" onClick={toggleLanguage}>
                    <MdGTranslate size={28} />
                </Button>
                <Button onClick={onClickLogout}>
                    <FaSignOutAlt /> {locale.logout}
                </Button>
            </div>
        </header>
    );
}
