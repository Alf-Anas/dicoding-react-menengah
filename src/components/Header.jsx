import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioButton from "./RadioButton";

const listButton = [
    { id: "/", label: "Catatan" },
    { id: "/archived", label: "Arsip" },
];

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(location.pathname);

    function onSelectedChanged(val = "/") {
        navigate(val);
    }

    useEffect(() => {
        setSelected(location.pathname);
    }, [location.pathname]);

    return (
        <header className="bg-primary header-container">
            <h1>My Notes App</h1>
            <RadioButton
                options={listButton}
                onChange={onSelectedChanged}
                value={selected}
            />
        </header>
    );
}
