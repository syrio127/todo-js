import { Todo } from "../classes";
import { todoList } from "../index"; //instancia de todo list creada en el index.js

//Referencias en HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado ) ? 'checked': ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    //Se crea un div donde insertar el elemento HTML
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

//Controladores de eventos
txtInput.addEventListener('keyup', (event)=>{


    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(nuevoTodo); //agrego el registro al arreglo

        crearTodoHtml( nuevoTodo );//creo el html del nuevo todo
        txtInput.value = ''; //se limpia el campo de entrada
    }
});

//Event listener para cambio de completado
divTodoList.addEventListener('click', ( event )=>{

    const nombreElemento = event.target.localName; //input, label, boton...etc

    //Para obtener la clase del elemento de lista
    const todoElemento = event.target.parentElement.parentElement; //con un parentElement llego al <div>, con dos llego al <li> que contiene el <div>
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){ //quiere decir que hizo click en el check
        todoList.marcarCompletado( todoId );
        //Se cambia la clase en html para que el texto aparezca tachado
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) { //se presionó el boton eliminar
        
        todoList.eliminarTodo( todoId ); //Esto solo elimina el registro del arreglo, no afecta el html
        divTodoList.removeChild( todoElemento );
    }

})


//Event listener para borrar los completados
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i--){

        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});


ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro){ return;}

    anchorFiltros.forEach( elem => elem.classList.remove ('selected'));
    event.target.classList.add('selected');



    for ( const elemento of divTodoList.children ){


        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed')

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden')
                }
            break;
            
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden')
                }
            break;

        }

    }

})