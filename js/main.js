// Sample student list
let students = [
  { id: "3252", name: "Sol", grade: "C", level: "9" },
  { id: "1234", name: "Lina", grade: "B", level: "8" },
  { id: "4567", name: "Mick", grade: "A", level: "10" },
];

// Render students into the table
function renderStudentTable() {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = students.map(student => `
    <tr>
      <td class="p-4">${student.id}</td>
      <td class="p-4">${student.name}</td>
      <td class="p-4">${student.grade}</td>
      <td class="p-4">${student.level}</td>
    </tr>
  `).join("");

  renderSummary(); // 👈 Add this
}
function renderSummary() {
  const total = students.length;
  const gradeA = students.filter(s => s.grade.toUpperCase() === "A").length;
  const gradeB = students.filter(s => s.grade.toUpperCase() === "B").length;
  const gradeC = students.filter(s => s.grade.toUpperCase() === "C").length;

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("totalA").textContent = gradeA;
  document.getElementById("totalB").textContent = gradeB;
  document.getElementById("totalC").textContent = gradeC;
}


// Modal handler
function openModal(mode) {
  document.getElementById("modalOverlay").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = mode === "add" ? "Add Student" : "Delete Student";
  document.getElementById("addFields").style.display = mode === "add" ? "block" : "none";

  document.getElementById("modalForm").onsubmit = function (e) {
    e.preventDefault();
    const id = document.getElementById("modalId").value.trim();
    const name = document.getElementById("modalName").value.trim();
    const grade = document.getElementById("modalGrade").value.trim();
    const level = document.getElementById("modalLevel").value.trim();

    if (mode === "add") {
      // Check if student with this ID already exists
      const exists = students.some(student => student.id === id);
      if (exists) {
        alert("Student with this ID already exists.");
      } else {
        students.push({ id, name, grade, level });
        renderStudentTable();
      }
    } else if (mode === "delete") {
      const index = students.findIndex(student => student.id === id);
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


// Initial render
renderStudentTable();
