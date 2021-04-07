"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const todos_1 = require("../controller/todos");
const router = express_1.Router();
const jsonParser = body_parser_1.default.json();
router.get('/api/v1/todos', todos_1.getTodos);
router.get('/api/v1/todo/:id', todos_1.getTodo);
router.post('/api/v1/todo/create', jsonParser, todos_1.insertTodo);
router.put('/api/v1/todo/edit/:id', jsonParser, todos_1.updateTodo);
router.delete('/api/v1/todo/destroy/:id', jsonParser, todos_1.deleteTodo);
exports.default = router;
