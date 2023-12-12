import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioButton from "./RadioButton";
import Button from "./Button";
import { MdGTranslate, MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

export default function HeaderPublic() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(location.pathname);
    const { toggleLanguage, locale } = useContext(LocaleContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    function onSelectedChanged(val = "/") {
        navigate(val);
    }

    useEffect(() => {
        setSelected(location.pathname);
    }, [location.pathname]);

    const listButton = [
        { id: "/login", label: locale.login },
        { id: "/register", label: locale.register },
    ];

    return (
        <header className="bg-primary header-container">
            <h1>{locale.title}</h1>

            <div style={{ display: "flex" }}>
                <Button className="p-025 mr-05" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <MdLightMode size={28} />
                    ) : (
                        <MdOutlineDarkMode size={28} />
                    )}
                </Button>
                <Button className="p-025 mr-05" onClick={toggleLanguage}>
                    <MdGTranslate size={24} />
                </Button>

                <RadioButton
                    options={listButton}
                    onChange={onSelectedChanged}
                    value={selected}
                />
            </div>
        </header>
    );
}
