export default function Button({ onResetAll }) {
    return (
        <button className="btn" onClick={onResetAll}>
            Reset
        </button>
    );
}
