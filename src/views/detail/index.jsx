import React, { useEffect, useState } from "react";
import { INITIAL_NOTE_DATA } from "../../utils";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteDetail from "../../components/NoteDetail";

export default function DetailPage({
    listNote,
    onDeleteNote = () => {},
    onArchivedNote = () => {},
}) {
    const { id } = useParams();

    const [noteData, setNoteData] = useState(INITIAL_NOTE_DATA);

    useEffect(() => {
        const eListNote = listNote || [];
        const findData = eListNote.find((item) => item.id === id);

        setNoteData(findData);
    }, [id, listNote]);

    return (
        <>
            <section className="type-section">
                {noteData?.id ? (
                    <NoteDetail
                        note={noteData}
                        onDelete={onDeleteNote}
                        onArchived={onArchivedNote}
                    />
                ) : (
                    <p>Data Catatan Tidak Ditemukan!</p>
                )}
            </section>
        </>
    );
}

DetailPage.propTypes = {
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
