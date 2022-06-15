import { useReducer } from "react";

// cung cấp thêm 1 lựa chọn để sử dụng state cho function Component, số lượng state trong 1 Component nhiều
// useState
// 1. Init state: 0
// 2. Action: Up (state + 1) / Down (state - 1)

// useReducer
// 1. Init state: 0
// 2. Action: Up (state + 1) / Down (state - 1)
// 3. Reducer
// 4. Dispatch

// Init state
const initState = 0
// Action 
const UP_ACTION = 'up'
const DOWN_ACTION = 'down'
// Reducer
const reducer = (state, action) => {
    //console.log('running')
    switch(action) {
        case UP_ACTION:
            return state + 1
        case DOWN_ACTION:
            return state -1
        default:
            throw new Error('Invalid action')
    }
}

function UseReducer() {
    const [count, dispatch] = useReducer(reducer, initState)

    return (
        <div>
            <h1>{count}</h1>
            <button
                onClick={() => dispatch(DOWN_ACTION)}
            >
                Down
            </button>
            <button
                onClick={() => dispatch(UP_ACTION)}
            >
                Up
            </button>
        </div>
    )
}

export default UseReducer;