const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async(req, res)=>{
    const documentaries = await prisma.documentary.findMany()
    res.json(documentaries)
})


router.post('/', async (req,res)=>{
    const {title, imgSrc, category} = req.body
    const newDocumentary = await prisma.documentary.create({
        data: {
            title,
            imgSrc,
            category
        }
    })
    res.json(newDocumentary)
})

router.put('/:id', async (req,res)=>{
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


router.delete('/:id', async (req,res) => {
    const {id} = req.params
    const deletedDocumentary = await prisma.documentary.delete({
        where: {id: parseInt(id)}
    })
})

module.exports = router