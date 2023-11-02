import { useParams } from "react-router-dom"
import NotFound from "../error/NotFound"
import Journal from "./Journal"
import { useEffect, useState } from "react"
import axios from "axios"
import { JOURNAL_DOWNLOAD_URL } from "../../global"

function ValidateJournal() {
    const params = useParams()
    const journalId = params.id
    const [journal, setJournal] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(JOURNAL_DOWNLOAD_URL(journalId))
        .then(response => {
            if(response.data !== undefined)
                setJournal(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }, [journalId])

    function display(){
        if(isLoading)
            return <>Loading...</>
        if(journal)
            return <Journal journalData={journal} />
        return <NotFound />
    }

    return display()
}

export default ValidateJournal
