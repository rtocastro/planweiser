function TaskCard({ task, project, onToggle, onDelete, onEdit }) {
  return (
    <article className={`task-card ${task.done ? "done" : ""}`}>
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
        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={() => onToggle(task.id)}>
          {task.done ? "Done" : "Mark Done"}
        </button>

        <button className="danger-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;