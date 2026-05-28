import { useEffect, useMemo, useState } from "react";
import "./App.css";

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
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => {
            const project = projects.find(
              (item) => item.id === task.projectId
            );

            return (
              <article
                key={task.id}
                className={`task-card ${task.done ? "done" : ""}`}
              >
                <div className="task-main">
                  <div className="task-badge">{project?.emoji}</div>

                  <div>
                    <p className="task-meta">
                      {task.day} · {task.time} · {task.type}
                    </p>
                    <h3>{task.title}</h3>
                    <p>{task.note}</p>
                  </div>
                </div>

                <div className="task-actions">
                  <button onClick={() => setEditingTask(task)}>
                    Edit
                  </button>
                  <button onClick={() => toggleTask(task.id)}>
                    {task.done ? "Done" : "Mark Done"}
                  </button>

                  <button className="danger-button" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop">
          <form className="move-modal" onSubmit={addMove}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">New Move</p>
                <h2>Add to this week</h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <label>
              Project
              <select
                name="projectId"
                value={newMove.projectId}
                onChange={handleChange}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.emoji} {project.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-row">
              <label>
                Day
                <select name="day" value={newMove.day} onChange={handleChange}>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </label>

              <label>
                Time
                <input
                  name="time"
                  value={newMove.time}
                  onChange={handleChange}
                  placeholder="7:17 PM"
                />
              </label>
            </div>

            <label>
              Type
              <input
                name="type"
                value={newMove.type}
                onChange={handleChange}
                placeholder="Instagram, Threads, Task..."
              />
            </label>

            <label>
              Title
              <input
                name="title"
                value={newMove.title}
                onChange={handleChange}
                placeholder="Post product carousel"
              />
            </label>

            <label>
              Note
              <textarea
                name="note"
                value={newMove.note}
                onChange={handleChange}
                placeholder="Keep it funny, light, and non-pushy."
              />
            </label>

            <button className="submit-button" type="submit">
              Add Move
            </button>
          </form>
        </div>
      )}

      {isGeneratorOpen && (
        <div className="modal-backdrop">
          <div className="move-modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Planweiser AI</p>
                <h2>Generate This Week</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setIsGeneratorOpen(false)}
              >
                ×
              </button>
            </div>

            <label>
              Energy
              <select
                value={generatorSettings.energy}
                onChange={(e) =>
                  setGeneratorSettings((current) => ({
                    ...current,
                    energy: e.target.value,
                  }))
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              Focus
              <select
                value={generatorSettings.focus}
                onChange={(e) =>
                  setGeneratorSettings((current) => ({
                    ...current,
                    focus: e.target.value,
                  }))
                }
              >
                <option value="all">All</option>
                <option value="etsy">Etsy</option>
                <option value="music">Music</option>
                <option value="personal">Personal</option>
              </select>
            </label>

            <label>
              Goal
              <select
                value={generatorSettings.goal}
                onChange={(e) =>
                  setGeneratorSettings((current) => ({
                    ...current,
                    goal: e.target.value,
                  }))
                }
              >
                <option value="engagement">Engagement</option>
                <option value="sales">Sales</option>
                <option value="consistency">Consistency</option>
                <option value="release">Release Push</option>
              </select>
            </label>

            <label>
              Tone
              <select
                value={generatorSettings.tone}
                onChange={(e) =>
                  setGeneratorSettings((current) => ({
                    ...current,
                    tone: e.target.value,
                  }))
                }
              >
                <option value="funny">Funny</option>
                <option value="motivational">Motivational</option>
                <option value="direct">Direct</option>
                <option value="nonsalesy">Non-salesy</option>
              </select>
            </label>

            <button
              className="submit-button"
              onClick={generateWeek}
            >
              ⚡ Generate Week
            </button>
          </div>
        </div>
      )}

      {editingTask && (
        <div className="modal-backdrop">
          <form
            className="move-modal"
            onSubmit={(e) => {
              e.preventDefault();
              saveEditedTask(editingTask);
            }}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Edit Move</p>
                <h2>{editingTask.title}</h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() => setEditingTask(null)}
              >
                ×
              </button>
            </div>

            <label>
              Title
              <input
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
              />
            </label>

            <label>
              Note
              <textarea
                value={editingTask.note}
                onChange={(e) =>
                  setEditingTask((current) => ({
                    ...current,
                    note: e.target.value,
                  }))
                }
              />
            </label>

            <label>
              Time
              <input
                value={editingTask.time}
                onChange={(e) =>
                  setEditingTask((current) => ({
                    ...current,
                    time: e.target.value,
                  }))
                }
              />
            </label>

            <button className="submit-button">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default App;