export default function Output({ payAmount }) {
    return (
        payAmount !== "" && (
            <div className="output">
                <h1>You pay {payAmount}$ (100% + tip)</h1>
            </div>
        )
    );
}
