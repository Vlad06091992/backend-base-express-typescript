import express, {Response, Request} from 'express'
import bodyParser from "body-parser";

export const app = express()
app.use(bodyParser())
const port = process.env.port || 3000

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}




const db = {
    courses: [{id: 1, title: 'front-end'}, {id: 2, title: 'back-end'}, {id: 3, title: 'automation qa'}, {
        id: 4,
        title: 'devops'
    }],
    addresses : [{id: 1, title: "Voronovda 11"}, {id: 2, title: "Karla-Marksa 89"}],
    products : [{id: 1, title: "tomato"}, {id: 2, title: "orange"}, {id: 3, title: "arbuz"}]

}


app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(db.courses)
})

app.get('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const course = db.courses.find(el => el.id === +id)
    if (course) {
        res.send(course)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.post('/courses', (req: Request, res: Response) => {
    let title = req.body.title
if(title){
    const course = {id: +new Date(), title}
    db.courses.push(course)
    res.status(HTTP_STATUSES.CREATED_201).send(course)
} else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
}
})


app.put('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const course = db.courses.find(el => el.id === +id)
    if (course) {
        course.title = req.body.title
        res.status(HTTP_STATUSES.CREATED_201).send(course)
    } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})


app.delete('/courses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.courses.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.courses.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})


app.get('/products', (req: Request, res: Response) => {
    let title = req.query.title

    if (req.query.title) {
        let searchString = req.query.title.toString()
        let filteredProducts = db.products.filter(el => el.title.indexOf(searchString) > -1)
        res.send(filteredProducts)
    } else {
        res.send(db.products)
    }
})
app.post('/products', (req: Request, res: Response) => {
    let title = req.body.title

    const product = {id: +new Date(), title}
    db.products.push(product)
    res.status(HTTP_STATUSES.CREATED_201).send(product)

})
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const product = db.products.find(el => el.id === +id)
    if (product) {
        product.title = req.body.title
        res.status(HTTP_STATUSES.CREATED_201).send(product)
    }
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
    const productTitle = req.params.productTitle
    const product = db.products.find(el => el.title === productTitle)

    if (product) {
        res.send(product)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})


app.get('/addresses', (req: Request, res: Response) => {
    const title = req.query.title
    if (title) {
        if (typeof title === "string") {
            res.send(db.addresses.filter(el => el.title.toLowerCase().indexOf(title) > -1))
        }
    }
    res.send(db.addresses)
})

app.post('/addresses', (req: Request, res: Response) => {
    console.log(req)
    const title = req.body.title
    res.send(title)
})


app.get('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const address = db.addresses.find(el => el.id === +id)
    if (address) {
        res.send(address)

    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexItem = db.addresses.findIndex(el => el.id === +id)

    if (indexItem > -1) {
        db.addresses.splice(indexItem, 1)
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete("/__test__/data",(req:Request,res:Response)=>{
    db.courses = []
    res.sendStatus(204)
})


app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})