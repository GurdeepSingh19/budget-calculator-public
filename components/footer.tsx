import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-800 border border-slate-200 mt-6">
            <p className="mb-2 text-lg">
                <a
                    href="https://singhgurdeep.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer">
                Created by <span className="font-semibold">Gurdeep Singh</span>
                </a>
            </p>
            <a
                href="https://www.alliance-it-solutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-600 transition font-semibold text-lg"
            >
                Alliance IT Solutions
            </a>
        </footer>
    );
};

export default Footer;
