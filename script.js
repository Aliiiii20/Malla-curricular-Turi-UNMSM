<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Malla Curricular - Turismo</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <h1>Malla Curricular - Administración de Turismo</h1>
  <div id="malla"></div>

  <script>
    const cursos = [
      // Ciclo 1
      { id: "LENGUAJE", nombre: "Lenguaje", ciclo: 1 },
      { id: "MEU", nombre: "MEU", ciclo: 1 },
      { id: "HISTPERU", nombre: "Historia del Perú", ciclo: 1 },
      { id: "MAT1", nombre: "Matemática I", ciclo: 1 },
      { id: "DESPERS", nombre: "Desarrollo personal", ciclo: 1 },
      { id: "ING1", nombre: "Inglés I", ciclo: 1 },

      // Ciclo 2
      { id: "INVACAD", nombre: "Investigación académica", ciclo: 2 },
      { id: "FILOET", nombre: "Filosofía y ética", ciclo: 2 },
      { id: "REALIDAD", nombre: "Realidad nacional y mundial", ciclo: 2 },
      { id: "MAT2", nombre: "Matemática II", ciclo: 2, prereq: ["MAT1"] },
      { id: "DDHH", nombre: "Derechos fundamentales y DDHH", ciclo: 2 },
      { id: "ING2", nombre: "Inglés II", ciclo: 2, prereq: ["ING1"] },

      // Ciclo 3
      { id: "ESTAD1", nombre: "Estadística descriptiva", ciclo: 3 },
      { id: "MICRO", nombre: "Microeconomía", ciclo: 3 },
      { id: "VISION", nombre: "Visión para el desarrollo", ciclo: 3, prereq: ["INVACAD"] },
      { id: "FUNDADMIN", nombre: "Fundamentos de la administración", ciclo: 3 },
      { id: "IAADM", nombre: "IA para la Administración", ciclo: 3 },
      { id: "CONTAB", nombre: "Fundamentos de la contabilidad", ciclo: 3 },
      { id: "SOSTENIBLE", nombre: "Desarrollo sostenible", ciclo: 3 },
      { id: "TURISMO", nombre: "Fundamentos del turismo", ciclo: 3 },

      // Ciclo 4
      { id: "ESTAD2", nombre: "Estadística inferencial", ciclo: 4, prereq: ["ESTAD1"] },
      { id: "MACRO", nombre: "Macroeconomía", ciclo: 4, prereq: ["MICRO"] },
      { id: "DEREEMP", nombre: "Derecho empresarial", ciclo: 4 },
      { id: "INVCIENT", nombre: "Investigación científica", ciclo: 4, prereq: ["VISION"] },
      { id: "PROADMIN", nombre: "Procesos administrativos", ciclo: 4, prereq: ["FUNDADMIN"] },
      { id: "COSTOS", nombre: "Costos y presupuestos", ciclo: 4, prereq: ["CONTAB"] },
      { id: "MATFIN", nombre: "Matemática financiera", ciclo: 4, prereq: ["MAT2"] },

      // Ciclo 5
      { id: "METCUANT", nombre: "Métodos cuantitativos", ciclo: 5, prereq: ["ESTAD2"] },
      { id: "ECOTUR", nombre: "Economía turística", ciclo: 5, prereq: ["MACRO"] },
      { id: "LEGISTUR", nombre: "Legislación turística", ciclo: 5, prereq: ["DEREEMP"] },
      { id: "TURSOST", nombre: "Turismo sostenible", ciclo: 5 },
      { id: "PLANEST", nombre: "Planificación estratégica", ciclo: 5 },
      { id: "PATRICULT", nombre: "Patrimonio cultural", ciclo: 5 },
      { id: "GEOTUR", nombre: "Geografía turística", ciclo: 5 },
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
  </script>
</body>
</html>
