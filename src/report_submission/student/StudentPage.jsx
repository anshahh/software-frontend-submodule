import { useParams } from 'react-router-dom'
import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../helpers/firebase' // Make sure to import your Firestore db configuration
import { useEffect, useState } from 'react' // Import useEffect and useState
import UploadDocuments from './UploadDocuments'
import ViewSubmission from './ViewSubmission'

export default function StudentPage() {
	let studentID = "221IT035"

	const [submission, setSubmission] = useState(null) // State to hold submissions
	const [loading, setLoading] = useState(true) // State to handle loading
	const [error, setError] = useState(null) // State to handle errors
	useEffect(() => {
		const fetchSubmissions = async () => {
			try {
				const result = await getSubmissionByStudentId(studentID)
				setSubmission(result)
			} catch (err) {
				setError('Error fetching submissions: ' + err.message) // Handle any errors
			} finally {
				setLoading(false) // Set loading to false after fetching
			}
		}

		fetchSubmissions() // Call the fetch function
	}, [studentID]) // Effect will run when studentID changes

	// Loading and error handling
	if (loading) return <p>Loading...</p>
	if (error) return <p>{error}</p>
	
    
    return (
        submission
        ?
        <ViewSubmission submission={submission} />
        :
        <UploadDocuments studentID={studentID} />
    )
}

// Function to fetch submissions based on student ID
const getSubmissionByStudentId = async studentId => {
	const submissionsRef = collection(db, 'submissions') // Reference to the submissions collection
	const docRef = doc(submissionsRef, studentId)

	try {
		const doc = await getDoc(docRef)
		if (!doc.exists()) {
			console.log('No matching documents found.')
			return null // Return null if no document is found
		} else {
			return { id: doc.id, ...doc.data() }
		}
	} catch (error) {
		console.error('Error fetching submission: ', error)
		throw error // Throw the error to handle it in the component
	}
}