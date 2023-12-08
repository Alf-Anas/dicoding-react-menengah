import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Note from "../../components/Note";
import { useNavigate, useSearchParams } from "react-router-dom";
import RadioButton from "../../components/RadioButton";
import PropTypes from "prop-types";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function HomePage({
    listNote,
    onDeleteNote = () => {},
    onArchivedNote = () => {},
}) {
    const navigate = useNavigate();
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

    const listActiveNote = listFilteredNote.filter(
        (note) => note.archived === false
    );

    function onClickAdd() {
        navigate("/new");
    }

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

                    <Button onClick={onClickAdd}>
                        <FaPlus /> Tambah Catatan
                    </Button>
                </div>
                <RadioButton />
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
                </div>
            </div>
        </>
    );
}

HomePage.propTypes = {
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
