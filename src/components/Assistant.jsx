import { Bot, Send, Sparkles, Wrench } from "lucide-react";
import { useState } from "react";
import { askAssistant } from "../lib/api";

export function Assistant() {
  const [message, setMessage] = useState("Need dinner in Almaty under 5000");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      setAnswer(await askAssistant(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="assistant-panel">
      <div className="panel-title">
        <Bot size={19} />
        <h2>AI food assistant</h2>
      </div>
      <form onSubmit={submit} className="assistant-form">
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit" disabled={loading} aria-label="Ask assistant">
          {loading ? <Sparkles size={17} /> : <Send size={17} />}
          Ask
        </button>
      </form>
      {answer && (
        <div className="answer">
          <p>{answer.text}</p>
          <div className="tool-list">
            <Wrench size={16} />
            {answer.toolsUsed.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      )}
    </section>
  );
}
