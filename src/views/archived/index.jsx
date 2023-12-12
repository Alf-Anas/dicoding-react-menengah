import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Note from "../../components/Note";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { deleteNote, getArchivedNotes, unarchiveNote } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import LoadingIcon from "../../components/LoadingIcon";
import LocaleContext from "../../contexts/LocaleContext";

export default function ArchivedPage() {
    const { userData, isLogin } = useContext(AuthContext);
    const { locale } = useContext(LocaleContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [listNote, setListNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(new Date().getTime());

    const [listFilteredNote, setListFilteredNote] = useState(listNote);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isLogin && userData) {
            setIsLoading(true);
            getArchivedNotes()
                .then((res) => {
                    if (!res.error) {
                        setListNote(res.data);
                    } else {
                        setListNote([]);
                    }
                })
                .catch((err) => {
                    setListNote([]);
                    console.error(err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [isLogin, userData, refresh]);

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

    function onDeleteNote(id) {
        setIsLoading(true);
        deleteNote(id)
            .then((res) => {
                if (!res.error) {
                    setRefresh(new Date().getTime());
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }

    function onArchivedNote(id, archived) {
        if (archived) return;

        setIsLoading(true);
        unarchiveNote(id)
            .then((res) => {
                if (!res.error) {
                    setRefresh(new Date().getTime());
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <div>
                <div className="top-container">
                    <div className="search-container">
                        <Input
                            className="search-input"
                            type="text"
                            placeholder={locale.searchNote}
                            value={search}
                            onChange={onChangeSearch}
                        />
                        <Button onClick={() => onSearchClick(search)}>
                            <FaSearch /> {locale.search}
                        </Button>
                    </div>
                </div>
                <div id="content">
                    <section className="type-section">
                        <h2>{locale.archived}</h2>
                        <div className="note-list">
                            {!isLoading &&
                                listFilteredNote.map((note, idx) => {
                                    return (
                                        <Note
                                            key={idx}
                                            note={note}
                                            onDelete={onDeleteNote}
                                            onArchived={onArchivedNote}
                                        />
                                    );
                                })}

                            {isLoading && (
                                <p>
                                    <LoadingIcon /> {locale.loading}
                                </p>
                            )}

                            {listFilteredNote.length === 0 && !isLoading && (
                                <p>{locale.archivedNotFound}</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
