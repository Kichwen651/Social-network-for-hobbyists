
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../context/TodoContext'

export default function SingleTodo() 
{

  const {id} = useParams()
  const {todos, deleteTodo} = useContext(TodoContext)

  const todo = todos && todos.find((todo)=> todo.id==id)


  return (
    <div>
      {
        !todo ? "Todo not found"
        :
      

                  <div  className='border border-blue-700 p-4 rounded-lg'>                       
                      <div className='flex items-center justify-between mb-3'>
                        <span onClick={ ()=> deleteTodo(todo.id) } className='bg-red-600 px-1  text-white hover:cursor-pointer hover:bg-red-300'>Delete</span>
                        <p className='text-right text-xs'>{todo && todo.deadline}</p> 
                      </div>   

                      <h1 className='font-semibold'>{todo && todo.title}</h1>
                      <p>{todo && todo.description}</p>

                      <div className='flex justify-between items-center mt-3'>
                        <p className='px-2 py-1 bg-blue-600 text-white'>{todo && todo.tag.name}</p>
                        <p className={`border px-2 py-1 text-white ${todo && todo.is_complete? "bg-green-700 ":"bg-yellow-400"}`}> 
                          {
                            todo && todo.is_complete? "Completed":"Not Completed"
                          }
                        </p>
                      </div>
                  </div>
        }
    </div>
  )
}
