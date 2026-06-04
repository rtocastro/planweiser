const statusStyles = {
  Drafted: "status-drafted",
  Scheduled: "status-scheduled",
  Posted: "status-posted",
  "Review Needed": "status-review",
  Archived: "status-archived",
};

const statusEmoji = {
  Drafted: "🟡",
  Scheduled: "🔵",
  Posted: "🟢",
  "Review Needed": "🟠",
  Archived: "📦",
};

function TaskCard({ task, project, onToggle, onDelete, onEdit }) {
  const status = task.status || (task.done ? "Posted" : "Drafted");

  return (
    <article className={`task-card ${task.done ? "done" : ""}`}>
      <div className="task-main">
        <div className="task-badge">{project?.emoji || "📁"}</div>

        <div>
          <div className={`status-pill ${statusStyles[status] || ""}`}>
            {statusEmoji[status] || "⚪"} {status}
          </div>

          <p className="task-meta">
            {task.day} · {task.time} · {task.type}
          </p>

          <h3>{task.title}</h3>

          {task.idea && (
            <p>
              <strong>Idea:</strong> {task.idea}
            </p>
          )}

          {task.captionDraft && (
            <p>
              <strong>Caption Draft:</strong> {task.captionDraft}
            </p>
          )}

          {task.finalCaption && (
            <p>
              <strong>Final Caption:</strong> {task.finalCaption}
            </p>
          )}

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