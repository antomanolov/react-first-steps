export default function Output({ payAmount, avrg }) {
    const money = Number(payAmount);
    const tip = avrg > 0 ? (avrg / 100) * money : 0;
    return (
        payAmount !== "" && (
            <div className="output">
                <h1>
                    You pay {`${(tip + money).toFixed(2)}`}$ ({payAmount}$ + $
                    {tip} tip)
                </h1>
            </div>
        )
    );
}
