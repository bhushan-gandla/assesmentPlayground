import { useState } from "react"


export default function Tooltip(){
    const [showToolTip, setShowToolTip] = useState(false)

    return(<div className="tooltip-wrapper">
        <button onMouseEnter={() => setShowToolTip(true)} 
                onMouseLeave={() => setShowToolTip(false)} 
                type="button">
        Tooltip Tooltip Tooltip
        </button>
        <div className="tooltip-content" hidden={!showToolTip}>
            Sample
        </div>

    </div>)
}