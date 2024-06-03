//var
const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');
let toDos = [];

const TODOS_LS = 'toDos'; //투두스_로컬스토리지

//function
function deleteToDo(event) {
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id); //모든 toDos li의 id가 같지않을 땐
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //javascript object ->string
}

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;

    delBtn.innerText = '❌';
    delBtn.classList.add('btn', 'btn-light', 'btn-sm','m-2');
    delBtn.addEventListener('click',deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event) {
    event.preventDefault();
    const currentVal = toDoInput.value;
    paintToDo(currentVal);
    toDoInput.value = '';
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos);
        parseToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit)
}

init();