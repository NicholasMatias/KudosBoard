import './Search.css'

function Search({setSearch}){

    const setSearchQuery = (e) =>{
        setSearch(e.target.value)
    }

    // creates the search bar using input tag. The search inquiry is passed up to parent so that it can be used in the api call.

    return (
        <div className='search_container'>
            <input id="search_bar" type='search' onChange={setSearchQuery} placeholder='Search boards...' >

            </input>

        </div>
    )
}

export default Search