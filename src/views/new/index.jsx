import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { generateRandomId } from "../../utils";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MAX_TITLE_LENGTH = 50;

export default function NewPage({ onAddNewNote = () => {} }) {
    const navigate = useNavigate();

    const [noteForm, setNoteForm] = useState({ title: "", body: "" });

    function onChangeNoteFormTitle(e) {
        const eVal = e.target.value;
        if (eVal.length > MAX_TITLE_LENGTH) return;
        setNoteForm((oldState) => {
            return { ...oldState, title: eVal };
        });
    }
    function onChangeNoteFormBody(e) {
        const eVal = e.target.value;
        setNoteForm((oldState) => {
            return { ...oldState, body: eVal };
        });
    }

    function onClearForm() {
        setNoteForm({ title: "", body: "" });
    }

    function onConfirmModal() {
        if (!noteForm.title) {
            window.alert("Judul belum terisi!");
            return;
        }
        const newNote = {
            id: generateRandomId(),
            title: noteForm.title,
            body: noteForm.body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        onAddNewNote(newNote);
        onClearForm();
        navigate("/");
    }

    return (
        <section className="type-section max-w-600 mx-auto">
            <div className="card text-center">
                <form className="note-form">
                    {noteForm.title.length > 0 && (
                        <small className="float-right">
                            Sisa Karakter :{" "}
                            {MAX_TITLE_LENGTH - noteForm.title.length}
                        </small>
                    )}
                    <Input
                        className="note-form-input"
                        type="text"
                        placeholder="Judul"
                        value={noteForm.title}
                        onChange={onChangeNoteFormTitle}
                    />

                    <Input
                        type="textarea"
                        placeholder="..."
                        className="note-form-input"
                        rows={6}
                        value={noteForm.body}
                        onChange={onChangeNoteFormBody}
                    />
                </form>
                <Button onClick={onConfirmModal}>Simpan</Button>
            </div>
        </section>
    );
}

NewPage.propTypes = {
    onAddNewNote: PropTypes.func,
};
