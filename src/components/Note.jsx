import React from "react";
import { showFormattedDate } from "../utils";
import Button from "./Button";

export default function Note({
    note = {},
    onDelete = (_id) => {},
    onArchived = (_id, _archived) => {},
}) {
    const tandaiButton = note.archived ? (
        <Button
            variant="secondary"
            size="sm"
            className="mr-05"
            onClick={() => onArchived(note.id, false)}
        >
            Aktifkan
        </Button>
    ) : (
        <Button
            variant="secondary"
            size="sm"
            className="mr-05"
            onClick={() => onArchived(note.id, true)}
        >
            Arsipkan
        </Button>
    );

    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p className="mb-0 mt-0 text-gray">
                {showFormattedDate(note.createdAt)}
            </p>
            <p className="mt-0">{note.body}</p>
            {tandaiButton}
            <Button size="sm" onClick={() => onDelete(note.id)}>
                Hapus Catatan
            </Button>
        </div>
    );
}
