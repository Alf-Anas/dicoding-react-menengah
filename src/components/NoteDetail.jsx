import React, { useContext } from "react";
import { showFormattedDate } from "../utils";
import Button from "./Button";
import PropTypes from "prop-types";
import { FaRegFileArchive, FaRegTrashAlt, FaFileExport } from "react-icons/fa";
import LocaleContext from "../contexts/LocaleContext";

export default function NoteDetail({
    note = {},
    onDelete = (_id) => {},
    onArchived = (_id, _archived) => {},
}) {
    const { locale } = useContext(LocaleContext);
    const tandaiButton = note.archived ? (
        <Button
            variant="secondary"
            className="mr-05"
            onClick={() => onArchived(note.id, false)}
        >
            <FaFileExport /> {locale.unarchive}
        </Button>
    ) : (
        <Button
            variant="secondary"
            className="mr-05"
            onClick={() => onArchived(note.id, true)}
        >
            <FaRegFileArchive /> {locale.archiving}
        </Button>
    );

    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p className="mb-0 mt-0 text-gray">
                {showFormattedDate(note.createdAt)}
            </p>
            <p className="mt-0">{note.body}</p>
            <div className="flex-between">
                <div />
                <div>
                    {tandaiButton}
                    <Button className="mr-05" onClick={() => onDelete(note.id)}>
                        <FaRegTrashAlt /> {locale.delete}
                    </Button>
                </div>
            </div>
        </div>
    );
}

NoteDetail.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.string,
        body: PropTypes.string,
        archived: PropTypes.bool,
    }),
    onDelete: PropTypes.func,
    onArchived: PropTypes.func,
};
