const addBtn = document.getElementById("add");


const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewTask(note)
    })
}
addBtn.addEventListener("click", () => {
  addNewTask();
});

function addNewTask(text = '') {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = (`
    <div class="notes">
      <div class="tools">
        <button class="edit">
          <i class="fa-solid fa-file-pen"></i>
        </button>
        <button class="delete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <div class="main ${text ? "hidden" : ""}"></div>
      <textarea class="${text ? "" : "hidden" }"> </textarea>
    </div>
  `);

//   const notesEl = document.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener('click', () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);

}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
