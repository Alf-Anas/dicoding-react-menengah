import React, { useContext } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

export default function NotFound() {
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);

    function onClickome() {
        navigate("/");
    }

    return (
        <div>
            <section className="type-section max-w-600 mx-auto mt-5">
                <div className="card text-center">
                    <h2>{locale.notFound404}</h2>
                    <p className="mt-0">{locale.notFound404Message}</p>
                    <Button onClick={onClickome} className="mb-1">
                        {locale.backToHome}
                    </Button>
                </div>
            </section>
        </div>
    );
}
