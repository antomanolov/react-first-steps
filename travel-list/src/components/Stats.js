export default function Stats({ items }) {
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
