import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    function onClickome() {
        navigate("/");
    }

    return (
        <section className="type-section max-w-600 mx-auto">
            <div className="card text-center">
                <h2>404 Not Found</h2>
                <p className="mt-0">
                    Oops! The page you're looking for doesn't seem to exist.
                </p>
                <Button onClick={onClickome} className="mb-1">
                    Back To Home
                </Button>
            </div>
        </section>
    );
}
