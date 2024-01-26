export default function SelectPercentage() {
    return (
        <div className="flex">
            <h2>How did you like the service?</h2>
            <select onChange={(e) => console.log(e.target.value)}>
                <option value={0}>Dissatisfaied(0%)</option>
                <option value={5}>It was okay(5%)</option>
                <option value={10}>It was good(10%)</option>
                <option value={20}>Absolutely amazing(20%)</option>
            </select>
        </div>
    );
}
