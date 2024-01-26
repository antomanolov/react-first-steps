import Bill from "./Bill.js";
import SelectPercentage from "./SelectPercentage.js";
import Output from "./Output.js";
import Button from "./Button.js";
import { useState } from "react";

export default function App() {
    const [bill, setBill] = useState("");

    return (
        <div className="container">
            <Bill bill={bill} onChangeBill={setBill} />
            <SelectPercentage />
            <SelectPercentage />
            <Output payAmount={bill} />
            <Button />
        </div>
    );
}
