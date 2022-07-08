export function showReadMore(text, MAX_LEN) {
    return (
        <span>
            {text.substring(0, MAX_LEN)}...
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