export default function SelectPercentage({
    selectOptions,
    children,
    percent,
    per,
}) {
    return (
        <div className="flex">
            {children}
            {/* the select value must be the ONCHANGE value that selects the option */}
            <select value={per} onChange={(e) => percent(e.target.value)}>
                {selectOptions.map((el) => (
                    <option key={el["values"][0]} value={el["values"][0]}>
                        {el["values"][1]}
                    </option>
                ))}
            </select>
        </div>
    );
}
