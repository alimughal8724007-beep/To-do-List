  //theme mode button
// id search krky usme condition lgy gi
const themeBtn = document.getElementById("themeBtn");

// theme value save
const savedTheme=localStorage.getItem("theme");
if(savedTheme==="dark"){
  document.body.classList.add("dark");
  // change value
  themeBtn.innerHTML = "&#127774";
}
//theme event click
themeBtn.addEventListener("click",function(){
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme","dark");

    themeBtn.innerHTML="&#127774";
  }
  else{
    localStorage.setItem("theme","light");
     
     themeBtn.innerHTML="&#127770";
  }
})
//addtask list clickbtn task list
const taskInput = document.getElementById("taskInput");
const addbtn = document.getElementById("addbtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const progressBar = document.getElementById("progressBar");

function addTask() {
  const value = taskInput.value.trim();
  if (value === "") return;

  // har task ka apna alag border
  const li = document.createElement("li");
  li.className = "flex items-center gap-3 p-3 border-2 rounded-xl";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "w-5 h-5";

  const text = document.createElement("span");
  text.textContent = value;
  text.className = "flex-1";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";

  // tick karne par
  checkbox.addEventListener("change", function () {
    text.classList.toggle("line-through", checkbox.checked);
    updateTaskCount();
    updateProgressBar();
  });

  // edit
  editBtn.addEventListener("click", function () {
    const newText = prompt("Edit task:", text.textContent);
    if (newText && newText.trim()) {
      text.textContent = newText.trim();
    }
  });

  // delete
  delBtn.addEventListener("click", function () {
    li.remove();
    updateTaskCount();
    updateProgressBar();
  });

  li.append(checkbox, text, editBtn, delBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  updateTaskCount();
  updateProgressBar();
}

function updateTaskCount() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll("input[type=checkbox]:checked").length;
  taskCount.textContent = done + "/" + total;
}

function updateProgressBar() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll("input[type=checkbox]:checked").length;
  progressBar.style.width = total ? (done / total) * 100 + "%" : "0%";
}

addbtn.addEventListener("click", addTask);