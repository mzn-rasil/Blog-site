

export function formatDate(timeStamp) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return new Date(timeStamp).toLocaleDateString(undefined, options);
}
