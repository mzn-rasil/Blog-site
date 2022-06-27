import { NavLink } from "react-router-dom";

export const MAX_LEN = 250;

export function showReadMore(text) {
    return (
        <span>
            {text.substring(0, MAX_LEN)}...
            <NavLink
                to="#"
                className={`text-indigo-500 underline`}
            > Read More</NavLink>
        </span>
    );
}

export function showFullContent(text) {
    return (
        <span>
            {text}
        </span>
    )
}