export default function News(props: any){
    function formatTimestamp(timestamp: number, timezone?: string): string {
        const date = new Date(timestamp * 1000); // convert seconds → milliseconds

        return date.toLocaleString("en-US", {
            timeZone: timezone, // e.g. "America/Los_Angeles"
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }
    return(
        <>
            <div className="news-card">
                <div className="title">
                    <a href={props.url}>{props.title}</a>
                </div>
                <div className="sub-title">
                    {props.by} | {formatTimestamp(props.time)}
                </div>
            </div>
        </>
    )
}