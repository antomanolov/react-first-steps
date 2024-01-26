export default function Bill({ bill, onChangeBill }) {
    function handleChange(e) {
        onChangeBill(e.target.value);
    }

    return (
        <div className="flex">
            <h2>How much was the bill?</h2>
            <input type="text" value={bill} onChange={handleChange}></input>
        </div>
    );
}
