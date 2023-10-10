import express, {Response,Request}  from 'express'
const app = express()
const port = 3000

app.get('/', (req:Request, res:Response) => {
    let hw = 'w';
    res.send(hw)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})