import {app} from "./setting";

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})