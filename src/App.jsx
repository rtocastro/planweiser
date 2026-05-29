import { useEffect, useMemo, useState } from "react";
import { templates } from "./data/templates";
import "./App.css";

//components
import TaskCard from "./components/TaskCard";
import GeneratorModal from "./components/GeneratorModal";
import AddMoveModal from "./components/AddMoveModal";
import EditTaskModal from "./components/EditTaskModal";

const projects = [
  {
    id: "geek",
    name: "Geek-E-Garments",
    emoji: "🐾",
    vibe: "Non-pushy product visibility",
    color: "green",
  },
  {
    id: "tza",
    name: "Thee Zombie Apocalypse",
    emoji: "🧟",
    vibe: "Release hype + music momentum",
    color: "jade",
  },
  {
    id: "personal",
    name: "Personal Brand",
    emoji: "✨",
    vibe: "Funny, relatable, creative presence",
    color: "purple",
  },
];

const starterTasks = [
  {
    id: 1,
    projectId: "geek",
    day: "Monday",
    time: "9:15 AM",
    title: "Post one product-focused IG caption",
    type: "Instagram",
    note: "Keep it light, clever, and non-salesy.",
    done: false,
  },
  {
    id: 2,
    projectId: "tza",
    day: "Tuesday",
    time: "7:17 PM",
    title: "Drop one riff/meme teaser",
    type: "Threads",
    note: "Funny, heavy, direct, not too cryptic.",
    done: false,
  },
  {
    id: 3,
    projectId: "personal",
    day: "Wednesday",
    time: "12:30 PM",
    title: "Post a personal creative thought",
    type: "Threads",
    note: "Make it witty but still grounded.",
    done: false,
  },
  {
    id: 4,
    projectId: "geek",
    day: "Friday",
    time: "6:45 PM",
    title: "Review Etsy winner products",
    type: "Task",
    note: "Look for products worth repeating next week.",
    done: false,
  },
];

const emptyMove = {
  projectId: "geek",
  day: "Monday",
  time: "",
  title: "",
  type: "Task",
  note: "",
};

