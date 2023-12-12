import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../../components/NoteDetail";
import {
    archiveNote,
    deleteNote,
    getNote,
    unarchiveNote,
} from "../../utils/api";
import LoadingIcon from "../../components/LoadingIcon";
import LocaleContext from "../../contexts/LocaleContext";
import useRefresh from "../../hooks/useRefresh";

export default function DetailPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);

    const [noteData, setNoteData] = useState();
    const [refresh, setRefresh] = useRefresh();

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        getNote(id)
            .then((res) => {
                if (!res.error) {
                    setNoteData(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, refresh]);

    function onDeleteNote(id) {
        setIsLoading(true);
        deleteNote(id)
            .then((res) => {
                if (!res.error) {
                    navigate("/");
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }

    function onArchivedNote(id, archived) {
        setIsLoading(true);
        if (archived) {
            archiveNote(id)
                .then((res) => {
                    if (!res.error) {
                        setRefresh();
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        } else {
            unarchiveNote(id)
                .then((res) => {
                    if (!res.error) {
                        setRefresh();
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        }
    }

    return (
        <>
            <section className="type-section">
                {!isLoading && noteData && (
                    <NoteDetail
                        note={noteData}
                        onDelete={onDeleteNote}
                        onArchived={onArchivedNote}
                    />
                )}
                {isLoading && (
                    <p>
                        <LoadingIcon /> {locale.loading}
                    </p>
                )}
                {!isLoading && !noteData && <p>{locale.noteNotFound}</p>}
            </section>
        </>
    );
}
