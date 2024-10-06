import { useAdminContext } from "../context/AdminContext"
import StudentPage from "./student/StudentPage"
import GuidePage from "./guide/GuidePage"

export default function ReportSubmissionPage () {
    let { adminUser, setAdminUser } = useAdminContext()

    return (
        adminUser == "student" ?
        <StudentPage />
        :
        <GuidePage />
    )
}