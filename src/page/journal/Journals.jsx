import { useContext, useEffect, useState } from "react"
import JournalList from "./JournalList"
import useIsMount from "../../hooks/useIsMount"
import TagSearch from "./TagSearch"
import JournalSearch from "./JournalSearch"
import { defaultSearchToken } from "../../context/defaultObjects"
import { SearchTokenContext } from "../../context/SearchTokenProvider"
import ButtonCorrect from "../../components/buttons/ButtonCorrect"
import AddJournal from "./AddJournal"
import toast from "react-hot-toast"

const displaySuccessToast = (msg) => toast.success(msg)

function Journals() {
    const {dispatchDisplay, state, dispatch, reset, setReset, setButtonSent } = useContext(SearchTokenContext)

    const [isAddJournal, setIsAddJournal] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    const [orderByArgument, setOrderByArgument] = useState("Id")
    const [isDescSort, setIsDescSort] = useState(false)
    const [isOr, setIsOr] = useState(false)

    // FOR RESET
    const isMountReset = useIsMount()

    useEffect(() => {
        if(isMountReset)
            return
        console.log("JOURNALS RESET")
        setOrderByArgument("Id")
        setIsDescSort(false)
        setIsOr(false)
    }, [reset])

    // HANDLE FUNCTIONS

    function handleSubmit(e) {
        e.preventDefault()
        const newSearchToken = 
        {
            ...state,
            orderByArgument: orderByArgument,
            isDescSort: isDescSort,
            isOr: isOr
        }
        dispatch({type: "UPDATE", value: {searchToken: newSearchToken}})
        dispatchDisplay({type: "UPDATE", value: {searchToken: newSearchToken}})
        setButtonSent(s => !s)
        displaySuccessToast("Search.")
    }

    function handleReset(){
        dispatch({type: "RESET", value: {searchToken: defaultSearchToken}})
        dispatchDisplay({type: "RESET", value: {searchToken: defaultSearchToken}})
        setReset(r => !r)
        
    }

    // DISPLAY FUNCTIONS

    function displayAddJournal(){
        if(isAddJournal)
            return <AddJournal />
        return ""
    }

    function displayAddJournalSwitch(){
        return(
        <label>
            <input 
                type="checkbox" 
                role="switch" 
                checked={isAddJournal ? "active" : ""} 
                onChange={() => setIsAddJournal(!isAddJournal)}
            />
            Add journal
        </label>
        )
    }

    function displaySearchSwitch(){
        return(
        <label>
            <input 
                type="checkbox" 
                role="switch" 
                checked={isSearch ? "active" : ""} 
                onChange={() => setIsSearch(!isSearch)}
            />
            Filter
        </label>
        )
    }

    function displaySearch(){
        if(isSearch)
            return(
            <article>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Sort by</label>
                    <select 
                        value={orderByArgument}
                        onChange={(e) => setOrderByArgument(e.target.value)}
                        name="orderBy" 
                        required
                    >
                        <option>Id</option>
                        <option>Title 1</option>
                        <option>issn1</option>
                        <option>E-issn 1</option>
                        <option>Title 2</option>
                        <option>Issn 2</option>
                        <option>E-issn 2</option>
                        <option>Points</option>
                    </select>
                    <fieldset>
                        <label>
                            Search term using or condition
                        </label>
                        <input 
                            checked={isOr} 
                            onChange={(e) => setIsOr(e.target.checked)} 
                            type="checkbox" 
                            name="isOr" 
                            role="switch"
                        />
                        Using {isOr ? <strong>or</strong> : <strong>and</strong>}
                    </fieldset>
                    <JournalSearch></JournalSearch>
                    <TagSearch/>
                    <fieldset>
                        <label>
                            Sort in descending order
                        </label>
                        <input 
                            checked={isDescSort} 
                            onChange={(e) => setIsDescSort(e.target.checked)} 
                            type="checkbox" 
                            name="isDesc" 
                            role="switch"
                        />
                        Sorting {isDescSort ? <strong>descending</strong> : <strong>ascending</strong>}
                    </fieldset>
                    <ButtonCorrect type="submit">Search</ButtonCorrect>
                    <a onClick={handleReset}>Reset your search filters here...</a>
                </form>
            </article>
        )
        return ""
    }

    // RETURN

    return (
        <div className="container">
            <hgroup>
                <h1>Journals</h1>
                <h2>Welcome! You can search for and view journals, or add a journal according to your needs.</h2>
            </hgroup>
            <hr />
            <h3>Add journal</h3>
            {displayAddJournalSwitch()}
            {displayAddJournal()}
            <br />
            <h3>Search</h3>
            {displaySearchSwitch()}
            {displaySearch()}
            <br />
            <h3>Journal List</h3>
            <JournalList></JournalList>
        </div>
    )
}

export default Journals
