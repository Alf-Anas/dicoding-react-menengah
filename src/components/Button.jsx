import React from "react";

function getVariant(variant = "primary") {
    switch (variant) {
        case "primary":
            return "main-button";
        case "secondary":
            return "main-button bg-primary text-black";
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
