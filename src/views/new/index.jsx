import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../utils/api";
import LoadingIcon from "../../components/LoadingIcon";
import LocaleContext from "../../contexts/LocaleContext";

const MAX_TITLE_LENGTH = 50;

export default function NewPage() {
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);

    const [noteForm, setNoteForm] = useState({ title: "", body: "" });
    const [isLoading, setIsLoading] = useState(false);

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

    function onSaveNote() {
        if (!noteForm.title) {
            window.alert(locale.msgNoteEmpty);
            return;
        }
        setIsLoading(true);
        addNote(noteForm)
            .then((res) => {
                if (!res.error) {
                    onClearForm();
                    navigate("/");
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <section className="type-section max-w-600 mx-auto">
            <div className="card text-center">
                <form className="note-form">
                    {noteForm.title.length > 0 && (
                        <small className="float-right">
                            {locale.characterLeft} :{" "}
                            {MAX_TITLE_LENGTH - noteForm.title.length}
                        </small>
                    )}
                    <Input
                        className="note-form-input"
                        type="text"
                        placeholder={locale.notes}
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
                <Button onClick={onSaveNote} disabled={isLoading}>
                    {isLoading && <LoadingIcon />} {locale.save}
                </Button>
            </div>
        </section>
    );
}
