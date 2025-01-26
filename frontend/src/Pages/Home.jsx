
import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'


export default function Home() {

  const {todos, deleteTodo} = useContext(TodoContext)
  const {current_user} = useContext(UserContext)


  console.log(todos);
  
  return (
    <div>
      <h1 className='my-3 text-xl font-bold'>Your Todos -{todos && todos.length}</h1>



      {
      current_user ?
         <div>
          {
            todos && todos.length < 1 &&
            <div>
              You don't have Todos
              <Link to="/addtodo">Create</Link>
            </div>

          }

           <div className='grid grid-cols-4 gap-4'>
              {
                todos && todos.map && todos.map((todo)=>(
                  <div key={todo.id} className='border border-blue-700 p-4 rounded-lg'>                       
                      <div className='flex items-center justify-between mb-3'>
                        <span onClick={ ()=> deleteTodo(todo.id) } className='bg-red-600 px-1  text-white hover:cursor-pointer hover:bg-red-300'>Delete</span>
                        <p className='text-right text-xs'>{todo.deadline}</p> 
                      </div>   

                      <Link to={`/todo/${todo.id}`} className='font-semibold'>{todo.title}</Link>

                      <div className='flex justify-between items-center mt-3'>
                        <p className='px-2 py-1 bg-blue-600 text-white'>{todo.tag.name}</p>
                        <p className={`border px-2 py-1 text-white ${todo.is_complete? "bg-green-700 ":"bg-yellow-400"}`}> 
                          {
                            todo.is_complete? "Completed":"Not Completed"
                          }
                        </p>
                      </div>
                  </div>
                ))
              }
            </div>

          </div>
          :
          <div className='text-center'>
             <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <Link to="/login" class="font-medium">Login</Link> to access this page.
              </div>
          </div>

}
    </div>
  )
}
