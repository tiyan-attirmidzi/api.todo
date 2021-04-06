"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controller/todos/index");
const router = express_1.Router();
router.get('/api/v1/todos', index_1.getTodos);
router.get('/api/v1/todo/:id', index_1.getTodo);
router.post('/api/v1/todo/create', index_1.insertTodo);
router.put('/api/v1/todo/edit/:id', index_1.updateTodo);
router.delete('api/v1/todo/destroy/:id', index_1.deleteTodo);
exports.default = router;
