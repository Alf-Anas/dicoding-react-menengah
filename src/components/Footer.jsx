import React from "react";

export default function Footer() {
    return (
        <footer className="bg-quaternary text-center text-white">
            <p className="mb-0">
                Created by ©{" "}
                <a
                    href="https://geoit.dev"
                    target="_blank"
                    className="text-secondary"
                >
                    GeoIT Developer
                </a>{" "}
                2023
            </p>
        </footer>
    );
}
