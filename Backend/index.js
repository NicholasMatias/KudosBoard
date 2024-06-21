const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const cors = require('cors')
app.use(cors())

app.use(express.json())



const PORT = process.env.PORT || 3000

// app.get('/KudoCards', async (req, res) => {
//     const KudoCards = await prisma.KudoCard_boards.findMany()
//     res.json(KudoCards)
// })


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

// app.get('/KudoCards', async (req,res))



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






const server = app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})