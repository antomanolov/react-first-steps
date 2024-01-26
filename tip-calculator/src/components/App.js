import Bill from "./Bill.js";
import SelectPercentage from "./SelectPercentage.js";
import Output from "./Output.js";
import Button from "./Button.js";
import { useState } from "react";

const percentages = [
    { values: [0, "Dissatisfaid(0%)"] },
    { values: [5, "It was okay(5%)"] },
    { values: [10, "It was good(10%)"] },
    { values: [20, "Absolutely amazing(20%)"] },
];

export default function App() {
    const [bill, setBill] = useState("");
    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(0);
    const avrg = (Number(percent1) + Number(percent2)) / 2;

    function resetAll() {
        setBill("");
        setPercent1(0);
        setPercent2(0);
    }
    return (
        <div className="container">
            <Bill bill={bill} onChangeBill={setBill} />
            <SelectPercentage
                selectOptions={percentages}
                percent={setPercent1}
                per={percent1}
            >
                <h2>How did you liked the service? </h2>
            </SelectPercentage>
            <SelectPercentage
                selectOptions={percentages}
                percent={setPercent2}
                per={percent2}
            >
                <h2>How did your friend liked the service? </h2>
            </SelectPercentage>
            <Output payAmount={bill} avrg={avrg} />
            {bill > 0 ? <Button onResetAll={resetAll} /> : null}
        </div>
    );
}
