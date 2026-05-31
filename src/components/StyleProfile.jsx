function StyleProfile({
  styleProfile,
  setStyleProfile,
}) {
  function update(field, value) {
    setStyleProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <section className="archive-section">
      <p className="eyebrow">AI Profile</p>
      <h2>My Style</h2>

      <div className="profile-grid">
        <label>
          Tone
          <textarea
            value={styleProfile.tone}
            onChange={(e) =>
              update("tone", e.target.value)
            }
          />
        </label>

        <label>
          Must Include
          <textarea
            value={styleProfile.mustInclude}
            onChange={(e) =>
              update("mustInclude", e.target.value)
            }
          />
        </label>

        <label>
          Avoid
          <textarea
            value={styleProfile.avoid}
            onChange={(e) =>
              update("avoid", e.target.value)
            }
          />
        </label>

        <label>
          Primary Goal
          <input
            value={styleProfile.goal}
            onChange={(e) =>
              update("goal", e.target.value)
            }
          />
        </label>
      </div>
    </section>
  );
}

export default StyleProfile;