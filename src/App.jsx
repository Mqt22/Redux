import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Update } from './redux/counter/cardslicer'
function App() {
  const current = useSelector(state => state.Imgdata.images[state.Imgdata.current])
  const dispatch = useDispatch()
  return (
    <>
      <div>
        <img src={current} alt="" />
        <button onClick={() => dispatch(Update())}>Next Image</button>
      </div>
    </>
  )
}

export default App
