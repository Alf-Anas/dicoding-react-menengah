import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { generateRandomId, getInitialData } from "../../utils";
import Note from "../../components/Note";
import Modal from "../../components/Modal";

const MAX_TITLE_LENGTH = 50;

export default function Home() {
    const [listNote, setListNote] = useState(getInitialData());
    const [listFilteredNote, setListFilteredNote] = useState(listNote);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [noteForm, setNoteForm] = useState({ title: "", body: "" });

    function onChangeSearch(e) {
        setSearch(e.target.value);
    }

    function filteringNote() {
        const lowSearch = search.toLowerCase();
        const filtered = listNote.filter(
            (note) =>
                note.title.toLowerCase().includes(lowSearch) ||
                note.body.toLocaleLowerCase().includes(lowSearch)
        );
        setListFilteredNote(filtered);
    }

    useEffect(() => {
        filteringNote();
    }, [listNote, search]);

    function onDeleteNote(id = "") {
        const filtered = listNote.filter((note) => note.id != id);
        setListNote(filtered);
    }

    function onArchivedNote(id = "", archived = true) {
        const filtered = listNote.filter((note) => note.id != id);
        const find = listNote.find((note) => note.id == id);
        if (find) {
            find.archived = archived;
        }
        setListNote([...filtered, find]);
    }

    const listActiveNote = listFilteredNote.filter(
        (note) => note.archived === false
    );
    const listArchiveNote = listFilteredNote.filter(
        (note) => note.archived === true
    );

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

    function onClickAdd() {
        setShowModal(true);
    }

    function onCloseModal() {
        setShowModal(false);
        onClearForm();
    }

    function onConfirmModal() {
        if (!noteForm.title) {
            window.alert("Judul belum terisi!");
            return;
        }
        setShowModal(false);
        const newNote = {
            id: generateRandomId(),
            title: noteForm.title,
            body: noteForm.body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        setListNote((oldState) => {
            return [newNote, ...oldState];
        });
        onClearForm();
    }

    return (
        <>
            <Header />
            <main>
                <div className="top-container">
                    <div className="search-container">
                        <Input
                            className="search-input"
                            type="text"
                            placeholder="Cari catatan..."
                            value={search}
                            onChange={onChangeSearch}
                        />
                        <Button onClick={filteringNote}>Cari</Button>
                    </div>

                    <Button onClick={onClickAdd}>Tambah Catatan</Button>
                </div>
                <div id="content">
                    <section className="type-section">
                        <h2>Catatan Aktif</h2>
                        <div className="note-list">
                            {listActiveNote.map((note, idx) => {
                                return (
                                    <Note
                                        key={idx}
                                        note={note}
                                        onDelete={onDeleteNote}
                                        onArchived={onArchivedNote}
                                    />
                                );
                            })}
                            {listActiveNote.length === 0 && (
                                <p>Catatan tidak ditemukan!</p>
                            )}
                        </div>
                    </section>

                    {listArchiveNote.length > 0 && (
                        <section className="type-section">
                            <h2>Arsip</h2>
                            <div className="note-list">
                                {listArchiveNote.map((note, idx) => {
                                    return (
                                        <Note
                                            key={idx}
                                            note={note}
                                            onDelete={onDeleteNote}
                                            onArchived={onArchivedNote}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Modal
                title="Tambah Catatan"
                show={showModal}
                onClose={onCloseModal}
                onConfirm={onConfirmModal}
            >
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
            </Modal>

            <Footer />
        </>
    );
}
