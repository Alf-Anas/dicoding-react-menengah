import React, { useContext, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function PrivateLayout() {
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin === false) {
            navigate("/login");
        }
    }, [isLogin]);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
