import { Router } from 'express'
import bodyParser from 'body-parser'

import { 
    getTodos, 
    getTodo, 
    insertTodo, 
    updateTodo, 
    deleteTodo 
} from '../controller/todos'

const router = Router()
const jsonParser = bodyParser.json()

router.get('/api/v1/todos', getTodos)
router.get('/api/v1/todo/:id', getTodo)
router.post('/api/v1/todo/create', jsonParser, insertTodo)
router.put('/api/v1/todo/edit/:id', jsonParser, updateTodo)
router.delete('/api/v1/todo/destroy/:id', jsonParser, deleteTodo)

export default router