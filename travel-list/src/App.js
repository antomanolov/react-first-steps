import { useState } from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearList() {
        // this is used to confirm a choice! ver nice :D
        const confirm = window.confirm(
            "Are you sure you want to delete your list"
        );
        if (confirm) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItems={handleToggleItem}
                handleClearList={handleClearList}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItem, onToggleItems, handleClearList }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;
    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description")
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed")
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDelete={onDeleteItem}
                        onToggleItems={onToggleItems}
                        key={item.id}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={handleClearList}>Clear list</button>
            </div>
        </div>
    );
}

function Item({ item, onDelete, onToggleItems }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItems(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDelete(item.id)}>❌</button>
        </li>
    );
}

function Stats({ items }) {
    const totalItems = items.length;
    const packedItems = items.slice().filter((item) => item.packed === true);

    const percantagePacked = Math.floor(
        (packedItems.length / totalItems) * 100
    );
    return (
        <footer className="stats">
            <em>
                {percantagePacked === 100
                    ? "You packed everything you need ✈️"
                    : `💼 You have ${totalItems} items on your list${
                          packedItems.length > 0
                              ? `, and you already packed ${packedItems.length} (${percantagePacked}%)`
                              : ""
                      }`}
            </em>
        </footer>
    );
}
