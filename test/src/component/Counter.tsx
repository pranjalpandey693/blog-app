import { RootState } from "../redux/store.ts";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/counterslice";
import "../App.css";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>Counter: {count}</h1>
      <button className="btn-primary" onClick={() => dispatch(increment())}>
        increment
      </button>
      <button className="btn-primary" onClick={() => dispatch(decrement())}>
        derement
      </button>
      <button
        className="btn-primary"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        incrementbyamount5
      </button>
    </div>
  );
};

export default Counter;
