
import './styles.css';

import { Todo, TodoList } from "./classes/index";
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();
// console.log(todoList.todos);


/**
 * Crear lista de todos con datos almacenados 
 */

todoList.todos.forEach(todo => {
    crearTodoHtml(todo)
});


console.log('todos', todoList.todos );