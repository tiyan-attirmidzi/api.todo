import { Router } from 'express'

import { getTodos, getTodo, insertTodo, updateTodo, deleteTodo } from '../controller/todos/index'

const router = Router()

router.get('/api/v1/todos', getTodos)
router.get('/api/v1/todo/:id', getTodo)
router.post('/api/v1/todo/create', insertTodo)
router.put('/api/v1/todo/edit/:id', updateTodo)
router.delete('api/v1/todo/destroy/:id', deleteTodo)

export default router