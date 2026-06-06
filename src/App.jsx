import { useEffect, useMemo, useState } from "react";
import { templates } from "./data/templates";
import "./App.css";

// components
import TaskCard from "./components/TaskCard";
import GeneratorModal from "./components/GeneratorModal";
import AddMoveModal from "./components/AddMoveModal";
import EditTaskModal from "./components/EditTaskModal";
import ArchiveSection from "./components/ArchiveSection";
import InsightsPanel from "./components/InsightsPanel";
import TemplateLibrary from "./components/TemplateLibrary";
import StyleProfile from "./components/StyleProfile";
import ProjectManager from "./components/ProjectManager";
import WinningContentPanel from "./components/WinningContentPanel";

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



function getProjectEmoji(name = "") {
  const lower = name.toLowerCase();

  if (
    lower.includes("zombie") ||
    lower.includes("apocalypse") ||
    lower.includes("tza")
  ) {
    return "🧟";
  }

  if (
    lower.includes("geek") ||
    lower.includes("garment") ||
    lower.includes("cat")
  ) {
    return "🐾";
  }

  if (
    lower.includes("fruit") ||
    lower.includes("garden") ||
    lower.includes("plant")
  ) {
    return "🌱";
  }

  if (
    lower.includes("music") ||
    lower.includes("band") ||
    lower.includes("song")
  ) {
    return "🎵";
  }

  if (lower.includes("personal")) return "✨";
  if (lower.includes("r'to") || lower.includes("arto")) return "🎛️";

  return "📁";
}

