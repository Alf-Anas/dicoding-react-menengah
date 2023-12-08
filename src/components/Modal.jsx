import React from "react";
import Button from "./Button";

export default function Modal({
    show = false,
    title = <></>,
    children = <></>,
    onClose = () => {},
    onConfirm = () => {},
}) {
    const activeClass = show ? "active" : "";
    return (
        <>
            <div className={`overlay ${activeClass}`}></div>
            <div className={`modal-container ${activeClass}`}>
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    <div className="close-modal" onClick={onClose}>
                        &times;
                    </div>
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <Button className="mr-05" onClick={onConfirm}>
                        Simpan
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                </div>
            </div>
        </>
    );
}
