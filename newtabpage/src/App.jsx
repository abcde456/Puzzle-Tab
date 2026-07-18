import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

function App() {
    const searchRef = useRef(null);

    return (
        <div className="maincontainer">
            <div
                className="searchbar"
                onClick={() => searchRef.current.focus()}
            >
                <FaSearch />
                <input ref={searchRef} placeholder="Search..." />
            </div>
            <div className="quicklink"></div>
        </div>
    );
}

export default App;
