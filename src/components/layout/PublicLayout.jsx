import React, { useContext, useEffect } from "react";
import Footer from "../Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import HeaderPublic from "../HeaderPublic";

export default function PublicLayout() {
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin]);

    return (
        <>
            <HeaderPublic />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
