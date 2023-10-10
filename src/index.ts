import express, {Response, Request} from 'express'

const app = express()
const port = process.env.port || 3000

const addresses = [{id: 1, title: "Voronovda 11"}, {id: 2, title: "Karla-Marksa 89"}]
const products = [{title: "tomato"}, {title: "orange"}]

app.get('/', (req: Request, res: Response) => {
    let hw = 'w';
    res.send(hw)
})

app.get('/products', (req: Request, res: Response) => {


    res.send(products)
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
    if(title){
        if (typeof title === "string") {
            res.send(addresses.filter(el => el.title.toLowerCase().indexOf(title) > -1))
        }
    }
    res.send(addresses)
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})