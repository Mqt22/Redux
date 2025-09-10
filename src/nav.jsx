import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const nav = () => {
    const count = useSelector((state) => state.counter.value)
    return (
        <div>i am a nav {count}</div>
    )
}

export default nav