function App() {
  const [activeProject, setActiveProject] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMove, setNewMove] = useState(emptyMove);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activePlatform, setActivePlatform] = useState("all");

  const [selectedTemplate, setSelectedTemplate] = useState("lowEnergy");

  const [generatorSettings, setGeneratorSettings] = useState({
    energy: "medium",
    focus: "all",
    goal: "engagement",
    tone: "funny",
  });

  const [newTemplateName, setNewTemplateName] = useState("");

  const [styleProfile, setStyleProfile] = useState(() => {
    const saved = localStorage.getItem("planweiser-style-profile");

    return saved
      ? JSON.parse(saved)
      : {
        tone:
          "funny, quirky, witty, light motivation, slightly unhinged",
        mustInclude: "Geek-E Garments, TZA, personal creativity",
        avoid: "salesy, cryptic, burnout vibes, overexplaining",
        goal: "consistency and growth",
      };
  });

  const [generatorNotes, setGeneratorNotes] = useState(() => {
    const saved = localStorage.getItem("planweiser-generator-notes");

    return saved
      ? JSON.parse(saved)
      : {
        customDirection:
          "funny, quirky, witty, light motivation, slightly unhinged",
        mustInclude: "Geek-E Garments, TZA, personal creativity",
        avoid: "salesy, cryptic, burnout vibes, overexplaining",
      };
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("planweiser-tasks");
    return saved ? JSON.parse(saved) : starterTasks;
  });

  const [archives, setArchives] = useState(() => {
    const saved = localStorage.getItem("planweiser-archives");
    return saved ? JSON.parse(saved) : [];
  });

  const [customTemplates, setCustomTemplates] = useState(() => {
    const saved = localStorage.getItem("planweiser-custom-templates");
    return saved ? JSON.parse(saved) : [];
  });

  const [contentProjects, setContentProjects] = useState(() => {
    const saved = localStorage.getItem("planweiser-content-projects");

    return saved
      ? JSON.parse(saved)
      : [
        {
          id: Date.now(),
          name: "Thee Zombie Apocalypse",
          tone: "funny, heavy, witty, direct",
          notes: "Promote songs and build audience.",
          platforms: [
            {
              id: 1,
              platform: "Instagram",
              frequency: 3,
            },
            {
              id: 2,
              platform: "Threads",
              frequency: 7,
            },
          ],
        },
      ];
  });

  const [newProject, setNewProject] = useState({
    name: "",
    tone: "",
    notes: "",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesProject =
        activeProject === "all" || task.projectId === activeProject;

      const matchesPlatform =
        activePlatform === "all" || task.type === activePlatform;

      return matchesProject && matchesPlatform;
    });
  }, [activeProject, activePlatform, tasks]);

  const availablePlatforms = useMemo(() => {
    const platforms = tasks.map((task) => task.type).filter(Boolean);
    return ["all", ...new Set(platforms)];
  }, [tasks]);

  const completed = tasks.filter((task) => task.done).length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const momentumScore = tasks.reduce((total, task) => {
    if (!task.done) return total;

    switch (task.type.toLowerCase()) {
      case "instagram":
        return total + 10;
      case "threads":
        return total + 5;
      case "instagram reel":
        return total + 15;
      case "task":
        return total + 3;
      default:
        return total + 5;
    }
  }, 0);


  useEffect(() => {
    localStorage.setItem("planweiser-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("planweiser-archives", JSON.stringify(archives));
  }, [archives]);

  useEffect(() => {
    localStorage.setItem(
      "planweiser-generator-notes",
      JSON.stringify(generatorNotes)
    );
  }, [generatorNotes]);

  useEffect(() => {
    localStorage.setItem(
      "planweiser-custom-templates",
      JSON.stringify(customTemplates)
    );
  }, [customTemplates]);

  useEffect(() => {
    localStorage.setItem(
      "planweiser-style-profile",
      JSON.stringify(styleProfile)
    );
  }, [styleProfile]);

  useEffect(() => {
    setGeneratorNotes((current) => ({
      ...current,
      customDirection: styleProfile.tone,
      mustInclude: styleProfile.mustInclude,
      avoid: styleProfile.avoid,
    }));
  }, [styleProfile]);

  useEffect(() => {
    localStorage.setItem(
      "planweiser-content-projects",
      JSON.stringify(contentProjects)
    );
  }, [contentProjects]);

  useEffect(() => {
    const today = new Date();

    setTasks((current) =>
      current.map((task) => {
        if (
          task.status !== "Posted" ||
          !task.postedDate
        ) {
          return task;
        }

        const postedDate = new Date(task.postedDate);

        const diffDays = Math.floor(
          (today - postedDate) /
          (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 7) {
          return {
            ...task,
            status: "Review Needed",
          };
        }

        return task;
      })
    );
  }, []);



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

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function saveCurrentAsTemplate() {
    if (!newTemplateName.trim()) return;

    const template = {
      id: Date.now(),
      name: newTemplateName,
      tasks: tasks.map((task) => ({
        projectId: task.projectId,
        day: task.day,
        time: task.time,
        title: task.title,
        type: task.type,
        note: task.note,
      })),
    };

    setCustomTemplates((current) => [template, ...current]);
    setNewTemplateName("");
  }

  function loadTemplate(template) {
    const loadedTasks = template.tasks.map((task, index) => ({
      id: Date.now() + index,
      ...task,
      done: false,
    }));

    setTasks(loadedTasks);
  }

  function deleteTemplate(id) {
    setCustomTemplates((current) =>
      current.filter((template) => template.id !== id)
    );
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

    const contextNote = `
STYLE
${styleProfile.tone}

GOAL
${styleProfile.goal}

MUST INCLUDE
${styleProfile.mustInclude}

AVOID
${styleProfile.avoid}

CUSTOM DIRECTION
${generatorNotes.customDirection}
`;

    const generated = selected.tasks.map((task, index) => ({
      id: Date.now() + index,
      ...task,
      note: `
${task.note}

${contextNote}
`.trim(),
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

  function addContentProject(event) {
    event.preventDefault();

    if (!newProject.name.trim()) return;

    const project = {
      id: Date.now(),
      name: newProject.name,
      tone: newProject.tone || styleProfile.tone,
      notes: newProject.notes,
      platforms: [],
    };



    setContentProjects((current) => [project, ...current]);

    setNewProject({
      name: "",
      tone: "",
      notes: "",
    });
  }

  function getIdeaFromPurpose(platform) {
    const purposes = platform.purposes || [];

    if (purposes.includes("Sales")) {
      return "Show the product or offer in a casual, non-pushy way.";
    }

    if (purposes.includes("Engagement")) {
      return "Ask a relatable question or start a quick conversation.";
    }

    if (purposes.includes("Community")) {
      return "Invite people to share their own experience or opinion.";
    }

    if (purposes.includes("Brand Building")) {
      return "Share a behind-the-scenes or personality-driven moment.";
    }

    if (purposes.includes("Education")) {
      return "Teach one small useful thing related to this project.";
    }

    if (purposes.includes("Traffic")) {
      return "Point people toward a link, post, video, or product page.";
    }

    return "Share a simple update that keeps momentum going.";
  }

function getCaptionDraft(project, platform, slot = "") {
  const purposes = platform.purposes || [];
  const platformName = platform.platform;
  const tone = project.tone || "";
  const notes = project.notes || "";

  if (platformName === "Threads") {
    if (purposes.includes("Engagement")) {
      return "I told myself I'd stop starting new projects.\n\nAnyway here's project #47,873,839,007.";
    }

    if (purposes.includes("Community")) {
      return "What’s something you’re working on right now that started as “just a quick idea” and became a whole thing?";
    }

    if (purposes.includes("Brand Building")) {
      return `Slowly building ${project.name} one tiny chaotic decision at a time.`;
    }

    return "Small update: still building, still learning, still somehow adding more to the list.";
  }

  if (platformName === "Instagram") {
    if (purposes.includes("Sales")) {
      return "Made this one for the people who get it.\n\nLight nudge: it’s up now if you want to check it out.";
    }

    if (purposes.includes("Brand Building")) {
      return `A little behind-the-scenes look at what I’m building with ${project.name}.`;
    }

    if (purposes.includes("Engagement")) {
      return "Quick question: which one would you pick?";
    }

    return "A quick snapshot from the week.";
  }

  if (platformName === "YouTube") {
    return `New video idea for ${project.name}: a quick look behind the scenes and what went into making this.`;
  }

  if (platformName === "TikTok") {
    return "Quick little behind-the-scenes moment because apparently everything is content now.";
  }

  if (platformName === "Facebook") {
    return `Sharing a quick update from ${project.name}. More soon.`;
  }

  return "Small progress update. Nothing fancy, just keeping the momentum going.";
}

  function generateCalendarFromProjects() {
    const dayMap = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday",
    };

    const slotTimes = {
      Morning: "9:00 AM",
      Afternoon: "12:30 PM",
      Night: "7:17 PM",
    };

    const generatedTasks = [];

    contentProjects.forEach((project) => {
      project.platforms.forEach((platform) => {
        const selectedDays =
          platform.days?.length > 0
            ? platform.days
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        if (platform.cadence === "daily") {
          const slots =
            platform.timeSlots?.length > 0
              ? platform.timeSlots
              : ["Morning"];

          selectedDays.forEach((day) => {
            slots.forEach((slot) => {
              generatedTasks.push({
                id: Date.now() + generatedTasks.length,

                projectId: project.id,

                day: dayMap[day],

                time: slotTimes[slot] || "Flexible",

                title: `${platform.platform} • ${slot}`,

                type: platform.platform,

                suggestedDate: new Date().toISOString().split("T")[0],

                generatorContext: {
                  project: project.name,
                  tone: project.tone,
                  platform: platform.platform,
                  purposes: platform.purposes || [],
                  notes: project.notes,
                },

                note: `
                
Purpose:
${(platform.purposes || []).join(", ")}

Tone:
${project.tone}

Notes:
${project.notes}
`.trim(),

                idea: getIdeaFromPurpose(platform),
                captionDraft: getCaptionDraft(project, platform, slot),
                finalCaption: "",
                status: "Drafted",

                done: false,
              });
            });
          });
        } else {
          const weeklyDays = selectedDays.slice(
            0,
            platform.frequency || 1
          );

          weeklyDays.forEach((day) => {
            generatedTasks.push({
              id: Date.now() + generatedTasks.length,

              projectId: project.id,

              day: dayMap[day],

              time: "Flexible",

              title: `${platform.platform} Content`,

              type: platform.platform,

              note: `
Purpose:
${(platform.purposes || []).join(", ")}

Tone:
${project.tone}

Notes:
${project.notes}
`.trim(),

              idea: getIdeaFromPurpose(platform),
              captionDraft: getCaptionDraft(project, platform),
              finalCaption: "",
              status: "Drafted",

              done: false,
            });
          });
        }
      });
    });

    setTasks((current) => [
      ...generatedTasks,
      ...current,
    ]);
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

          <hr />

          <div className="momentum-block">
            <span>Momentum</span>
            <strong>{momentumScore}</strong>
          </div>
        </div>
      </section>

      <section>
        <div>
          <StyleProfile
            styleProfile={styleProfile}
            setStyleProfile={setStyleProfile}
          />
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

        {contentProjects.map((project) => (
          <button
            key={project.id}
            className={`project-card ${activeProject === project.id
              ? "active"
              : ""
              }`}
            onClick={() =>
              setActiveProject(project.id)
            }
          >
            <span>{getProjectEmoji(project.name)}</span>

            <h3>{project.name}</h3>

            <p>
              {project.platforms?.length || 0}
              {" "}
              platforms
            </p>
          </button>
        ))}
      </section>

      <section className="platform-filter">
        {availablePlatforms.map((platform) => (
          <button
            key={platform}
            className={`platform-filter-button ${activePlatform === platform ? "active" : ""
              }`}
            onClick={() => setActivePlatform(platform)}
          >
            {platform === "all" ? "All Platforms" : platform}
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
              onClick={generateCalendarFromProjects}
            >
              ⚡ Generate Calendar
            </button>

            <button
              className="ghost-button"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Move
            </button>

            <button className="ghost-button" onClick={saveCurrentAsTemplate}>
              Save As Template
            </button>

            <button className="ghost-button danger-button" onClick={archiveWeek}>
              Archive Week
            </button>

            <input
              className="template-input"
              placeholder="PSPSPS Push Week"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
            />
          </div>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => {
            const project =
              contentProjects.find(
                (item) =>
                  item.id === task.projectId
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

      <ProjectManager
        contentProjects={contentProjects}
        setContentProjects={setContentProjects}
        newProject={newProject}
        setNewProject={setNewProject}
        addContentProject={addContentProject}
      />

      <TemplateLibrary
        customTemplates={customTemplates}
        loadTemplate={loadTemplate}
        deleteTemplate={deleteTemplate}
      />

      <ArchiveSection archives={archives} />

      <InsightsPanel tasks={tasks} />
      <WinningContentPanel tasks={tasks} />

      <GeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        generatorSettings={generatorSettings}
        setGeneratorSettings={setGeneratorSettings}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        generateFromTemplate={generateFromTemplate}
        generatorNotes={generatorNotes}
        setGeneratorNotes={setGeneratorNotes}
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