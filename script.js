const cursos = [
  { id: "EGO1O4", nombre: "Matemática I", ciclo: 1 },
  { id: "EGO2O4", nombre: "Matemática II", ciclo: 2, prereq: ["EGO1O4"] },
  { id: "TUO23301", nombre: "Estadística Descriptiva", ciclo: 3 },
  { id: "TUO23401", nombre: "Estadística Inferencial", ciclo: 4, prereq: ["TUO23301"] },
  { id: "TUO23501", nombre: "Métodos Cuantitativos", ciclo: 5, prereq: ["TUO23401"] },
  { id: "TUO23601", nombre: "Investigación de Mercados Turísticos", ciclo: 6, prereq: ["TUO23501"] },
  { id: "TUO23901", nombre: "Ventas en Empresas Turísticas", ciclo: 9, prereq: ["TUO23601"] },
  { id: "TUO23101", nombre: "Gestión de Destinos Turísticos", ciclo: 10, prereq: ["TUO23901"] },
  // Puedes seguir agregando todos los cursos...
];

const estadoCursos = {};

function crearMalla() {
  const malla = document.getElementById("malla");
  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso bloqueado";
    div.id = curso.id;
    div.innerHTML = `<strong>${curso.nombre}</strong><br><small>Ciclo ${curso.ciclo}</small>`;
    div.onclick = () => toggleCurso(curso.id);
    malla.appendChild(div);
    estadoCursos[curso.id] = false;
  });
  actualizarBloqueos();
}

function toggleCurso(id) {
  const curso = cursos.find(c => c.id === id);
  const div = document.getElementById(id);

  if (div.classList.contains("bloqueado")) return;

  estadoCursos[id] = !estadoCursos[id];
  div.classList.toggle("aprobado", estadoCursos[id]);
  actualizarBloqueos();
}

function actualizarBloqueos() {
  cursos.forEach(curso => {
    const div = document.getElementById(curso.id);
    const requisitos = curso.prereq || [];

    const desbloqueado = requisitos.every(r => estadoCursos[r]);
    if (estadoCursos[curso.id]) {
      div.className = "curso aprobado";
    } else if (desbloqueado || requisitos.length === 0) {
      div.className = "curso";
    } else {
      div.className = "curso bloqueado";
    }
  });
}

crearMalla();
