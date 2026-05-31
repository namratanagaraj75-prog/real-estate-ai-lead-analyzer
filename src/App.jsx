import { useState } from "react";

function App() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateSummary = async () => {
    if (!notes.trim()) {
      alert("Please enter call notes");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert real estate sales analyst. Return ONLY valid JSON.",
              },
              {
                role: "user",
                content: `
Return ONLY valid JSON.

{
  "leadStatus":"",
  "customer":"",
  "budget":"",
  "location":"",
  "timeline":"",
  "concerns":"",
  "nextAction":"",
  "confidence":""
}

Analyze:

${notes}
`,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "API Error");
      }

      const aiText = data?.choices?.[0]?.message?.content || "{}";

      const cleaned = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsed;

      try {
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = {
          leadStatus: "Warm Lead",
          customer: "Unknown",
          budget: "Not Mentioned",
          location: "Not Mentioned",
          timeline: "Not Mentioned",
          concerns: "Not Mentioned",
          nextAction: "Follow Up",
          confidence: 80,
        };
      }

      setResult(parsed);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;

    navigator.clipboard.writeText(JSON.stringify(result, null, 2));

    alert("Report copied!");
  };

  const downloadReport = () => {
    if (!result) return;

    const report = `
Lead Status: ${result.leadStatus}

Customer: ${result.customer}

Budget: ${result.budget}

Location: ${result.location}

Timeline: ${result.timeline}

Concerns: ${result.concerns}

Next Action: ${result.nextAction}

Confidence: ${result.confidence}%
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Lead_Report.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const getBadgeColor = (status) => {
    const s = status?.toLowerCase() || "";

    if (s.includes("hot")) return "#22c55e";
    if (s.includes("cold")) return "#ef4444";

    return "#f59e0b";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071126",
        color: "white",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🏡 AI Lead Intelligence Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Transform customer conversations into actionable sales insights
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#16233d",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <h2>📞 Customer Call Notes</h2>

            <textarea
              rows="15"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste customer notes..."
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "15px",
                borderRadius: "12px",
                background: "#081224",
                color: "white",
                border: "1px solid #334155",
              }}
            />

            <button
              onClick={generateSummary}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "linear-gradient(90deg,#2563eb,#7c3aed)",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {loading ? "Analyzing..." : "Generate Intelligence Report"}
            </button>
          </div>

          <div
            style={{
              background: "#16233d",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <h2>📊 Lead Intelligence Report</h2>

            {!result ? (
              <p style={{ color: "#94a3b8" }}>No analysis generated yet.</p>
            ) : (
              <>
                <div
                  style={{
                    display: "inline-block",
                    background: getBadgeColor(result.leadStatus),
                    padding: "10px 20px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  🔥 {result.leadStatus?.toUpperCase()}
                </div>

                <InfoRow label="👤 Customer" value={result.customer} />
                <InfoRow label="💰 Budget" value={result.budget} />
                <InfoRow label="📍 Location" value={result.location} />
                <InfoRow label="📅 Timeline" value={result.timeline} />
                <InfoRow label="⚠ Concerns" value={result.concerns} />
                <InfoRow label="📞 Next Action" value={result.nextAction} />

                <div style={{ marginTop: "20px" }}>
                  <strong>🎯 Confidence: {result.confidence}%</strong>

                  <div
                    style={{
                      height: "12px",
                      background: "#334155",
                      borderRadius: "999px",
                      marginTop: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: `${parseInt(result.confidence || 80)}%`,
                        height: "100%",
                        background: "#22c55e",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={copyReport}
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    📋 Copy Report
                  </button>

                  <button
                    onClick={downloadReport}
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#22c55e",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    📥 Download Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        background: "#334155",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <strong>{label}: </strong>
      {value}
    </div>
  );
}

export default App;
