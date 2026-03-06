import { useState } from "react";
import Icon from "@/components/ui/icon";

const TABS = ["Архитектура", "Дорожная карта", "OBS Setup", "Автоматизация", "Бюджет"];

const ARCH_NODES = [
  {
    id: "cf",
    label: "Cloudflare CDN",
    sub: "Бесплатный тариф",
    color: "#F48120",
    icon: "Globe",
    x: 50,
    y: 5,
    desc: "Глобальная доставка контента, DDoS-защита, SSL-сертификаты. Настройка: добавить домен → сменить NS → включить Proxy.",
  },
  {
    id: "web",
    label: "Сервер сайта",
    sub: "WordPress + MariaDB",
    color: "#21759B",
    icon: "Monitor",
    x: 15,
    y: 42,
    desc: "VPS ~10 €/мес (Hetzner CX21). Ubuntu 22.04 + Nginx + PHP 8.2 + MariaDB. WordPress с темой Newspaper или Soledad.",
  },
  {
    id: "media",
    label: "Медиа-сервер",
    sub: "Nginx RTMP + FFmpeg",
    color: "#E53E3E",
    icon: "Radio",
    x: 50,
    y: 42,
    desc: "VPS ~15 €/мес (Hetzner CX31). OBS → RTMP → Nginx → HLS → сайт. FFmpeg нарезает клипы 15–40 сек автоматически.",
  },
  {
    id: "ai",
    label: "AI/Бот-сервер",
    sub: "Python + Docker",
    color: "#805AD5",
    icon: "Bot",
    x: 85,
    y: 42,
    desc: "VPS ~15 €/мес (Hetzner CX21). Python-скрипты: нарезка клипов, генерация субтитров (Whisper), автопостинг в TikTok/Telegram/YouTube.",
  },
  {
    id: "obs",
    label: "OBS Studio",
    sub: "У стримера",
    color: "#38A169",
    icon: "Video",
    x: 50,
    y: 80,
    desc: "Бесплатно. Настройка: Файл → Настройки → Вещание → Тип: Пользовательский → URL: rtmp://ВАШ_IP/live → Ключ: stream_key",
  },
];

const ROADMAP = [
  {
    period: "30 дней",
    color: "#38A169",
    icon: "Rocket",
    tasks: [
      "Арендовать 3 VPS на Hetzner",
      "Установить WordPress + тема Newspaper",
      "Плагины: WooCommerce, Yoast SEO, W3 Total Cache, BuddyPress",
      "Подключить домен к Cloudflare (NS смена)",
      "Настроить Nginx RTMP на медиа-сервере",
      "Первый тестовый эфир через OBS",
      "Настроить FFmpeg для нарезки клипов",
    ],
  },
  {
    period: "60 дней",
    color: "#3182CE",
    icon: "Zap",
    tasks: [
      "Подключить Stripe + WooCommerce платежи",
      "Личные кабинеты авторов (BuddyPress + профили)",
      "Python-скрипт автопостинга в Telegram-канал",
      "Whisper AI для генерации субтитров",
      "Настроить балансировщик нагрузки (Nginx upstream)",
      "Мониторинг: UptimeRobot + Telegram-уведомления",
      "3 эфира в неделю → 30+ клипов",
    ],
  },
  {
    period: "90 дней",
    color: "#805AD5",
    icon: "Trophy",
    tasks: [
      "Автопостинг YouTube Shorts + TikTok API",
      "Instagram Reels через Meta Graph API",
      "Краудфандинг-модуль (WooCommerce Subscriptions)",
      "Ethereum-токенизация (Metamask + WooCommerce)",
      "Stable Diffusion для генерации превью клипов",
      "A/B тесты заголовков (Google Optimize)",
      "Воронка: клип → зритель → подписчик → донатер",
    ],
  },
];