function App() {

  const [activeProject, setActiveProject] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMove, setNewMove] = useState(emptyMove);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [selectedTemplate, setSelectedTemplate] =
    useState("lowEnergy");

  const [generatorSettings, setGeneratorSettings] = useState({
    energy: "medium",
    focus: "all",
    goal: "engagement",
    tone: "funny",
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("planweiser-tasks");

    return saved ? JSON.parse(saved) : starterTasks;
  });

  const [archives, setArchives] = useState(() => {
    const saved = localStorage.getItem("planweiser-archives");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredTasks = useMemo(() => {
    if (activeProject === "all") return tasks;
    return tasks.filter((task) => task.projectId === activeProject);
  }, [activeProject, tasks]);

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;


  useEffect(() => {
    localStorage.setItem(
      "planweiser-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "planweiser-archives",
      JSON.stringify(archives)
    );
  }, [archives]);

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function saveEditedTask(updatedTask) {
    setTasks((current) =>
      current.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMove((current) => ({ ...current, [name]: value }));
  }

  function addMove(event) {
    event.preventDefault();

    if (!newMove.title.trim()) return;

    setTasks((current) => [
      {
        id: Date.now(),
        ...newMove,
        time: newMove.time || "Flexible",
        done: false,
      },
      ...current,
    ]);

    setNewMove(emptyMove);
    setIsModalOpen(false);
  }

  function generateWeek() {
    const generated = [];

    if (
      generatorSettings.focus === "all" ||
      generatorSettings.focus === "etsy"
    ) {
      generated.push({
        id: Date.now() + 1,
        projectId: "geek",
        day: "Monday",
        time: "9:00 AM",
        title: "Post product lifestyle photo",
        type: "Instagram",
        note:
          generatorSettings.tone === "funny"
            ? "Keep it witty and subtle."
            : "Focus on product visibility.",
        done: false,
      });
    }

    if (
      generatorSettings.focus === "all" ||
      generatorSettings.focus === "music"
    ) {
      generated.push({
        id: Date.now() + 2,
        projectId: "tza",
        day: "Wednesday",
        time: "7:17 PM",
        title: "Post riff teaser or meme edit",
        type: "Threads",
        note:
          generatorSettings.goal === "release"
            ? "Push anticipation for upcoming release."
            : "Maintain audience momentum.",
        done: false,
      });
    }

    if (
      generatorSettings.focus === "all" ||
      generatorSettings.focus === "personal"
    ) {
      generated.push({
        id: Date.now() + 3,
        projectId: "personal",
        day: "Friday",
        time: "12:00 PM",
        title: "Post personal creative thought",
        type: "Threads",
        note:
          generatorSettings.energy === "low"
            ? "Low-effort relatable post."
            : "Higher-energy engaging post.",
        done: false,
      });
    }

    setTasks((current) => [...generated, ...current]);

    setIsGeneratorOpen(false);
  }

  function generateFromTemplate() {
    const selected = templates[selectedTemplate];

    const generated = selected.tasks.map((task, index) => ({
      id: Date.now() + index,
      ...task,
      done: false,
    }));

    setTasks((current) => [...generated, ...current]);
    setIsGeneratorOpen(false);
  }

  function archiveWeek() {
    if (!tasks.length) return;

    const archive = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      completed: tasks.filter((task) => task.done).length,
      total: tasks.length,
      tasks,
    };

    setArchives((current) => [archive, ...current]);
    setTasks([]);
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Planweiser</p>
          <h1>Plan wiser. Post smoother. Burn out less.</h1>
          <p className="hero-copy">
            A fastmode creative planning dashboard for your weekly Springboard,
            Etsy pushes, music drops, and personal content rhythm.
          </p>
        </div>

        <div className="progress-card">
          <span>Weekly Progress</span>
          <strong>{progress}%</strong>
          <div className="progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completed} of {tasks.length} moves completed
          </p>
        </div>
      </section>

      <section className="project-grid">
        <button
          className={`project-card ${activeProject === "all" ? "active" : ""}`}
          onClick={() => setActiveProject("all")}
        >
          <span>🍺</span>
          <h3>All Plans</h3>
          <p>Everything in one weekly view.</p>
        </button>

        {projects.map((project) => (
          <button
            key={project.id}
            className={`project-card ${project.color} ${activeProject === project.id ? "active" : ""
              }`}
            onClick={() => setActiveProject(project.id)}
          >
            <span>{project.emoji}</span>
            <h3>{project.name}</h3>
            <p>{project.vibe}</p>
          </button>
        ))}
      </section>

      <section className="planner-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">This Week</p>
            <h2>Springboard Moves</h2>
          </div>

          <div className="header-buttons">
            <button
              className="ghost-button"
              onClick={() => setIsGeneratorOpen(true)}
            >
              ⚡ Generate Week
            </button>

            <button
              className="ghost-button"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Move
            </button>

            <button className="ghost-button danger-button" onClick={archiveWeek}>
              Archive Week
            </button>
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => {
            const project = projects.find(
              (item) => item.id === task.projectId
            );

            return (
              <TaskCard
                key={task.id}
                task={task}
                project={project}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            );
          })}
        </div>
      </section>

      {archives.length > 0 && (
        <section className="archive-section">
          <p className="eyebrow">History</p>
          <h2>Archived Weeks</h2>

          <div className="archive-list">
            {archives.slice(0, 5).map((archive) => (
              <article className="archive-card" key={archive.id}>
                <strong>{archive.date}</strong>
                <p>
                  {archive.completed} of {archive.total} moves completed
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <GeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        generatorSettings={generatorSettings}
        setGeneratorSettings={setGeneratorSettings}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        generateFromTemplate={generateFromTemplate}
      />

      <AddMoveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newMove={newMove}
        projects={projects}
        handleChange={handleChange}
        addMove={addMove}
      />

      <EditTaskModal
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        saveEditedTask={saveEditedTask}
      />
    </main>
  );
}

export default App;