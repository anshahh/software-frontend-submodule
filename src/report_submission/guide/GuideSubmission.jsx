import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../helpers/firebase"

export default function GuideSubmission () {
    let { studentID } = useParams()
    let [ submission, setSubmission ] = useState(null)
    let [ feedback, setFeedback ] = useState("")

    useEffect(() => {
        async function getData () {
            let docRef = doc(collection(db, "submissions"), studentID)
            let docSnapshot = await getDoc(docRef)
            setSubmission({ id: docSnapshot.id, ...docSnapshot.data() })
        }

        getData()
    }, [])


    async function handleSubmit () {
        if (!feedback) {
            alert("Feedback cannot be empty")
            return
        }

        let docRef = doc(collection(db, "submissions"), studentID)
        let newData = { ...submission }
        newData.feedback = feedback

        await setDoc(docRef, newData)
        alert("Feedback submitted")
        location.reload()
    }


    if (!submission) return <p>Loading...</p>

    return (
        <div className='min-h-[calc(100vh-56px-64px)] py-2 flex justify-center items-center' style={{backgroundImage: "linear-gradient(to bottom, var(--chakra-colors-blue-100), var(--chakra-colors-purple-100))"}}>
            <div className="submission-container">
                <div className="upload-time">
                    <p>Upload time: {(new Date(submission.upload_time.seconds * 1000)).toString()}</p>
                </div>
                <div className="file-links">
                    <div className="button-wrapper">
                        <a target="_blank" rel="noopener noreferrer" href={submission.ppt_link}>
                            <button className="file-button">View PPT</button>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={submission.report_link}>
                            <button className="file-button">View Report</button>
                        </a>
                    </div>
                </div>
                <div className="feedback">
                    {
                        submission.feedback ?
                        <p>Feedback: {submission.feedback}</p>
                        :
                        <div>
                            <textarea 
                                placeholder="Enter feedback..." 
                                value={feedback} 
                                onChange={e => setFeedback(e.target.value)}
                                rows={10}
                                cols={50} 
                            />
                            <br />
                            <button onClick={handleSubmit} className="small">Submit</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}