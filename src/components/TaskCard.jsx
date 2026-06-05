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

const metricLabels = {
  views: "Views",
  likes: "Likes",
  comments: "Comments",
  shares: "Shares",
  saves: "Saves",
  clicks: "Clicks",
  orders: "Orders",
};

function TaskCard({ task, project, onToggle, onDelete, onEdit }) {
  const status = task.status || (task.done ? "Posted" : "Drafted");

  const visibleMetrics = Object.entries(task.metrics || {}).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined
  );

  function copyFinalCaption() {
    if (!task.finalCaption) return;

    navigator.clipboard.writeText(task.finalCaption);
  }

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
            <div className="caption-box">
              <div className="caption-header">
                <strong>Final Caption:</strong>

                <button
                  type="button"
                  className="copy-button"
                  onClick={copyFinalCaption}
                  title="Copy final caption"
                >
                  ⧉
                </button>
              </div>

              <p>{task.finalCaption}</p>
            </div>
          )}

          {task.metrics &&
  Object.values(task.metrics).some(
    (value) => value !== "" && value !== 0
  ) && (
    <div className="metrics-summary">
      {task.metrics.views && (
        <span>👀 {task.metrics.views}</span>
      )}

      {task.metrics.likes && (
        <span>❤️ {task.metrics.likes}</span>
      )}

      {task.metrics.comments && (
        <span>💬 {task.metrics.comments}</span>
      )}

      {task.metrics.shares && (
        <span>🔁 {task.metrics.shares}</span>
      )}

      {task.metrics.saves && (
        <span>🔖 {task.metrics.saves}</span>
      )}

      {task.metrics.clicks && (
        <span>🖱️ {task.metrics.clicks}</span>
      )}

      {task.metrics.orders && (
        <span>🛒 {task.metrics.orders}</span>
      )}
    </div>
)}

          {visibleMetrics.length > 0 && (
            <div className="metrics-summary">
              {visibleMetrics.map(([key, value]) => (
                <span key={key}>
                  {metricLabels[key] || key}: {value}
                </span>
              ))}
            </div>
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