import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import routers from './routers/index';

const app = express()
const PORT = process.env.PORT || 3000

const {
    MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_DBNAME
} = process.env

const uri = `mongodb://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@tododb-shard-00-00.nqaqw.mongodb.net:27017,tododb-shard-00-01.nqaqw.mongodb.net:27017,tododb-shard-00-02.nqaqw.mongodb.net:27017/${MONGODB_ATLAS_DBNAME}?ssl=true&replicaSet=atlas-7iq828-shard-0&authSource=admin&retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(cors())
app.use(routers)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome, Todo Apps API')
})

mongoose.set('useFindAndModify', true)

mongoose.connect(uri, options)
    .then(() => {
        app.listen(PORT, () => {
            console.info(`App is listen at http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        throw error
    })
