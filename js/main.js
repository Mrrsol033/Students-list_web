
let students = [
  { id: "0001", name: "Sim Sol", grade: "C", level: "9" },
  { id: "0002", name: "Mona Lina", grade: "B", level: "8" },
  { id: "0003", name: "Duo Mick", grade: "A", level: "10" },
]
// Render students into the table
function renderStudentTable() {
  
  let tbody = document.querySelector("#studentTable tbody")
  tbody.innerHTML = students.map(student => `
    <tr>
      <td class="p-4">${student.id}</td>
      <td class="p-4">${student.name}</td>
      <td class="p-4">${student.grade}</td>
      <td class="p-4">${student.level}</td>
    </tr>
  `).join("");
    
  renderSummary(); 
}
function renderSummary() {
  let total = students.length;
  let gradeA = students.filter(s => s.grade.toUpperCase() === "A").length;
  let gradeB = students.filter(s => s.grade.toUpperCase() === "B").length;
  let gradeC = students.filter(s => s.grade.toUpperCase() === "C").length;

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("totalA").textContent = gradeA;
  document.getElementById("totalB").textContent = gradeB;
  document.getElementById("totalC").textContent = gradeC;
}

function filterByInputGrade() {
  const input = document.getElementById("gradeSearchInput").value.trim().toUpperCase();

  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  const filtered = input === ""
    ? students
    : students.filter(s => s.grade === input);

  for (const student of filtered) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-4">${student.id}</td>
      <td class="p-4">${student.name}</td>
      <td class="p-4">${student.grade}</td>
      <td class="p-4">${student.level}</td>
    `;
    tbody.appendChild(tr);
  }
}


// Modal handler
function openModal(mode) {
  document.getElementById("modalOverlay").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = mode === "add" ? "Add Student" : "Delete Student";
  document.getElementById("addFields").style.display = mode === "add" ? "block" : "none";

  document.getElementById("modalForm").onsubmit = function (e) {
    e.preventDefault();
    let id = document.getElementById("modalId").value.trim();
    let name = document.getElementById("modalName").value.trim();
    let grade = document.getElementById("modalGrade").value.trim();
    let level = document.getElementById("modalLevel").value.trim();

    if (mode === "add") {
      let exists = students.some(student => student.id === id);
      if (exists) {
        alert("Student with this ID already exists.");
      } else {
        students.push({ id, name, grade, level });
        renderStudentTable();
      }
    } else if (mode === "delete") {
      let index = students.findIndex(student => student.id === id);
      if (index > -1) {
        students.splice(index, 1);
        renderStudentTable();
      } else {
        alert("Student not found.");
      }
    }

    closeModal();
  };
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
  document.getElementById("modalForm").reset();
}

renderStudentTable();
