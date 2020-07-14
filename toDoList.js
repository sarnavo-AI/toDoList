$(document).ready(function() {
    const toDoContainer = document.querySelector('.todo-container');
    const addTaskContainer = document.querySelector('.add-task-container');
    const emptyList = document.querySelector('.empty-list');
    const todoList = document.querySelector('.todo-list');
    const inputField = document.querySelector('#inputText');

    const newTaskBtn = document.querySelector('.NewTask');
    const closeAddBtn = document.querySelector('.closeAddTask');
    const addTaskBtn = document.querySelector('.add');

    let paraCount = 0, closeCount = 0;

    newTaskBtn.addEventListener('click', () => {
        toggleDiv();
    })

    closeAddBtn.addEventListener('click', () => {
        toggleDiv();
        inputField.value = '';
    })

    addTaskBtn.addEventListener('click', () => {

        let para = document.createElement('p');
        para.classList.add('para-style');
        para.setAttribute('draggable', 'true');
        if(inputField.value == "") {
            window.alert('Please enter a task, the input in empty')
        } else {
            let text = document.createTextNode(inputField.value);
            para.appendChild(text);
            inputField.value = '';

            paraCount++;

            todoList.classList.remove('invisible');
            emptyList.classList.add('display');
            todoList.classList.remove('display');

            let closeSpan = document.createElement('span');
            closeSpan.innerHTML = '&times;'; //('<i class="fa fa-trah-o" aria-hidden="true"></i>');
            closeSpan.classList.add('close');
            para.appendChild(closeSpan);
 
            todoList.appendChild(para);

            let paraAll = document.querySelectorAll('.para-style');

            paraAll.forEach(val => {
                val.addEventListener('dragstart', () => {
                    val.classList.add('dragging');
                })
            })

            paraAll.forEach(val => {
                val.addEventListener('dragend', () => {
                    val.classList.remove('dragging');
                })
            })

            let close = document.querySelectorAll('.close');

            close.forEach(val => {
                val.onclick = function() {
                    let para = this.parentElement;
                    para.style.opacity = 0;
                    closeCount++;
                    setTimeout(() => {
                        para.style.display = 'none';
                    }, 500)

                    if(closeCount === paraCount) {
                        todoList.classList.add('invisible');
                        setTimeout(() => {
                            emptyList.classList.remove('display');
                            todoList.classList.add('display');
                        }, 200)

                        closeCount = 0;
                        paraCount = 0;
                    }
                }
            })

            toggleDiv();
        }
    })


    todoList.addEventListener('click', event => {
        if(event.target.tagName === 'P') {
            event.target.classList.toggle('checked');
        }
    })    

    function toggleDiv() {
        toDoContainer.classList.toggle('invisible');
        addTaskContainer.classList.toggle('invisible');
        addTaskContainer.classList.toggle('scale');
    }

    todoList.addEventListener('dragover', event => {
        event.preventDefault();
        let afterElement = getAfterElement(todoList, event.y);
        let draggingPara = document.querySelector('.dragging');
        if(afterElement != null) {
            todoList.insertBefore(draggingPara, afterElement);
        } else {
            todoList.appendChild(draggingPara);
        }
    })

    function getAfterElement(todoList, y) {
        const dragrableElement = [...todoList.querySelectorAll('.para-style:not(dragging)')]
    
        return dragrableElement.reduce((closet, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2;
    
            if(offset < 0 && offset > closet.offset) {
                return {offset: offset, element: child}
            } else {
                return closet
            }
        }, { offset: Number.NEGATIVE_INFINITY}).element
    };

})

