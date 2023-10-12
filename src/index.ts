import express, {Response, Request} from 'express'
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser())
const port = process.env.port || 3000

const addresses = [{id: 1, title: "Voronovda 11"}, {id: 2, title: "Karla-Marksa 89"}]
const products = [{id: 1, title: "tomato"}, {id: 2, title: "orange"}, {id: 3, title: "arbuz"}]

app.get('/', (req: Request, res: Response) => {
    let hw = 'w';
    res.send(hw)
})
app.get('/products', (req: Request, res: Response) => {
    let title = req.query.title

    if (req.query.title) {
        let searchString = req.query.title.toString()
        let filteredProducts = products.filter(el => el.title.indexOf(searchString) > -1)
        res.send(filteredProducts)
    } else {
        res.send(products)
    }
})

app.post('/products', (req: Request, res: Response) => {
    let title = req.body.title

    const product = {id: +new Date(), title}
    products.push(product)
    res.status(201).send(product)

})
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const product = products.find(el => el.id === +id)
    if (product) {
        product.title = req.body.title
        res.status(201).send(product)
    }
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
    const productTitle = req.params.productTitle
    const product = products.find(el => el.title === productTitle)

    if (product) {
        res.send(product)

    } else {
        res.send(404)
    }
})


app.get('/addresses', (req: Request, res: Response) => {
    const title = req.query.title
    if (title) {
        if (typeof title === "string") {
            res.send(addresses.filter(el => el.title.toLowerCase().indexOf(title) > -1))
        }
    }
    res.send(addresses)
})

app.post('/addresses', (req: Request, res: Response) => {
    console.log(req)
    const title = req.body.title
    res.send(title)
})


app.get('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const address = addresses.find(el => el.id === +id)


    if (address) {
        res.send(address)

    } else {
        res.send(404)
    }
})

app.delete('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = addresses.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        addresses.splice(indexItem, 1)
        res.send(204)
    } else {
        res.send(404)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})