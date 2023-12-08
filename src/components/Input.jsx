import React from "react";

export default function Input({ className = "", type = "", ...props }) {
    if (type == "textarea") {
        return <textarea className={`main-input ${className}`} {...props} />;
    }
    return <input className={`main-input ${className}`} {...props} />;
}
