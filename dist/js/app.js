"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = process.env.PORT || 8080;
const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, MONGODB_ATLAS_DBNAME } = process.env;
const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@clustertodo.dxefu.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// console.log(uri);
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
mongoose_1.default.set('useFindAndModify', true);
mongoose_1.default.connect(uri, options).then(() => {
    app.listen(PORT, () => {
        console.info(`App is listen at http://localhost:${PORT}`);
    });
}).catch((error) => {
    throw error;
});
