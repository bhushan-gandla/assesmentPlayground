import { useEffect, useState } from "react";
import News from "../components/newsCard";


const JOB_STORIES_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOB_DETAILS_URL = (id: number) =>
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const PAGE_SIZE = 6;

export default function NewsFeed() {
    const [jobIds, setJobIds] = useState<number[]>([]);
    const [error, setError] = useState<string>("");
    const [jobs, setJobs] = useState<any[]>([]);
    const [visiblePageSize, setVisiblePageSize] = useState<number>(PAGE_SIZE);
    const [loadingIds, setLoadingIds] = useState<boolean>(true);
    const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
    // get job ids on load
    useEffect(() => {
        async function getJobIds() {
            try {
                setLoadingIds(true)
                const response = await fetch(JOB_STORIES_URL);

                if (!response.ok) {
                    throw new Error("Data is not present")
                }

                const data = await response.json();
                console.log(data)
                setJobIds(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoadingIds(false)
            }
        }
        getJobIds();
    }, []);

    useEffect(() => {
        async function getJobsData() {
            try {
                setLoadingJobs(true)
                const idsToFetch = jobIds.slice(jobs.length, visiblePageSize);

                console.log(idsToFetch)

                if (idsToFetch.length === 0) return;

                const newJobs = await Promise.all(
                    idsToFetch.map(async (id) => {
                        const response = await fetch(JOB_DETAILS_URL(id));

                        if (!response.ok) {
                            throw new Error("Error fetchind details for - " + `${id}`)
                        }

                        const data = await response.json();

                        return data;
                    })
                )

                setJobs((prev) => [...prev, ...newJobs])
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoadingJobs(false)
            }


        }

        getJobsData();
    }, [jobIds, visiblePageSize, jobs.length])

    const hasMore = visiblePageSize < jobIds.length;




    return (<>
        <section className="container">
            <h1 className="news-feed-title">Hacker rank job postings</h1>
            {loadingIds && <p>Loading job IDs...</p>}
            {error && <p>Error: {error}</p>}
            {jobs.map(j => {
                return <News title={j.title} by={j.by} time={j.time} url={j.url} ></News>
            })}

            {loadingJobs && <p>Loading jobs...</p>}


            {hasMore && (<button onClick={() => setVisiblePageSize((prev) => prev + PAGE_SIZE)}>
                Load More
            </button>)}
        </section>

    </>)
}