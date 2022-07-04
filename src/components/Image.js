

function Image({ src }) {
    return (
        <div>
            <img src={src} width="25" height="25" alt="profileImage"
                className="rounded-full border-2 border-indigo-500"
            />
        </div>
    );
}

export default Image;