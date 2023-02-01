import './App.css';
import MountedContent from './MountedContent';
import { Button } from 'react-bootstrap';
import { 
  useState, 
  useContext, 
  useRef, 
  useEffect, 
  useReducer, 
  useCallback, 
  useMemo, 
} from 'react';
import Content from "./Content";
import { ThemeContext } from './ThemeContext';
import MemoContent from './memoContent';

export function AppCounter() {
  const orders = [200, 200, 300];
  const total = orders.reduce((total, current) => total + current);
  const [counter, setCounter] = useState(() => {
    return total;
  });

  const handleIncrease = () => {
    setCounter(counter + total);
  };

  return (
    <div className='app-Counter' style={{ marginBottom: 20, textAlign: 'center' }}>
      <h2>Counter Price</h2>
      <h3>{ counter }</h3>
      <Button onClick={handleIncrease} variant='outline-info'>Increase</Button>
    </div>
  )
}

export function Mounted() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={() => setShow(!show)} variant='outline-info'>Toggle</Button>
      {show && <MountedContent />}
    </div>
  )
}

export default function ChangeTheme() {
  const context = useContext(ThemeContext);

    return (  
        <div style={{ textAlign: 'center', padding: 20 }}>
            <button className="btn btn-outline-info" onClick={context.changeTheme}>Change Theme</button>
            <Content />
        </div>
    )
}

export function AppCountDown() {
  const [countdonwn, setCountDown] = useState(60);

  const timerId = useRef();
  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = countdonwn
  }, [countdonwn])

  const handleStart = () => {
    timerId.current = setInterval(() => {
      setCountDown(prevCount => prevCount - 1)
    }, 1000);

    console.log('Start -> ', timerId.current);
  }

  const handleStop = () => {
    clearInterval(timerId.current);
    console.log('Stop -> ', timerId.current);
  }

  console.log(countdonwn, prevCount.current);
  
  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>{countdonwn}</h2>
      <button className="btn btn-outline-info" onClick={handleStart}>Start</button>
      <button className="btn btn-outline-info" onClick={handleStop}>Stop</button>
    </div>
  )
}

// useState
// 1. Init state = 0
// 2. Actions: Up (state + 1) / Down (state - 1)

// useReducer
// 1. Init state = 0
// 2. Actions: Up (state + 1) / Down (state - 1)
// 3. Reducer
// 4. Dispatch

// Init state
const initState = 0;

// Actions
const UP_ACTION = 'up';
const DOWN_ACTION = 'down';

// Reducer
const reducer = (state, action) => {
  console.log('Reducer running');
  switch(action) {
    case UP_ACTION:
      return state + 1
    case DOWN_ACTION:
      return state - 1
    default:
      throw new Error('Invalid Action')
  }
}

export function UpDownCount() {
  const [count, dispatch] = useReducer(reducer, initState);

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>{count}</h2>
      <button onClick={() => dispatch(UP_ACTION)} className="btn btn-outline-info">Up</button>
      <button onClick={() => dispatch(DOWN_ACTION)} className="btn btn-outline-info">Down</button>
    </div>
  )
}

export function ReactMemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handlelIncrease = useCallback(() => {
    setCount1(prevCount1 => prevCount1 + 1)
  }, [])

  const handlelIncrease2 = () => {
    setCount2(prevCount2 => prevCount2 + 1)
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <MemoContent count2={count2} onIncrease={handlelIncrease} />
      <h1>count1 {count1}</h1>
      <h1>count2 {count2}</h1>
      <button onClick={handlelIncrease2} className="btn btn-outline-info">Click here!</button>
    </div>
  )
}

export function Order() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  const nameRef = useRef();

  const handleSubmit = () => {
    setProducts([...products, {
      name,
      price: parseInt(price)
    }])
    setName('');
    setPrice('');

    nameRef.current.focus();
  }

  const total = useMemo(() => {
    const result = products.reduce((result, prod) => {
      console.log('Recalculation')

      return result + prod.price
    }, 0)
    return result
  }, [products])

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <input
        ref={nameRef}
        value={name}
        placeholder="Enter name"
        onChange={e => setName(e.target.value)}
        style={{ 
          marginBottom: '10px', 
          borderRadius: 4, 
          border: '1px solid #17a2b8',
          outline: 'none',
          width: '200px'
        }}
      /> 
      <br />
      <input
        value={price}
        placeholder="Enter price"
        onChange={e => setPrice(e.target.value)}
        style={{ 
          marginBottom: '10px', 
          borderRadius: 4, 
          border: '1px solid #17a2b8',
          outline: 'none',
          width: '200px'
        }}
      />
      <br />
      <button 
        onClick={handleSubmit} 
        className="btn btn-outline-info"
      >
        Add
      </button>
      <br />
      Total: {total}
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}