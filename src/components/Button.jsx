import React from "react";
import PropTypes from "prop-types";

function getVariant(variant = "primary") {
    switch (variant) {
        case "primary":
            return "main-button";
        case "secondary":
            return "main-button bg-primary text-main-color";
        default:
            return "main-button";
    }
}

function getSize(size = "md") {
    switch (size) {
        case "sm":
            return "small-button";
        case "md":
            return "";
        default:
            return "";
    }
}

export default function Button({
    variant = "primary",
    size = "md",
    children = <></>,
    className = "",
    ...props
}) {
    const classVariant = getVariant(variant);
    const classSize = getSize(size);
    return (
        <button
            className={`${classVariant} ${classSize} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary"]),
    size: PropTypes.oneOf(["sm", "md"]),
    children: PropTypes.node,
    className: PropTypes.string,
};
