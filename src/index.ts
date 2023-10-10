import express, {Response, Request} from 'express'

const app = express()
const port = process.env.port || 3000

const addresses = [{title: "Voronovda 11"}, {title: "Karla-Marksa 89"}]
const products = [{title: "Tomato"}, {title: "Orange"}]

app.get('/', (req: Request, res: Response) => {
    let hw = 'w';
    res.send(hw)
})

app.get('/products/:productTitle', (req: Request, res: Response) => {

    const params = req.params.productTitle
    res.send(products)
})


app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})