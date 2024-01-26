import { useState } from "react";

export default function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQnt] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;
        const newItem = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };

        onAddItems(newItem);
        setDescription("");
        setQnt(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip 😍</h3>
            <select
                value={quantity}
                onChange={(e) => setQnt(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item.."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
