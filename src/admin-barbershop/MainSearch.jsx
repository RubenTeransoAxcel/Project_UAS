import { createRoot } from "react-dom/client";
import "./custom.css"
import SearchBar from "./SearchBar";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <SearchBar/>
        </div>
    )