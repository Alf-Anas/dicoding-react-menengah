import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Note from "../../components/Note";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

export default function ArchivedPage({
    listNote,
    onDeleteNote = () => {},
    onArchivedNote = () => {},
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [listFilteredNote, setListFilteredNote] = useState(listNote);
    const [search, setSearch] = useState("");

    function onChangeSearch(e) {
        setSearch(e.target.value);
    }

    function filteringNote(q = "") {
        const lowSearch = q.toLowerCase();
        const filtered = listNote.filter((note) =>
            note.title.toLowerCase().includes(lowSearch)
        );
        setListFilteredNote(filtered);
    }

    useEffect(() => {
        filteringNote(query);
        if (!search && query) {
            setSearch(query);
        }
    }, [listNote, query]);

    function onSearchClick(q = "") {
        if (q) {
            setSearchParams({ query: q });
        } else {
            setSearchParams({});
        }
    }

    const listArchiveNote = listFilteredNote.filter(
        (note) => note.archived === true
    );

    return (
        <>
            <div>
                <div className="top-container">
                    <div className="search-container">
                        <Input
                            className="search-input"
                            type="text"
                            placeholder="Cari catatan..."
                            value={search}
                            onChange={onChangeSearch}
                        />
                        <Button onClick={() => onSearchClick(search)}>
                            <FaSearch /> Cari
                        </Button>
                    </div>
                </div>
                <div id="content">
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
                            {listArchiveNote.length === 0 && (
                                <p>Arsip Catatan tidak ditemukan!</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

ArchivedPage.propTypes = {
    listNote: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onDeleteNote: PropTypes.func,
    onArchivedNote: PropTypes.func,
};
