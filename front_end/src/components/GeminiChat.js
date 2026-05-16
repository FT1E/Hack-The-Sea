import { useState } from 'react'
import server_api from '../services/backend_api'

export default function GeminiChat({ fishData }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const systemContext = `You are a marine biology assistant for an aquarium app.
You only answer questions about this specific fish:
- Common name: ${fishData?.commonName}
- Scientific name: ${fishData?.scientificName}
- Slovenian name: ${fishData?.commonNameSl}
- Habitat: ${fishData?.habitat}
- Size: ${fishData?.size}
- Description: ${fishData?.description}
- Behaviour: ${fishData?.behaviour}
- Fun fact: ${fishData?.funFact}

If asked about anything unrelated to this fish, politely redirect the conversation back to ${fishData?.commonName}.`

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const history = updatedMessages.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))

      const response = await server_api.post('/api/chat', {
        system_instruction: {
          parts: [{ text: systemContext }]
        },
        contents: history
      })

      const data = response.data

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response.'
      setMessages(prev => [...prev, { role: 'model', text: reply }])
    } catch (err) {
      console.error('Chat error:', err.message)
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .chat-icon {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(245, 200, 66, 0.15);
          border: 1px solid rgba(245, 200, 66, 0.4);
          color: #f5c842;
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: all 0.2s ease;
        }
        .chat-icon:hover {
          background: rgba(245, 200, 66, 0.25);
          transform: scale(1.05);
        }
        .chat-window {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          width: 350px;
          max-height: 500px;
          background: #05111f;
          border: 1px solid rgba(245, 200, 66, 0.2);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          z-index: 100;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          animation: slideIn 0.2s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-header {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(245, 200, 66, 0.15);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245, 200, 66, 0.7);
          background: rgba(5, 17, 31, 0.95);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chat-header-status {
          font-size: 0.6rem;
          color: rgba(245, 200, 66, 0.5);
        }
        .clear-chat {
          background: none;
          border: none;
          color: rgba(245, 200, 66, 0.5);
          cursor: pointer;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .clear-chat:hover {
          color: rgba(245, 200, 66, 0.9);
          background: rgba(245, 200, 66, 0.1);
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(5, 17, 31, 0.9);
          max-height: 380px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(245, 200, 66, 0.3);
          border-radius: 2px;
        }
        .chat-bubble {
          max-width: 85%;
          padding: 0.6rem 0.9rem;
          border-radius: 12px;
          font-size: 0.85rem;
          line-height: 1.5;
          word-wrap: break-word;
        }
        .chat-bubble.user {
          align-self: flex-end;
          background: rgba(245, 200, 66, 0.15);
          color: #f5c842;
          border: 1px solid rgba(245, 200, 66, 0.2);
          border-bottom-right-radius: 4px;
        }
        .chat-bubble.model {
          align-self: flex-start;
          background: rgba(255,255,255,0.05);
          color: rgba(232, 223, 200, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom-left-radius: 4px;
        }
        .chat-typing {
          align-self: flex-start;
          font-size: 0.75rem;
          color: rgba(245, 200, 66, 0.5);
          padding: 0.4rem 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .chat-typing span {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .chat-input-row {
          display: flex;
          border-top: 1px solid rgba(245, 200, 66, 0.15);
          padding: 0.75rem;
          gap: 0.5rem;
          background: rgba(5, 17, 31, 0.95);
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          color: #e8dfc8;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s;
        }
        .chat-input:focus {
          border-color: rgba(245, 200, 66, 0.5);
          background: rgba(255,255,255,0.08);
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.25); }
        .chat-send {
          background: rgba(245, 200, 66, 0.15);
          border: 1px solid rgba(245, 200, 66, 0.3);
          color: #f5c842;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
          font-weight: 500;
        }
        .chat-send:hover:not(:disabled) {
          background: rgba(245, 200, 66, 0.25);
          transform: translateY(-1px);
        }
        .chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .welcome-message {
          text-align: center;
          padding: 1rem;
        }
        .welcome-icon { font-size: 2rem; margin-bottom: 0.5rem; }
      `}</style>

      <button className="chat-icon" onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '🐟'}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-title">
              <span>🐠 MARINE ASSISTANT</span>
              <span className="chat-header-status">● online</span>
            </div>
            {messages.length > 0 && (
              <button className="clear-chat" onClick={() => setMessages([])}>
                Clear
              </button>
            )}
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <div className="welcome-icon">🐙</div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245, 200, 66, 0.6)', marginBottom: '0.5rem' }}>
                  Ask me anything about
                </p>
                <p style={{ fontSize: '0.9rem', color: '#f5c842', fontWeight: 'bold' }}>
                  {fishData?.commonName}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
                  🏷️ {fishData?.scientificName}
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-typing">
                <span>●</span><span>●</span><span>●</span>
                <span style={{ marginLeft: '0.3rem' }}>thinking...</span>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder={`Ask about ${fishData?.commonName}...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              {loading ? '...' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}