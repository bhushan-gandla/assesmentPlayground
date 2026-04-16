import { useState } from "react";

const initialList = [{
    title: "Take dog to vet",
    isCompleted: false
},
{
    title: "Buy grocery",
    isCompleted: false
},
{
    title: "Place order",
    isCompleted: false
},
{
    title: "Call customer care",
    isCompleted: false
}]
export default function CheckList() {
    const [list, setList] = useState(initialList);

    function handleListChange(i: number) {
        setList(prev => {
            const item = prev[i];
            const updatedItem = {
                ...item,
                isCompleted: !item.isCompleted,
            };

            const newList = prev.filter((_, index) => index !== i);

            return [...newList, updatedItem];
        });
    }


    return (
        <>
            <ul>
                {list.map((l, i) => {
                    return (<li key={i}>
                        <label>
                            <input type="checkbox" checked={l.isCompleted} onChange={() => handleListChange(i)} />
                            <span>{l.title}</span>
                        </label>
                    </li>)
                })}

            </ul>
        </>
    )
}