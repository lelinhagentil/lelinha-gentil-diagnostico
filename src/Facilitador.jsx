import { useState } from "react";

const SENHA = "enfase2024";

const AQ = {
  INOCENTE:   { nome: "Inocente",        emoji: "☀️",  cor: "#F5C842" },
  EXPLORADOR: { nome: "Explorador",      emoji: "🧭",  cor: "#42B5F5" },
  SABIO:      { nome: "Sábio",           emoji: "🦉",  cor: "#A78BFA" },
  HEROI:      { nome: "Herói",           emoji: "⚔️",  cor: "#F56042" },
  FORA_LEI:   { nome: "Fora-da-Lei",     emoji: "🔥",  cor: "#F59642" },
  MAGO:       { nome: "Mago",            emoji: "✨",  cor: "#42F5C8" },
  CARA_COMUM: { nome: "Cara Comum",      emoji: "🤝",  cor: "#78C842" },
  AMANTE:     { nome: "Amante",          emoji: "❤️",  cor: "#F542A7" },
  BOBO:       { nome: "Bobo da Corte",   emoji: "🎭",  cor: "#F5E642" },
  PRESTATIVO: { nome: "Prestativo",      emoji: "🤲",  cor: "#42F578" },
  CRIADOR:    { nome: "Criador",         emoji: "🎨",  cor: "#C842F5" },
  GOVERNANTE: { nome: "Governante",      emoji: "👑",  cor: "#F5A842" },
};

