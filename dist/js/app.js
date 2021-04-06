"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME } = process.env;
const uri = `mongodb://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@tododb-shard-00-00.nqaqw.mongodb.net:27017,tododb-shard-00-01.nqaqw.mongodb.net:27017,tododb-shard-00-02.nqaqw.mongodb.net:27017/${MONGODB_ATLAS_DBNAME}?ssl=true&replicaSet=atlas-7iq828-shard-0&authSource=admin&retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
mongoose_1.default.set('useFindAndModify', true);
mongoose_1.default.connect(uri, options)
    .then(() => {
    app.listen(PORT, () => {
        console.info(`App is listen at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    throw error;
});
