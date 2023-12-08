import React from "react";
import PropTypes from "prop-types";

export default function RadioButton({
    options = [],
    onChange = () => {},
    value = "",
}) {
    const handleOptionChange = (val) => {
        onChange(val);
    };

    return (
        <div>
            {options.map((option) => (
                <label
                    key={option.id}
                    className={`radio-button ${
                        value === option.id ? "active" : ""
                    }`}
                >
                    <input
                        type="radio"
                        value={option.id}
                        checked={value === option.id}
                        onChange={() => handleOptionChange(option.id)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

RadioButton.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    onChange: PropTypes.func,
    value: PropTypes.string,
};
