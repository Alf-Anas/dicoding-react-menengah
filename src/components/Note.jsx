import React, { useContext } from "react";
import { showFormattedDate, getTruncatedText } from "../utils";
import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
    FaRegFileArchive,
    FaRegTrashAlt,
    FaRegEye,
    FaFileExport,
} from "react-icons/fa";
import LocaleContext from "../contexts/LocaleContext";

export default function Note({
    note = {},
    onDelete = (_id) => {},
    onArchived = (_id, _archived) => {},
}) {
    const { locale } = useContext(LocaleContext);
    const navigate = useNavigate();
    const tandaiButton = note.archived ? (
        <Button
            variant="secondary"
            size="sm"
            className="mr-05"
            onClick={() => onArchived(note.id, false)}
        >
            <FaFileExport /> {locale.unarchive}
        </Button>
    ) : (
        <Button
            variant="secondary"
            size="sm"
            className="mr-05"
            onClick={() => onArchived(note.id, true)}
        >
            <FaRegFileArchive /> {locale.archiving}
        </Button>
    );

    const onClickDetail = (id = "") => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p className="mb-0 mt-0 text-gray">
                {showFormattedDate(note.createdAt)}
            </p>
            <p className="mt-0">{getTruncatedText(note.body, 100)}</p>
            <div className="flex-between">
                <div>
                    {tandaiButton}
                    <Button
                        size="sm"
                        className="mr-05"
                        onClick={() => onDelete(note.id)}
                    >
                        <FaRegTrashAlt /> {locale.delete}
                    </Button>
                </div>

                <Button size="sm" onClick={() => onClickDetail(note.id)}>
                    <FaRegEye /> {locale.detail}
                </Button>
            </div>
        </div>
    );
}

Note.propTypes = {
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