const OBS_STEPS = [
  {
    step: "01",
    title: "Установить Nginx RTMP на медиа-сервере",
    code: `sudo apt update && sudo apt install nginx libnginx-mod-rtmp -y

# /etc/nginx/nginx.conf — добавить блок:
rtmp {
  server {
    listen 1935;
    chunk_size 4096;
    application live {
      live on;
      record off;
      hls on;
      hls_path /var/www/html/hls/;
      hls_fragment 3;
    }
  }
}`,
    icon: "Server",
    color: "#E53E3E",
  },
  {
    step: "02",
    title: "Открыть порты в файрволе",
    code: `sudo ufw allow 1935/tcp   # RTMP
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw allow 8080/tcp   # HLS Player
sudo ufw reload`,
    icon: "Shield",
    color: "#F48120",
  },
  {
    step: "03",
    title: "Настроить OBS Studio",
    code: `Файл → Настройки → Вещание
  Тип:    Пользовательский RTMP-сервер
  URL:    rtmp://ВАШ_МЕДИА_IP/live
  Ключ:   my_stream_key

Рекомендуемые настройки:
  Видео:  1920x1080, 30fps
  Битрейт: 4500 Kbps
  Encoder: x264 / NVENC`,
    icon: "Video",
    color: "#38A169",
  },
  {
    step: "04",
    title: "FFmpeg — автонарезка клипов",
    code: `#!/usr/bin/env python3
# clip_cutter.py — запускать каждые 5 мин через cron
import subprocess, os, time

INPUT = "rtmp://localhost/live/my_stream_key"
OUTPUT_DIR = "/clips/"
CLIP_LEN = 30  # секунд

timestamp = int(time.time())
out = f"{OUTPUT_DIR}clip_{timestamp}.mp4"

subprocess.run([
  "ffmpeg", "-i", INPUT,
  "-t", str(CLIP_LEN),
  "-c", "copy", out
])
# Cron: */5 * * * * python3 /opt/clip_cutter.py`,
    icon: "Scissors",
    color: "#805AD5",
  },
  {
    step: "05",
    title: "Встроить HLS-плеер в WordPress",
    code: `<!-- В виджет или шорткод WordPress: -->
<video id="player" controls autoplay muted playsinline>
  <source
    src="http://ВАШ_МЕДИА_IP/hls/index.m3u8"
    type="application/x-mpegURL"
  />
</video>

<!-- Плагин: WP Stream Player или VideoJS HLS -->
<!-- Или шорткод: [hls_stream url="http://IP/hls/index.m3u8"] -->`,
    icon: "Play",
    color: "#3182CE",
  },
];

const AUTO_BLOCKS = [
  {
    title: "Нарезка клипов",
    icon: "Scissors",
    color: "#805AD5",
    ai: true,
    desc: "FFmpeg + Python cron каждые 5 мин. Whisper AI добавляет субтитры. Stable Diffusion генерирует превью-картинку.",
    tools: ["FFmpeg", "Whisper", "Cron"],
  },
  {
    title: "Telegram-бот",
    icon: "Send",
    color: "#229ED9",
    ai: false,
    desc: "Python + python-telegram-bot. Клип + превью + текст → автопост в канал сразу после нарезки. Задержка < 2 мин.",
    tools: ["python-telegram-bot", "asyncio"],
  },
  {
    title: "YouTube Shorts",
    icon: "Youtube",
    color: "#E53E3E",
    ai: false,
    desc: "YouTube Data API v3. OAuth 2.0 один раз. Скрипт загружает вертикальный клип (9:16) с авто-заголовком.",
    tools: ["YouTube API", "OAuth2"],
  },
  {
    title: "TikTok & Instagram",
    icon: "Film",
    color: "#F48120",
    ai: false,
    desc: "TikTok Content Posting API (бета). Instagram Graph API через Meta Developer. Требует верификацию аккаунтов.",
    tools: ["TikTok API", "Meta Graph API"],
  },
  {
    title: "Мониторинг",
    icon: "Activity",
    color: "#38A169",
    ai: false,
    desc: "UptimeRobot (бесплатно): проверка каждые 5 мин. При сбое → SMS + Telegram. Grafana + Prometheus опционально.",
    tools: ["UptimeRobot", "Grafana"],
  },
  {
    title: "AI-контент",
    icon: "Sparkles",
    color: "#D69E2E",
    ai: true,
    desc: "GPT-4o генерирует заголовки и описания клипов. Stable Diffusion XL — превью. Всё через локальный Ollama или API.",
    tools: ["GPT-4o", "Stable Diffusion", "Ollama"],
  },
];

