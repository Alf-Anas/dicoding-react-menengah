import React from "react";
import PropTypes from "prop-types";

export default function Input({ className = "", type = "", ...props }) {
    if (type == "textarea") {
        return <textarea className={`main-input ${className}`} {...props} />;
    }
    return <input className={`main-input ${className}`} {...props} />;
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(["text", "textarea", ""]),
};
