import { useMemo, useState } from "react";


export default function News(){
    const [news, setNews] = useState([
        {
            id: 0,
            title: "Iran war",
            isRecent: true
        },
        {
            id: 1,
            title: "Comey Indictment",
            isRecent: false
        },
        {
            id: 2,
            title: "Inflation",
            isRecent: false
        }
    ])

    const [isRecentFilter, setIsRecentFilter] = useState(false)

    const filteredList = useMemo(() => {
        if (!isRecentFilter) return news;

        return news.filter(n => 
            n.isRecent
        )
    }, [news, isRecentFilter])

    function handleFilterChange(e: any){
       setIsRecentFilter( e.target.checked);
    }


    return(
        <>  
            <label>
                <input type="checkbox" name="show-recent" checked={isRecentFilter} onChange={(e) => handleFilterChange(e)}/>
                Show recent news
            </label>
            {filteredList.map(n => {
                return(<div className="list-item" key={n.id}>
                    {n.title}
                </div>)
            })}
        </>
    )
}