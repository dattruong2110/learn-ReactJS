import { memo } from "react";

function MemoContent({ count2, onIncrease }) {
    console.log('re-render');
    return (
        <div>
            <h2>This is memo content {count2}</h2>
            <button onClick={onIncrease} className="btn btn-outline-info">Click here!</button>
        </div>  
    )
}

export default memo(MemoContent)