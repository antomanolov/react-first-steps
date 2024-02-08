import { useState } from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleOnClick() {
        setShowAddForm((show) => !show);
    }

    function handleAddFriend(newFriend) {
        setFriends((prevFriends) => [...prevFriends, newFriend]);
        handleOnClick();
    }

    function handleSelection(friend) {
        setSelectedFriend((current) =>
            current?.id === friend.id ? null : friend
        );
        setShowAddForm(false);
    }

    function handleSplitBill(value) {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend
            )
        );
        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friends={friends}
                    onSelection={handleSelection}
                    selectedFriend={selectedFriend}
                />

                {showAddForm && (
                    <FormAddFriend OnAddNewFriend={handleAddFriend} />
                )}

                <Button onClick={handleOnClick}>
                    {showAddForm ? "Close" : "Add Friend"}
                </Button>
            </div>
            {selectedFriend && (
                <FromSplitBill
                    friend={selectedFriend}
                    onSplitBill={handleSplitBill}
                    key={selectedFriend.id}
                />
            )}
        </div>
    );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
    return (
        <ul>
            {friends.map((el) => (
                <Friend
                    key={el.id}
                    friend={el}
                    onSelection={onSelection}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, onSelection, selectedFriend }) {
    const isSelected = friend.id === selectedFriend?.id;
    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)}€
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you {Math.abs(friend.balance)}€
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button onClick={() => onSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

function FormAddFriend({ OnAddNewFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleNameChange(e) {
        setName(() => e.target.value);
    }

    function handleImageChange(e) {
        setImage(() => e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !image) {
            return;
        }
        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id,
        };
        OnAddNewFriend(newFriend);

        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>🧑‍🤝‍🧑 Friend name</label>
            <input type="text" value={name} onChange={handleNameChange} />

            <label>🖼️ Image URL</label>
            <input
                type="text"
                value={image}
                onChange={handleImageChange}
                disabled
            />

            <Button>Add</Button>
        </form>
    );
}

function FromSplitBill({ friend, onSplitBill }) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const [whoIsPaying, setWhoIsPaying] = useState("You");
    const paidByFriend = bill ? bill - paidByUser : "";

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        onSplitBill(whoIsPaying === "You" ? paidByFriend : -paidByUser);
    }
    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {friend.name}</h2>
            <label>💰️Bill value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>💰️Your expenses</label>
            <input
                type="text"
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill
                            ? paidByUser
                            : Number(e.target.value)
                    )
                }
            />

            <label>💰️{friend.name}'s expenses</label>
            <input type="text" value={paidByFriend} disabled />

            <label>💰️ Who is paying the bill</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value={friend.name}>{friend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
