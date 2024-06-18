const express = require('express')
const app = express()

app.use(express.json())

const PORT = process.env.PORT||3000


app.get('/', (req, res) => {
    res.send(`
    <html>
        <h1>Test</h1>

    </html>
    `)
})


const server = app.listen(PORT,()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
})