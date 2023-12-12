import React, { useEffect, useState } from "react";
import HomePage from "./home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import NewPage from "./new";
import DetailPage from "./detail";
import ArchivedPage from "./archived";
import PrivateLayout from "../components/layout/PrivateLayout";
import PublicLayout from "../components/layout/PublicLayout";
import AuthContext from "../contexts/AuthContext";
import LocaleContext from "../contexts/LocaleContext";
import getLocale, {
    getItemLocale,
    putItemLocale,
} from "../components/locale/locale";
import LoginPage from "./login";
import RegisterPage from "./register";
import { getAccessToken, getUserLogged } from "../utils/api";
import ThemeContext from "../contexts/ThemeContext";
import { getTheme, putTheme } from "../utils";

export default function Home() {
    const [isLogin, setIsLogin] = useState(undefined);
    const [userData, setUserData] = useState(null);
    const [language, setLanguage] = useState("id");
    const [theme, setTheme] = useState("light");
    const [locale, setLocale] = useState(() => getLocale(language));

    useEffect(() => {
        const eLocale = getItemLocale();
        if (eLocale) {
            setLanguage(eLocale);
        }
        const eTheme = getTheme();
        if (eTheme) {
            setTheme(eTheme);
        }
    }, []);

    useEffect(() => {
        document.title = locale.title;
    }, [locale]);

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    function toggleLanguage() {
        setLanguage((oldState) => {
            const eLang = oldState === "id" ? "en" : "id";
            putItemLocale(eLang);
            return eLang;
        });
    }

    function toggleTheme() {
        setTheme((oldState) => {
            const eTheme = oldState === "light" ? "dark" : "light";
            putTheme(eTheme);
            return eTheme;
        });
    }

    useEffect(() => {
        setLocale(getLocale(language));
    }, [language]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        if (isLogin) {
            getUserLogged()
                .then((res) => {
                    if (!res.error) {
                        setUserData(res.data);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            setUserData(null);
        }
    }, [isLogin]);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, userData }}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <LocaleContext.Provider
                    value={{ language, toggleLanguage, locale }}
                >
                    <Routes>
                        <Route path="/" element={<PrivateLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="archived" element={<ArchivedPage />} />
                            <Route path="detail/:id" element={<DetailPage />} />
                            <Route path="new" element={<NewPage />} />
                        </Route>
                        <Route path="/" element={<PublicLayout />}>
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </LocaleContext.Provider>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}
