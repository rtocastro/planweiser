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
            placeholder="Funny, dark, introspective, direct, motivational,
chaotic, educational, serious, metal, etc."
            value={styleProfile.tone}
            onChange={(e) =>
              update("tone", e.target.value)
            }
          />
        </label>

        <label>
          Must Include
          <textarea
            placeholder="Things every caption should remember:
community building, subtle humor,
cohesiveness between projects,
mentioning products naturally, stay professional etc."
            value={styleProfile.mustInclude}
            onChange={(e) =>
              update("mustInclude", e.target.value)
            }
          />
        </label>

        <label>
          Avoid
          <textarea
            placeholder="Things to avoid:
salesy language, cryptic posts,
corporate sounding captions,
burnout vibes, overexplaining, etc."
            value={styleProfile.avoid}
            onChange={(e) =>
              update("avoid", e.target.value)
            }
          />
        </label>

        <label>
          Primary Goal
          <input
            placeholder="Consistency, engagement,
sales, audience growth,financial growth
brand awareness, community building, etc."
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