import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import logo from "./assets/logo.png";

function App() {
    const searchRef = useRef(null);

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (search.trim() == "") {
            setSuggestions([]);
            return;
        }

        async function getSuggestions() {
            try {
                const api = await fetch(
                    `https://puzzletab.zeeyee120.workers.dev/?q=${encodeURIComponent(search)}`,
                );

                const data = await api.json();

                setSuggestions(data.map((item) => item.phrase).slice(0, 6));
            } catch (e) {
                console.error("Could not get search suggestions:", e);
                setSuggestions([]);
            }
        }

        getSuggestions();
    }, [search]);

    const [focusedSuggestion, setFocusedSuggestion] = useState(0);

    return (
        <div className="maincontainer">
            <img src={logo} />
            <div
                className="searchbar"
                onClick={() => searchRef.current.focus()}
            >
                <FaSearch />
                <input
                    ref={searchRef}
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setFocusedSuggestion((prev) =>
                                prev < suggestions.length - 1 ? prev + 1 : 0,
                            );
                        }

                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setFocusedSuggestion((prev) =>
                                prev > 0 ? prev - 1 : suggestions.length - 1,
                            );
                        }

                        if (e.key === "Enter") {
                            if (focusedSuggestion >= 0) {
                                setSearch(suggestions[focusedSuggestion]);
                                setFocusedSuggestion(-1);
                                setSuggestions([]);
                            } else if (search.trim() !== "") {
                                window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(search)}`;
                            }
                        }
                    }}
                />
            </div>
            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`suggestion ${
                                index === focusedSuggestion ? "focused" : ""
                            }`}
                            onClick={() => {
                                setSearch(suggestion);
                                setSuggestions([]);
                                searchRef.current.focus();
                            }}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            <div className="quicklink"></div>
        </div>
    );
}

export default App;