const BUDGET = [
  { label: "Сервер сайта", price: "~10 €", sub: "Hetzner CX21 · WordPress + MariaDB", color: "#21759B", icon: "Monitor" },
  { label: "Медиа-сервер", price: "~15 €", sub: "Hetzner CX31 · Nginx RTMP + FFmpeg", color: "#E53E3E", icon: "Radio" },
  { label: "AI/Бот-сервер", price: "~15 €", sub: "Hetzner CX21 · Python + Docker", color: "#805AD5", icon: "Bot" },
  { label: "Cloudflare CDN", price: "0 €", sub: "Бесплатный тариф · DDoS + SSL", color: "#F48120", icon: "Globe" },
  { label: "WordPress темы", price: "~5 €", sub: "Newspaper ~$69 единоразово / рассрочка", color: "#38A169", icon: "Layout" },
  { label: "Домен (.com)", price: "~1 €", sub: "Namecheap / Cloudflare Registrar", color: "#D69E2E", icon: "Hash" },
];

function SectionTitle({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "#E53E3E20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name={icon} size={18} style={{ color: "#E53E3E" }} />
      </div>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#F7FAFC" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{sub}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const selectedNode = ARCH_NODES.find((n) => n.id === activeNode);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 48px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #E53E3E, #805AD5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Radio" size={18} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px", color: "var(--text)" }}>MediaStack</div>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Медиаплатформа · Blueprint</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: "#38A16920", border: "1px solid #38A16940", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#68D391", fontWeight: 600 }}>
              ● ~40 €/мес
            </div>
            <div style={{ background: "#805AD520", border: "1px solid #805AD540", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#B794F4", fontWeight: 600 }}>
              100% Open Source
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0D0F14 0%, var(--bg) 100%)", padding: "clamp(32px, 6vw, 64px) clamp(16px, 4vw, 48px) 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 11, color: "#805AD5", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
                Полная архитектура · AI-автоматизация · 90 дней
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 16px", color: "#F7FAFC" }}>
                Медиаплатформа<br />
                <span style={{ background: "linear-gradient(90deg, #E53E3E, #805AD5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>на WordPress + AI</span>
              </h1>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: "0 0 24px" }}>
                Стриминг, автоклипы, соцсети, краудфандинг. Три сервера, Cloudflare, OBS Studio — пошаговая инструкция без знания кода.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {([["Новости + Блоги", "FileText", "#21759B"], ["Стриминг OBS", "Radio", "#E53E3E"], ["Автоклипы AI", "Scissors", "#805AD5"], ["TikTok / Shorts", "Film", "#F48120"]] as [string, string, string][]).map(([l, ic, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, background: c + "15", border: `1px solid ${c}30`, borderRadius: 20, padding: "5px 12px" }}>
                    <Icon name={ic} size={12} style={{ color: c }} />
                    <span style={{ fontSize: 12, color: c, fontWeight: 500 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, minWidth: 220 }}>
              {([["3", "сервера"], ["40 €", "в месяц"], ["30+", "клипов/нед"], ["100%", "open source"]] as [string, string][]).map(([v, l]) => (
                <div key={l} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#F7FAFC" }}>{v}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "0 clamp(16px, 4vw, 48px)", marginTop: 32 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500, background: "none", border: "none", cursor: "pointer", color: activeTab === i ? "#F7FAFC" : "var(--muted)", borderBottom: activeTab === i ? "2px solid #E53E3E" : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px clamp(16px, 4vw, 48px) 64px" }}>

        {/* TAB 0: Architecture */}
        {activeTab === 0 && (
          <div>
            <SectionTitle icon="Network" title="Архитектурная схема" sub="Кликни на узел — получишь инструкцию по настройке" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, position: "relative", minHeight: 440 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="13" x2="22" y2="44" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="50" y1="13" x2="50" y2="44" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="50" y1="13" x2="78" y2="44" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="50" y1="57" x2="50" y2="80" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="22" y1="57" x2="50" y2="80" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="78" y1="57" x2="50" y2="80" stroke="#ffffff10" strokeWidth="0.5" />
                </svg>
                <div style={{ position: "relative", height: 400 }}>
                  {ARCH_NODES.map((node) => (
                    <button key={node.id} onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                      style={{
                        position: "absolute",
                        left: `${node.x}%`, top: `${node.y}%`,
                        transform: "translate(-50%, -50%)",
                        background: activeNode === node.id ? node.color + "30" : "var(--bg)",
                        border: `2px solid ${activeNode === node.id ? node.color : node.color + "50"}`,
                        borderRadius: 12, padding: "10px 14px", cursor: "pointer",
                        textAlign: "center", minWidth: 110,
                        boxShadow: activeNode === node.id ? `0 0 20px ${node.color}40` : "none",
                        transition: "all 0.2s",
                      }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                        <Icon name={node.icon} size={18} style={{ color: node.color }} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#F7FAFC", lineHeight: 1.2 }}>{node.label}</div>
                      <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>{node.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {selectedNode ? (
                  <div style={{ background: "var(--card)", border: `1px solid ${selectedNode.color}40`, borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: selectedNode.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={selectedNode.icon} size={18} style={{ color: selectedNode.color }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#F7FAFC", fontSize: 14 }}>{selectedNode.label}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{selectedNode.sub}</div>
                      </div>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7 }}>{selectedNode.desc}</p>
                  </div>
                ) : (
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ color: "var(--muted)", fontSize: 13, textAlign: "center", padding: "32px 0" }}>
                      <Icon name="MousePointer" size={24} style={{ color: "var(--muted)", margin: "0 auto 12px", display: "block" }} />
                      Нажми на узел в схеме для получения инструкции
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 16, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 14 }}>Поток данных</div>
                  {([
                    ["OBS Studio", "#38A169"],
                    ["→ Медиа-сервер (RTMP)", "#E53E3E"],
                    ["→ FFmpeg (клипы)", "#805AD5"],
                    ["→ AI-бот (постинг)", "#805AD5"],
                    ["→ WordPress сайт", "#21759B"],
                    ["→ Cloudflare CDN", "#F48120"],
                    ["→ Зритель / Соцсети", "#D69E2E"],
                  ] as [string, string][]).map(([label, color], i, arr) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: label.startsWith("→") ? "var(--muted)" : "#F7FAFC", fontWeight: label.startsWith("→") ? 400 : 600 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Roadmap */}
        {activeTab === 1 && (
          <div>
            <SectionTitle icon="Calendar" title="Дорожная карта" sub="30 · 60 · 90 дней — от нуля до полной автоматизации" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {ROADMAP.map((phase, pi) => (
                <div key={phase.period} style={{ background: "var(--card)", border: `1px solid ${phase.color}30`, borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ background: `linear-gradient(135deg, ${phase.color}20, ${phase.color}08)`, padding: "18px 20px", borderBottom: `1px solid ${phase.color}30`, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: phase.color + "25", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={phase.icon} size={18} style={{ color: phase.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#F7FAFC" }}>{phase.period}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)" }}>Фаза {pi + 1} · {phase.tasks.length} задач</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    {phase.tasks.map((task, ti) => (
                      <div key={ti} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: ti < phase.tasks.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 4, background: phase.color + "20", border: `1px solid ${phase.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 9, color: phase.color, fontWeight: 700 }}>{ti + 1}</span>
                        </div>
                        <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: OBS Setup */}
        {activeTab === 2 && (
          <div>
            <SectionTitle icon="Video" title="OBS → Медиа-сервер → Сайт" sub="Пошаговая инструкция с командами — нажми для копирования" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {OBS_STEPS.map((step, si) => (
                <div key={step.step} style={{ background: "var(--card)", border: `1px solid ${activeStep === si ? step.color + "50" : "var(--border)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button onClick={() => setActiveStep(activeStep === si ? null : si)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: step.color + "20", border: `1px solid ${step.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={step.icon} size={16} style={{ color: step.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: step.color, fontWeight: 700, fontFamily: "monospace" }}>{step.step}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#F7FAFC" }}>{step.title}</span>
                      </div>
                    </div>
                    <Icon name={activeStep === si ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "var(--muted)" }} />
                  </button>
                  {activeStep === si && (
                    <div style={{ borderTop: `1px solid ${step.color}20`, position: "relative" }}>
                      <button onClick={() => copyCode(step.code, si)} style={{ position: "absolute", top: 12, right: 12, background: copiedIdx === si ? "#38A16920" : "var(--bg)", border: `1px solid ${copiedIdx === si ? "#38A16940" : "var(--border)"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, color: copiedIdx === si ? "#68D391" : "var(--muted)", display: "flex", alignItems: "center", gap: 4, zIndex: 1 }}>
                        <Icon name={copiedIdx === si ? "Check" : "Copy"} size={11} style={{ color: copiedIdx === si ? "#68D391" : "var(--muted)" }} />
                        {copiedIdx === si ? "Скопировано" : "Копировать"}
                      </button>
                      <pre style={{ margin: 0, padding: "16px 20px", fontSize: 12, lineHeight: 1.7, color: "#A3BE8C", fontFamily: "'IBM Plex Mono', 'Fira Code', monospace", overflowX: "auto", background: "#0D0F1480" }}>
                        {step.code}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Automation */}
        {activeTab === 3 && (
          <div>
            <SectionTitle icon="Bot" title="Автоматизация" sub="Что делает AI, что делают скрипты — и как это работает" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {AUTO_BLOCKS.map((block) => (
                <div key={block.title} style={{ background: "var(--card)", border: `1px solid ${block.color}25`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: block.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={block.icon} size={16} style={{ color: block.color }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#F7FAFC" }}>{block.title}</span>
                    </div>
                    {block.ai && (
                      <div style={{ background: "#805AD220", border: "1px solid #805AD240", borderRadius: 20, padding: "2px 8px", fontSize: 9, color: "#B794F4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>AI</div>
                    )}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>{block.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {block.tools.map((t) => (
                      <span key={t} style={{ background: block.color + "12", border: `1px solid ${block.color}25`, borderRadius: 4, padding: "2px 7px", fontSize: 10, color: block.color, fontFamily: "monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 18 }}>Воронка роста</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
                {([
                  ["Эфир (3/нед)", "#E53E3E", "Radio"],
                  ["30+ клипов", "#805AD5", "Scissors"],
                  ["Соцсети", "#F48120", "Film"],
                  ["Зрители", "#D69E2E", "Eye"],
                  ["Подписчики", "#21759B", "Users"],
                  ["Участники", "#38A169", "DollarSign"],
                ] as [string, string, string][]).map(([label, color, icon], i, arr) => (
                  <div key={label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: color + "20", border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                        <Icon name={icon} size={20} style={{ color: color }} />
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)", maxWidth: 64 }}>{label}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <Icon name="ChevronRight" size={16} style={{ color: "var(--border)", margin: "0 4px", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Budget */}
        {activeTab === 4 && (
          <div>
            <SectionTitle icon="DollarSign" title="Бюджет" sub="Минимальные вложения · открытые инструменты" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {BUDGET.map((item) => (
                <div key={item.label} style={{ background: "var(--card)", border: `1px solid ${item.color}25`, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={item.icon} size={20} style={{ color: item.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#F7FAFC" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: item.price === "0 €" ? "#68D391" : "#F7FAFC" }}>{item.price}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, background: "linear-gradient(135deg, #E53E3E15, #805AD515)", border: "1px solid #E53E3E30", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Итого в месяц</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 700, color: "#F7FAFC", lineHeight: 1 }}>~41 €</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>или ~4 200 ₽ по курсу</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([["Cloudflare CDN", "Бесплатно"], ["WordPress CMS", "Бесплатно"], ["Nginx RTMP", "Бесплатно"], ["FFmpeg", "Бесплатно"], ["Python + Docker", "Бесплатно"]] as [string, string][]).map(([tool, price]) => (
                  <div key={tool} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="Check" size={12} style={{ color: "#68D391" }} />
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{tool}</span>
                    <span style={{ fontSize: 12, color: "#68D391", marginLeft: "auto", paddingLeft: 16, fontWeight: 600 }}>{price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 14 }}>Рекомендуемые сервисы</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                {([
                  ["Hetzner Cloud", "Серверы", "hetzner.com", "#E53E3E"],
                  ["Cloudflare", "CDN + DNS", "cloudflare.com", "#F48120"],
                  ["Namecheap", "Домен", "namecheap.com", "#D69E2E"],
                  ["Stripe", "Платежи", "stripe.com", "#635BFF"],
                  ["UptimeRobot", "Мониторинг", "uptimerobot.com", "#38A169"],
                  ["Whisper AI", "Субтитры", "openai.com/whisper", "#805AD5"],
                ] as [string, string, string, string][]).map(([name, role, url, color]) => (
                  <a key={name} href={`https://${url}`} target="_blank" rel="noopener noreferrer" style={{ background: color + "10", border: `1px solid ${color}25`, borderRadius: 10, padding: "10px 14px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#F7FAFC" }}>{name}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{role} · {url}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px clamp(16px, 4vw, 48px)", background: "#0D0F14" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>MediaStack Blueprint · Все инструменты open source · ~40 €/мес</div>
          <div style={{ display: "flex", gap: 12 }}>
            {["WordPress.org", "Nginx.org", "FFmpeg.org"].map((s) => (
              <span key={s} style={{ fontSize: 11, color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 8px" }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
