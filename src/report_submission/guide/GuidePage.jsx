import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../helpers/firebase"
import './GuidePage.css';

export default function GuidePage () {
    let [ submissions, setSubmissions ] = useState([])
    
    useEffect(() => {
        async function getData () {
            let colRef = collection(db, "submissions")
            let docs = await getDocs(colRef)
            let submissions = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            setSubmissions(submissions)
        }

        getData()
    }, [])

    return (
        <div className="guide-contaianer pt-10 min-h-[calc(100vh-64px-56px)]" style={{backgroundImage: "linear-gradient(to bottom, var(--chakra-colors-blue-100), var(--chakra-colors-purple-100))"}}>
            <h1 className="guide-heading">Submissions</h1>
            <div className="submissions-list">
                {
                    submissions.map(submission => (
                        <div key={submission.id} className="submission-wrapper">
                            <a href={`/report/guide/${submission.id}`} className="submission-item">{submission.id}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}