import './KudosCard_List.css';
import KudosCard from './KudosCard';
import Filters from './Filters';
import Search from './Search';
import NewBoard from './NewBoard';
import { useEffect, useState } from 'react';

function KudosCard_List() {
    const [filter, setQuery] = useState("All")
    const [kudosCardsList, setKudosCardsList] = useState([])
    const [search, setSearch] = useState('')



    
    const addBoard = async (newBoard) => { // makes api call to add a board 
        try{
            const response = await fetch('http://localhost:3000/KudoCards',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBoard)
            })
            const data = await response.json()
            setKudosCardsList([...kudosCardsList,...data])
        }
        catch(error){
            console.error('Error when adding a new board:', error)
        }
    }

    const handleQuery = (fChoice) => {  // sets search value, used in api call for searching the boards by title. 
        setQuery(fChoice)
    }

    const handleDelete = async (id) => { //  makes api call to delete a board. Uses the board id to determine which board is deleted. 
        try {
            await fetch(`http://localhost:3000/KudoCards/${id}`, {
                method: 'DELETE'
            })
            setKudosCardsList(kudosCardsList.filter((card) => card.id !== id))
        }
        catch (error) {
            console.error('Error when deleting board:', error)
        }
    }



    const handleSearch = (searchQuery) => { // takes the search choice and sets it using useState. Used in api call 
        setSearch(searchQuery)
    }


    useEffect(() => {
        const fetchData = async () => { // if the search variable is empty then we do the first api call. Default of filter is All (displays off the boards)
            try {
                if (search === '') {
                    const response = await fetch(`http://localhost:3000/KudoCards?category=${filter}`)
                    const data = await response.json()
                    setKudosCardsList(data)
                }
                else {  // if search is not empty, then api call is made to search the boards by title. 
                    const response = await fetch(`http://localhost:3000/KudoCards/search/${search}`)
                    const data = await response.json()
                    setKudosCardsList(data)
                }


            }
            catch (error) {
                console.error('Error fetching the boards:', error)
            }
        }
        fetchData()
    }, [filter, kudosCardsList, search])





    return (
        <>
            <Search
                setSearch={handleSearch}
            />
            <Filters setFilter={handleQuery} />
            <NewBoard 
            addBoard={addBoard}
            />
            <div className='KudosCard_list_container'>

                {(kudosCardsList ? kudosCardsList : []).map((kudo, i) => {
                    return (
                        <KudosCard key={i}
                            title={kudo.title}
                            category={kudo.category}
                            imgSrc={kudo.imgSrc}
                            boardID={kudo.id}
                            setDelete={handleDelete}
                            author={kudo.author}
                        />)

                })}



            </div>
        </>
    )
}

export default KudosCard_List;