export default function Facilitador() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [nomeMenutorado, setNomeMentorado] = useState("");
  const [scores, setScores] = useState(
    Object.keys(AQ).reduce((acc, k) => ({ ...acc, [k]: 0 }), {})
  );
  const [respostasAbertas, setRespostasAbertas] = useState({
    AB1: "", AB2: "", AB3: "", AB4: "", AB5: "", AB6: ""
  });
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const PERGUNTAS_ABERTAS = [
    { id: "AB1", pergunta: "Descreva um momento em que você se sentiu completamente no seu elemento." },
    { id: "AB2", pergunta: "Algo que as pessoas reconhecem em você mas que você minimiza." },
    { id: "AB3", pergunta: "Se seu trabalho fosse uma personagem, quem seria e qual sua missão?" },
    { id: "AB4", pergunta: "Alguém que você admira profundamente e o que exatamente te toca nela." },
    { id: "AB5", pergunta: "O que te revolta genuinamente no mundo ou na sua área?" },
    { id: "AB6", pergunta: "O que gostaria que seus mentorados pensassem sobre quem você é como pessoa?" },
  ];

  function tentarSenha() {
    if (senha === SENHA) {
      setAutenticado(true);
      setErro(false);
    } else {
      setErro(true);
      setSenha("");
      setTimeout(() => setErro(false), 2000);
    }
  }

  const ranking = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0);

  if (!autenticado) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Palatino Linotype', serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#444", textTransform: "uppercase", marginBottom: 32 }}>
            Programa de Posicionamento e Autoridade
          </div>
          <div style={{ fontSize: 28, color: "#c9a96e", marginBottom: 8, fontWeight: "700" }}>ÊNFASE</div>
          <div style={{ fontSize: 13, color: "#333", marginBottom: 48, letterSpacing: 2 }}>Painel do Facilitador</div>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === "Enter" && tentarSenha()}
            autoFocus
            placeholder="••••••••"
            style={{
              background: "#111",
              border: erro ? "1px solid #8b0000" : "1px solid #2a2a2a",
              borderRadius: 4,
              padding: "12px 24px",
              color: "#f0ede8",
              fontSize: 18,
              textAlign: "center",
              outline: "none",
              width: 200,
              letterSpacing: 4,
              display: "block",
              margin: "0 auto 16px",
            }}
          />
          <button onClick={tentarSenha} style={{
            background: "#c9a96e",
            color: "#0d0d0d",
            border: "none",
            padding: "10px 32px",
            fontSize: 13,
            fontWeight: "700",
            letterSpacing: 2,
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
          }}>
            {erro ? "Senha incorreta" : "Entrar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#f0ede8",
      fontFamily: "'Palatino Linotype', serif",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#c9a96e", textTransform: "uppercase", marginBottom: 4 }}>
            Painel do Facilitador
          </div>
          <div style={{ fontSize: 24, fontWeight: "700" }}>Análise de Arquétipo</div>
        </div>

        {/* NOME DO MENTORADO */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>NOME DO MENTORADO</div>
          <input
            value={nomeMenutorado}
            onChange={e => setNomeMentorado(e.target.value)}
            placeholder="Digite o nome..."
            style={{
              background: "#111",
              border: "1px solid #1e1e1e",
              borderRadius: 4,
              padding: "12px 16px",
              color: "#f0ede8",
              fontSize: 16,
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* PONTUAÇÃO POR ARQUÉTIPO */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 16, letterSpacing: 1 }}>
            PONTUAÇÃO — Digite os pontos de cada arquétipo
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.entries(AQ).map(([k, a]) => (
              <div key={k} style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                borderRadius: 4,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <span style={{ fontSize: 20 }}>{a.emoji}</span>
                <span style={{ flex: 1, fontSize: 13, color: "#888" }}>{a.nome}</span>
                <input
                  type="number"
                  min="0"
                  value={scores[k]}
                  onChange={e => setScores(prev => ({ ...prev, [k]: parseInt(e.target.value) || 0 }))}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #2a2a2a",
                    borderRadius: 2,
                    padding: "4px 8px",
                    color: a.cor,
                    fontSize: 16,
                    fontWeight: "700",
                    width: 60,
                    textAlign: "center",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RESPOSTAS ABERTAS */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 16, letterSpacing: 1 }}>
            RESPOSTAS DISSERTATIVAS DO MENTORADO
          </div>
          {PERGUNTAS_ABERTAS.map(ab => (
            <div key={ab.id} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#666", fontStyle: "italic", marginBottom: 8, lineHeight: 1.6 }}>
                {ab.pergunta}
              </div>
              <textarea
                value={respostasAbertas[ab.id]}
                onChange={e => setRespostasAbertas(prev => ({ ...prev, [ab.id]: e.target.value }))}
                rows={4}
                placeholder="Cole aqui a resposta do mentorado..."
                style={{
                  width: "100%",
                  background: "#111",
                  border: "1px solid #1e1e1e",
                  borderRadius: 4,
                  padding: 16,
                  color: "#f0ede8",
                  fontSize: 14,
                  lineHeight: 1.7,
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
        </div>

        {/* BOTÃO VER RESULTADO */}
        <button
          onClick={() => setMostrarResultado(true)}
          style={{
            background: "linear-gradient(135deg, #c9a96e, #a07840)",
            color: "#0d0d0d",
            border: "none",
            padding: "14px 40px",
            fontSize: 14,
            fontWeight: "700",
            letterSpacing: 2,
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
            width: "100%",
            marginBottom: 40,
          }}
        >
          Ver Resultado →
        </button>

        {/* RESULTADO */}
        {mostrarResultado && ranking.length > 0 && (
          <div>
            <div style={{ fontSize: 12, color: "#555", marginBottom: 20, letterSpacing: 1 }}>
              RESULTADO — {nomeMenutorado || "Mentorado"}
            </div>

            {/* TOP 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {ranking.slice(0, 2).map(([k, score], idx) => {
                const a = AQ[k];
                return (
                  <div key={k} style={{
                    border: `1px solid ${a.cor}44`,
                    background: `${a.cor}08`,
                    borderRadius: 4,
                    padding: "28px 20px",
                    textAlign: "center",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
                      background: idx === 0 ? a.cor : "#1a1a1a",
                      color: idx === 0 ? "#0d0d0d" : "#666",
                      border: idx === 1 ? "1px solid #2a2a2a" : "none",
                      fontSize: 9, fontWeight: "800", padding: "4px 14px",
                      borderRadius: 20, letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>
                      {idx === 0 ? "Dominante" : "Secundário"}
                    </div>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>{a.emoji}</div>
                    <div style={{ fontSize: 20, fontWeight: "700", color: a.cor, marginBottom: 4 }}>{a.nome}</div>
                    <div style={{ fontSize: 28, fontWeight: "800", color: "#f0ede8", marginTop: 10 }}>{score}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>pontos</div>
                  </div>
                );
              })}
            </div>

            {/* RANKING */}
            <div style={{
              background: "#0f0f0f",
              border: "1px solid #1a1a1a",
              borderRadius: 4,
              padding: "24px 28px",
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 20 }}>
                Ranking completo
              </div>
              {ranking.map(([k, score], idx) => {
                const a = AQ[k];
                const max = ranking[0][1];
                const pct = Math.round((score / max) * 100);
                return (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 18, fontSize: 11, color: "#333", textAlign: "right" }}>{idx + 1}</div>
                    <div style={{ width: 22, textAlign: "center", fontSize: 16 }}>{a.emoji}</div>
                    <div style={{ width: 120, fontSize: 13, color: "#888" }}>{a.nome}</div>
                    <div style={{ flex: 1, height: 4, background: "#1a1a1a", borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: a.cor, borderRadius: 2 }} />
                    </div>
                    <div style={{ width: 36, textAlign: "right", fontSize: 13, color: a.cor, fontWeight: "700" }}>{score}</div>
                  </div>
                );
              })}
            </div>

            {/* RESPOSTAS ABERTAS NO RESULTADO */}
            <div style={{
              background: "#0f0f0f",
              border: "1px solid #1a1a1a",
              borderRadius: 4,
              padding: "24px 28px",
            }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 20 }}>
                Respostas dissertativas
              </div>
              {PERGUNTAS_ABERTAS.map(ab => respostasAbertas[ab.id] ? (
                <div key={ab.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginBottom: 8 }}>{ab.pergunta}</div>
                  <div style={{ fontSize: 14, color: "#f0ede8", lineHeight: 1.8 }}>{respostasAbertas[ab.id]}</div>
                </div>
              ) : null)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
