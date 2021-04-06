"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.insertTodo = exports.getTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
exports.getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_1.default.find();
    res.status(200).json({ todos });
});
exports.getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield todo_1.default.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        else {
            res.status(200).json({ result });
        }
    });
});
exports.insertTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // const body : Pick<Todo, 'title' | 'status'> = req.body
    // if all or one of the required body is undefined
    if (!body.title || !body.status) {
        res.status(401).json({
            status: 401,
            message: `Validation Error: Todo validation failed. title = ${body.title}, status = ${body.status}`
        });
        return;
    }
    const newTodoModel = new todo_1.default({
        title: body.title,
        status: body.status
    });
    const newTodo = yield newTodoModel.save();
    const allTodos = yield todo_1.default.find();
    res.status(201).json({
        message: 'New Todo Created Successfully',
        todo: newTodo,
        todos: allTodos
    });
});
exports.updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body } = req;
    if (!body.title || !body.status || !id) {
        res.status(401).json({
            status: 401,
            messege: `Validation Error: _id or required body properties is not definded`
        });
        return;
    }
    const dataTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
    const allTodos = yield todo_1.default.find();
    if (!dataTodo) {
        res.status(501).json({
            status: 501,
            messege: `Edit Todo Failed, Data Not Initialized`
        });
        return;
    }
    res.status(200).json({
        messege: `Todo Data Updated Successfully`,
        dataTodo,
        todos: allTodos
    });
});
exports.deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    if (!id) {
        res.status(401).json({
            status: 401,
            messege: `Validation Error: _id is not definded`
        });
        return;
    }
    const dataTodo = yield todo_1.default.findByIdAndRemove(id);
    const allTodos = yield todo_1.default.find();
    if (!dataTodo) {
        res.status(501).json({
            status: 501,
            messege: `Destroy Todo Failed, Data Not Initialized`
        });
        return;
    }
    res.status(200).json({
        messege: `Todo Data Destroyed Successfully`,
        dataTodo,
        todos: allTodos
    });
});
