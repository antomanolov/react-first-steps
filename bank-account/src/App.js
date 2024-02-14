import { useReducer, useState } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isInactive: true,
};

function reducer(state, action) {
    switch (action.type) {
        case "openAccount": {
            return { ...state, isInactive: false, balance: 500 };
        }
        case "deposit": {
            return { ...state, balance: state.balance + action.payload };
        }

        case "withdraw": {
            if (state.balance - action.payload < 0) return { ...state };
            return { ...state, balance: state.balance - action.payload };
        }

        case "requestLoan": {
            // this returns just the current state without changing nothing if it still have loan
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: state.loan > 0 ? state.loan : state.loan + action.payload,
                balance: state.balance + action.payload,
            };
        }

        case "payLoan": {
            if (state.loan <= 0) return state;
            return {
                ...state,
                loan: 0,
                balance: state.balance - state.loan,
            };
        }

        case "withdrawAll": {
            return { ...state, balance: 0 };
        }

        case "closeAccount": {
            if (state.balance === 0 && state.loan === 0) return initialState;
            return state;
        }
        default:
            throw new Error("No such action");
    }
}

export default function App() {
    const [{ balance, loan, isInactive }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const [deposit, setDeposit] = useState("");
    const [withdraw, setWithdraw] = useState("");
    const [loanField, setLoanField] = useState("");

    function depositSubmitForm(e) {
        e.preventDefault();
        setDeposit("");
    }

    function withdrawSubmitForm(e) {
        e.preventDefault();
        setWithdraw("");
    }

    function loanSubmitForm(e) {
        e.preventDefault();
        setLoanField("");
    }

    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>

            <p>
                <button
                    onClick={() => {
                        dispatch({ type: "openAccount" });
                    }}
                    disabled={isInactive ? false : true}
                >
                    Open account
                </button>
            </p>

            <form onSubmit={depositSubmitForm}>
                <input
                    type="text"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="Value to deposit"
                    disabled={isInactive}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "deposit",
                            payload: Number(deposit),
                        });
                    }}
                    disabled={isInactive}
                >
                    Deposit
                </button>
            </form>

            <form onSubmit={withdrawSubmitForm}>
                <input
                    type="text"
                    value={withdraw}
                    onChange={(e) => setWithdraw(e.target.value)}
                    placeholder="Value to withdraw"
                    disabled={isInactive}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "withdraw",
                            payload: Number(withdraw),
                        });
                    }}
                    disabled={isInactive}
                >
                    Withdraw
                </button>
            </form>

            <form onSubmit={loanSubmitForm}>
                <input
                    type="text"
                    value={loanField}
                    onChange={(e) => setLoanField(e.target.value)}
                    placeholder="Value to loan"
                    disabled={isInactive}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "requestLoan",
                            payload: Number(loanField),
                        });
                    }}
                    disabled={isInactive}
                >
                    Request a loan
                </button>
            </form>

            <p>
                <button
                    onClick={() => {
                        dispatch({
                            type: "payLoan",
                        });
                    }}
                    disabled={isInactive}
                >
                    Pay loan
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: "withdrawAll" });
                    }}
                    disabled={isInactive}
                >
                    Withdraw all
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        dispatch({ type: "closeAccount" });
                    }}
                    disabled={isInactive}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}
