import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "./home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import NewPage from "./new";
import DetailPage from "./detail";
import ArchivedPage from "./archived";
import { INITIAL_NOTE_DATA, getInitialData } from "../utils";

export default function Home() {
    const [listNote, setListNote] = useState(getInitialData());

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

    function onAddNewNote(newNote = INITIAL_NOTE_DATA) {
        setListNote((oldState) => {
            return [newNote, ...oldState];
        });
    }

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                listNote={listNote}
                                onArchivedNote={onArchivedNote}
                                onDeleteNote={onDeleteNote}
                            />
                        }
                    />
                    <Route
                        path="/archived"
                        element={
                            <ArchivedPage
                                listNote={listNote}
                                onArchivedNote={onArchivedNote}
                                onDeleteNote={onDeleteNote}
                            />
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <DetailPage
                                listNote={listNote}
                                onArchivedNote={onArchivedNote}
                                onDeleteNote={onDeleteNote}
                            />
                        }
                    />
                    <Route
                        path="/new"
                        element={<NewPage onAddNewNote={onAddNewNote} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}
