const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list"); // toDoForm 안에 있는 input

let TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) { // event.target.parentElement.innerText => <li>안에 있는 <span>, <button>의 text 모두 출력
    const li = event.target.parentElement; // event가 발생한 element("button")의 부모("li") (span은 형제임) (event.target까지만 하면 버튼만 삭제됨)
    li.remove(); // element를 HTML에서 삭제
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); // 삭제 버튼을 누른 거에 해당되는 <li>와 같은 id를 가진 toDos의 element(object)를 삭제하고 toDos update
    saveToDos(); // localStorage update
} // li.id -> string / toDo.id -> number => li.id를 number로 변경하여 비교

function paintToDo(newTodo) { // text, id로 이루어진 object를 받음
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.className = "button-name";
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    
    const newTodoObj = { // 삭제되는 <li>를 파악하기 위해 array와 li에 동일한 id를 부여
        text: newTodo,
        id: Date.now()
    }

    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos) { // localStorage에 "todos" key가 존재한다면
    const parsedToDos = JSON.parse(savedToDos); // 저장된 문자열 array를 활용할 수 있는 배열로 변경하여 가져옴
    toDos = parsedToDos; // toDos가 비어있는 채(line 7)로 handleToDoSubmit(list 추가)이 실행되면 toDos를 덮어쓰게 되므로 이전에 localStorage에 존재하던 data를 toDos에 저장해둠
    parsedToDos.forEach(paintToDo); // parsedToDos array의 각 element들이 newTodo(parameter)가 되어 함수 실행
}