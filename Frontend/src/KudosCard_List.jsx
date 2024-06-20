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


    const addBoard = async (newBoard) => {
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

    const handleQuery = (fChoice) => {
        setQuery(fChoice)
    }

    const handleDelete = async (id) => {
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


    const handleAdd = async () =>{
        
    }

    const handleSearch = (searchQuery) => {
        setSearch(searchQuery)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search === '') {
                    const response = await fetch(`http://localhost:3000/KudoCards?category=${filter}`)
                    const data = await response.json()
                    setKudosCardsList(data)
                }
                else {
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
                            cardID={kudo.id}
                            setDelete={handleDelete}
                        />)

                })}



            </div>
        </>
    )
}

export default KudosCard_List;