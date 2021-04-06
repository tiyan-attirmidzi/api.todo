import { error } from 'console'
import { Request, Response } from 'express'

import TodoModel from '../../models/todo'
import { Todo } from '../../types/todo'


export const getTodos = async (req: Request, res: Response) => {
    const todos: Todo[] =  await TodoModel.find()
    res.status(200).json({ todos })
}

export const getTodo = async (req: Request, res: Response) => {
    await TodoModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        } else {
            res.status(200).json({ result })
        }
    })
}

export const insertTodo = async (req: Request, res: Response): Promise<void> => {

    const body = req.body as Pick<Todo, 'title' | 'status'>
    // const body : Pick<Todo, 'title' | 'status'> = req.body

    // if all or one of the required body is undefined
    if (!body.title || !body.status) {
        res.status(401).json({
            status: 401,
            message: `Validation Error: Todo validation failed. title = ${body.title}, status = ${body.status}`
        })
        return
    }

    const newTodoModel: Todo = new TodoModel({
        title: body.title,
        status: body.status
    })

    const newTodo = await newTodoModel.save()
    const allTodos = await TodoModel.find()

    res.status(201).json({
        message: 'New Todo Created Successfully',
        todo: newTodo,
        todos: allTodos
    })

}

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    
    const {
        params: { id },
        body
    } = req

    if (!body.title || !body.status || !id) {
        res.status(401).json({
            status: 401,
            messege: `Validation Error: _id or required body properties is not definded`
        })
        return
    }

    const dataTodo = await TodoModel.findByIdAndUpdate({ _id : id }, body)
    const allTodos = await TodoModel.find()

    if (!dataTodo) {
        res.status(501).json({
            status: 501,
            messege: `Edit Todo Failed, Data Not Initialized`
        })
        return
    }

    res.status(200).json({
        messege: `Todo Data Updated Successfully`,
        dataTodo,
        todos: allTodos
    })

}

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {

    const {
        params: { id }
    } = req

    if (!id) {
        res.status(401).json({
            status: 401,
            messege: `Validation Error: _id is not definded`
        })
        return
    }

    const dataTodo = await TodoModel.findByIdAndRemove(id)
    const allTodos = await TodoModel.find()

    if (!dataTodo) {
        res.status(501).json({
            status: 501,
            messege: `Destroy Todo Failed, Data Not Initialized`
        })
        return
    }

    res.status(200).json({
        messege: `Todo Data Destroyed Successfully`,
        dataTodo,
        todos: allTodos
    })

}