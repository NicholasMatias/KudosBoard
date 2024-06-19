const express = require('express')
const app = express()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const cors = require('cors')
app.use(cors())

// app.use(express.json())

const docRoutes = require('./routes/docRoutes')
app.use('/documentaries', docRoutes)

const PORT = process.env.PORT||3000


app.get('/', (req, res) => {
    res.send(`
    <html>
        <h1>Test</h1>

    </html>
    `)
})

app.get('/KudoCards', async (req, res) => {
    const KudoCards = await prisma.KudoCard.findMany()
    res.json(KudoCards)
})


app.put('/edit/:id', async (req,res)=>{
    const {id} = req.params
    const {title, imgSrc, category}= req.body

    const updatedDocumentary = await prisma.documentary.update({
        where: { id: parseInt(id)},
        data: {
            title,
            imgSrc,
            category
        }
    })
    res.json(updatedDocumentary)
})



app.post('/add', async (req,res)=>{
    const {title, imgSrc, category} = req.body
    const newBoard = await prisma.KudoCard.create({
        data: {
            title,
            imgSrc,
            category
        }
    })
    res.json(newBoard)
})


app.delete('delete/:id', async (req,res) => {
    const {id} = req.params
    const deletedBoard = await prisma.KudoCard.delete({
        where: {id: parseInt(id)}
    })
})






const server = app.listen(PORT,()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
})