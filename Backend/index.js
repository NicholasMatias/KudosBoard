const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const cors = require('cors')
app.use(cors())

app.use(express.json())



const PORT = process.env.PORT || 3000

/*
    This will return the kudo board by id.
*/


app.get('/KudoCards/:id', async (req, res) => {
    const kudoCardID = parseInt(req.params.id)
    const thisBoard = await prisma.KudoCard_boards.findUnique({
        where:
            {id : kudoCardID}
        })

    if(thisBoard){
        res.json(thisBoard)
    }
    else{
        res.status(404).send("404 Error")
    }
})

/*
    This will return the cards that match the kudo board with the id passed in. 
*/

app.get('/KudoCards/Cards/:id', async(req,res)=>{
    const board = parseInt(req.params.id)
    const thisBoard = await prisma.KudoCard_boards.findUnique({
        where:{
            id: board
        },
        include:{boardCards: true}
    })
    res.json(thisBoard.boardCards)
})

/*
    This is how the user will be able to search. Search works by looking for matching titles
    with the kudo boards. 
*/


app.get('/KudoCards/search/:search', async(req,res)=>{
    try{
        const searchQuery = req.params.search
        const board = await prisma.KudoCard_boards.findMany({
            where:{
                title:{
                    startsWith: searchQuery, mode: 'insensitive'
                },
            },
        })
        res.status(200).json(board)
    }
    catch{

    }
})

/*
    Allows the user to filter the boards by category, most recent, and all. 
*/



app.get('/KudoCards', async (req,res) => {
    
    
    const {category} = req.query

    try{
        let KudoCards
        
        if (category && category !== 'All' ){
            if (category ==="Recent"){
                KudoCards = await prisma.KudoCard_boards.findMany({
                    orderBy: { id : 'desc'}
                })
            }
            else {
                KudoCards = await prisma.KudoCard_boards.findMany({
                    where: {category: category}
                })
            }
            
        }
        else{
            
                KudoCards = await prisma.KudoCard_boards.findMany()
            
            

        }
        res.json(KudoCards)
    }
    catch(error){
        console.log(error)
        res.status(500).send("There was error during filtering:",error)
    }

})

/*
    Allows the user to make a new board. Uses giphy to randomly generate a gif for the board created. 
*/


app.post('/KudoCards', async (req, res) => {
    const { title, category,author } = req.body

    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API}`)
    const gifData = await response.json()
    const imgSrc = gifData.data.images.downsized.url

    const newBoard = await prisma.KudoCard_boards.create({
        data: {
            title,
            imgSrc: imgSrc,
            category,
            author
        }
    })
    res.json(newBoard)
})

/*
    Allows the user to create a new card for a specific board. The board is determined by the id. 
*/


app.post('/KudoCards/Cards/:id', async (req, res) => {
    const board = parseInt(req.params.id)
    const thisBoard = await prisma.KudoCard_boards.findUnique({
        where:{
            id: board
        },
        include:{boardCards: true}
    })
    const {cardTitle,cardAuthor,cardImg,cardInfo} = req.body
    const newCard = await prisma.Card.create({
        data:{
            cardTitle,
            cardAuthor,
            cardImg,
            cardInfo,
            kudoCard_boardsId: board
        }
    })
    res.json(newCard)
})


/*
    Allows the user to delete a card by using the card id. 
*/


app.delete('/KudoCards/Cards/:id', async (req, res) => {
    try{
        const cardId = parseInt(req.params.id)

        const deleteCard = await prisma.Card.delete({
            where: {id: cardId}
        })
        res.status(200).json(deleteCard)
    }
    catch(error){
        console.log("Error deleting cards:", error)
    }
    
})

/*
    Allows the user to delete a board by using the board id
*/


app.delete('/KudoCards/:id', async (req, res) => {
    try{
        const { id } = req.params
        const deletedBoard = await prisma.KudoCard_boards.delete({
        where: { id: parseInt(id) }
    })
    res.status(200).json(deletedBoard)
    }
    catch(error){
        console.log("Error deleting board:",error)
        res.status(500).json({error: 'Failed to delete board.'})
    }
    
})


/*
    Uses patch to update the like count for a card. Card id is needed to detmermine which card like count to increment. 
*/

app.patch('/KudoCards/Cards/:id', async(req,res) =>{
    try{
        const cardId = parseInt(req.params.id)

        const updateCard = await prisma.Card.update({
            where: {id: cardId},
            data:{
                likes:{
                    increment:1
                }
            }
        })
        res.status(200).json(updateCard)
    } 
    catch(error){
        console.error("Error updating card like count:", error)
        res.status(500).json({error:'Error while incrementing likes.'})
    }
}) 




const server = app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})