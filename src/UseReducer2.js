import { useReducer, useRef } from "react";

// Init state
const initState = {
    job: '',
    jobs: []
}

// Action
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

// return ra 1 Object
const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

const addJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}

const deleteJob = payload => {
    return {
        type: DELETE_JOB,
        payload
    }
}

//console.log(setJob('rua bat'))

// Reducer
const reducer = (state, action) => {
    //console.log(action);
    console.log('Action', action);
    console.log('Prev state', state);

    let newState

    switch(action.type) {
        // không return thì break
        case SET_JOB:
            newState = {
                ...state,
                job: action.payload
            }
            break
        case ADD_JOB:
            newState = {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
            break
        case DELETE_JOB:
            const newJobs = [...state.jobs]

            newJobs.splice(action.payload, 1)

            newState = {
                ...state,
                jobs: newJobs
            }   
            break
        default:
            throw new Error('Invalid action')
    }

    console.log('New state', newState)

    return newState
    //return state return ra để tránh lỗi để coi đc console.log(action);
}

// Dispatch

function UseReducer2() {
    const [state, dispatch] = useReducer(reducer, initState)
    //console.log(state)
    const { job, jobs } = state
    const inputRef = useRef()

    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))

        inputRef.current.focus()
    } 

    return (
        <div>
            <h3>Todo</h3>
            <input
                ref={inputRef}
                value={job}
                placeholder="Enter todo ..."
                onChange={e => {
                    // e.target.value
                    dispatch(setJob(e.target.value))
                }}
            />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span onClick={() => dispatch(deleteJob(index))}>&times;</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UseReducer2;