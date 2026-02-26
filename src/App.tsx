import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MOCK_POSTS = [
  {
    id: "1",
    slug: "global-inflation-2024-historical-parallels",
    title: "Глобальная инфляция 2024: Предсказанный путь на основе 100 лет истории",
    excerpt: "Анализ текущего инфляционного цикла через призму кризисов 1923, 1973 и 1998 годов. Исторические параллели указывают на неизбежную фазу стабилизации в Q2 2025.",
    category: "Анализ",
    date: "26 февраля 2026",
    readTime: "12 мин",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    confidence: 87,
    sources: 14,
    videoReady: true,
  },
  {
    id: "2",
    slug: "ai-regulation-historical-tech-patterns",
    title: "Регулирование ИИ: Как История Повторяет Паттерны Ядерной Гонки 1950-х",
    excerpt: "Международные переговоры по ИИ повторяют архетип ядерного нераспространения. Данные за 70 лет предсказывают подписание глобального договора к 2026 году.",
    category: "История",
    date: "25 февраля 2026",
    readTime: "15 мин",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    confidence: 73,
    sources: 22,
    videoReady: true,
  },
  {
    id: "3",
    slug: "energy-transition-weimar-parallels",
    title: "Энергетический Переход: Уроки Веймарской Германии и Нефтяного Шока 1973",
    excerpt: "Экономика возобновляемой энергетики следует той же кривой принятия, что и электрификация 1920-х. Предсказание: паритет с нефтью к 2027 году неизбежен.",
    category: "Новости",
    date: "24 февраля 2026",
    readTime: "10 мин",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    confidence: 91,
    sources: 18,
    videoReady: false,
  },
  {
    id: "4",
    slug: "geopolitics-multipolar-1900-patterns",
    title: "Многополярный Мир 2025: Зеркало Европейской Политики 1900–1914 годов",
    excerpt: "Структурные паттерны геополитических альянсов 2024 года идентичны предвоенной Европе с 94% точностью. Что это означает для следующего десятилетия.",
    category: "Эксперты",
    date: "23 февраля 2026",
    readTime: "18 мин",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    confidence: 68,
    sources: 31,
    videoReady: true,
  },
  {
    id: "5",
    slug: "central-banks-rate-cycle-1980",
    title: "Цикл Центробанков: Как Повышение Ставок Пауэлла Копирует Волкера 1980-го",
    excerpt: "ФРС 2023–2025 повторяет шаги Пола Волкера с точностью 89%. История предсказывает 'мягкую посадку' только в 3 из 7 аналогичных циклов.",
    category: "Анализ",
    date: "22 февраля 2026",
    readTime: "14 мин",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
    confidence: 82,
    sources: 19,
    videoReady: false,
  },
  {
    id: "6",
    slug: "social-media-printing-press-parallel",
    title: "Социальные Сети и Печатный Станок Гутенберга: 570-летний Цикл Информации",
    excerpt: "Демократизация информации 2010-х повторяет революцию печатного станка 1450-х с задержкой в 570 лет. Предсказываем пик и схлопывание к 2028.",
    category: "История",
    date: "21 февраля 2026",
    readTime: "11 мин",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    confidence: 79,
    sources: 25,
    videoReady: true,
  },
];

const EXPERTS_DATA = [
  { name: "Арсен Мусаев", title: "Старший аналитик, TALANT CAPITAL", avatar: "АМ", articles: 47, bio: "Специализация: макроэкономика, монетарная политика, исторические финансовые циклы" },
  { name: "Лариса Ковалёва", title: "Историк-экономист", avatar: "ЛК", articles: 38, bio: "Специализация: экономическая история XIX–XX века, кризисы и восстановление" },
  { name: "Дмитрий Орен", title: "Директор по исследованиям", avatar: "ДО", articles: 61, bio: "Специализация: геополитика, международные отношения, предсказательная аналитика" },
  { name: "Нина Захарова", title: "Аналитик данных", avatar: "НЗ", articles: 29, bio: "Специализация: машинное обучение, временные ряды, алгоритмические модели" },
  { name: "Тимур Байсалов", title: "Эксперт по Центральной Азии", avatar: "ТБ", articles: 22, bio: "Специализация: региональные рынки, ресурсная экономика, политические риски" },
  { name: "Элла Петракова", title: "Редактор-аналитик", avatar: "ЭП", articles: 55, bio: "Специализация: журналистика данных, инвестиционные нарративы, коммуникация" },
];

const LOGS = [
  { time: "26.02.2026 14:23", status: "success", message: "Статья сгенерирована: 'Глобальная инфляция 2024...'" },
  { time: "26.02.2026 09:46", status: "success", message: "Видео загружено на YouTube, Vimeo, VK Video" },
  { time: "26.02.2026 05:09", status: "success", message: "Статья сгенерирована: 'Регулирование ИИ...'" },
  { time: "26.02.2026 00:32", status: "warning", message: "Rumble API: таймаут загрузки. Повтор через 5 мин." },
  { time: "25.02.2026 19:55", status: "success", message: "Статья сгенерирована: 'Энергетический переход...'" },
  { time: "25.02.2026 15:18", status: "error", message: "NewsAPI: лимит запросов превышен. Переключение на резерв." },
  { time: "25.02.2026 10:41", status: "success", message: "Статья сгенерирована: 'Многополярный мир 2025...'" },
];

type Page = "home" | "news" | "analysis" | "history" | "experts" | "dashboard" | "contacts" | "post";

function SacredGeometry() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.025 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <circle cx="600" cy="400" r="350" stroke="#228B22" strokeWidth="1" fill="none" />
      <circle cx="600" cy="400" r="270" stroke="#228B22" strokeWidth="0.8" fill="none" />
      <circle cx="600" cy="400" r="190" stroke="#228B22" strokeWidth="0.7" fill="none" />
      <circle cx="600" cy="400" r="110" stroke="#228B22" strokeWidth="0.5" fill="none" />
      <circle cx="600" cy="400" r="45" stroke="#228B22" strokeWidth="0.4" fill="none" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return <line key={angle} x1="600" y1="400" x2={600 + 350 * Math.cos(rad)} y2={400 + 350 * Math.sin(rad)} stroke="#228B22" strokeWidth="0.5" />;
      })}
      <polygon points="600,50 950,625 250,625" stroke="#228B22" strokeWidth="0.5" fill="none" />
      <polygon points="600,750 250,175 950,175" stroke="#228B22" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="200" stroke="#228B22" strokeWidth="0.4" fill="none" />
      <circle cx="1100" cy="700" r="200" stroke="#228B22" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <svg width={compact ? 32 : 44} height={compact ? 32 : 44} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#228B22" strokeWidth="1.2" opacity="0.15" />
        <circle cx="24" cy="24" r="15" stroke="#228B22" strokeWidth="0.7" opacity="0.1" />
        <path d="M24 7 C19 7 13 11 13 19 C13 25 17 29 24 31 C31 29 35 25 35 19 C35 11 29 7 24 7Z" fill="none" stroke="#228B22" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 14 Q24 9 31 14" fill="none" stroke="#228B22" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 10 Q24 3 34 10" fill="none" stroke="#228B22" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M11 7.5 Q24 0 37 7.5" fill="none" stroke="#228B22" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
        <path d="M16 20 L24 43 L32 20" fill="#228B22" opacity="0.85" />
        <line x1="13" y1="21" x2="35" y2="21" stroke="#228B22" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div>
        <div style={{ fontFamily: "'Cormorant', serif", fontSize: compact ? "13px" : "17px", fontWeight: 700, color: "#228B22", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1 }}>
          Talant Capital
        </div>
        <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: compact ? "7px" : "8.5px", color: "#2E7D32", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginTop: "3px", lineHeight: 1 }}>
          Territory of Conscious Deeds
        </div>
      </div>
    </div>
  );
}

function CategoryBadge({ cat }: { cat: string }) {
  const colors: Record<string, string> = { "Анализ": "#228B22", "История": "#1565C0", "Новости": "#B71C1C", "Эксперты": "#6A1B9A" };
  const c = colors[cat] || "#228B22";
  return (
    <span style={{ backgroundColor: `${c}18`, color: c, border: `1px solid ${c}30`, fontFamily: "'Golos Text', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", padding: "2px 10px", borderRadius: "100px" }}>
      {cat}
    </span>
  );
}

function ConfBar({ val }: { val: number }) {
  const c = val >= 85 ? "#228B22" : val >= 70 ? "#6B8E23" : "#B8860B";
  return (
    <div className="flex items-center gap-1.5">
      <div style={{ width: "40px", height: "3px", backgroundColor: "#E5E7EB", borderRadius: "9px", overflow: "hidden" }}>
        <div style={{ width: `${val}%`, height: "100%", backgroundColor: c, borderRadius: "9px" }} />
      </div>
      <span style={{ color: c, fontSize: "11px", fontWeight: 600, fontFamily: "'Golos Text', sans-serif" }}>{val}%</span>
    </div>
  );
}

function PostCard({ post, onClick }: { post: typeof MOCK_POSTS[0]; onClick: () => void }) {
  return (
    <article onClick={onClick} className="group cursor-pointer rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 18px rgba(34,139,34,0.07)" }}>
      <div className="relative overflow-hidden" style={{ height: "190px" }}>
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }} />
        <div className="absolute top-3 left-3 flex gap-2">
          <CategoryBadge cat={post.category} />
          {post.videoReady && (
            <span style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "white", fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "4px", backdropFilter: "blur(4px)" }}>
              <Icon name="Play" size={9} /> Видео
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3"><ConfBar val={post.confidence} /></div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 leading-snug mb-2.5 line-clamp-2 group-hover:text-green-800 transition-colors"
          style={{ fontFamily: "'Cormorant', serif", fontSize: "17px" }}>
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4" style={{ fontFamily: "'Golos Text', sans-serif" }}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3" style={{ color: "#9CA3AF", fontSize: "12px", fontFamily: "'Golos Text', sans-serif" }}>
            <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{post.date}</span>
            <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "#9CA3AF", fontSize: "12px", fontFamily: "'Golos Text', sans-serif" }}>
            <Icon name="Link" size={11} />{post.sources}
          </div>
        </div>
      </div>
    </article>
  );
}

function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const nav: { label: string; p: Page }[] = [
    { label: "Главная", p: "home" }, { label: "Новости", p: "news" }, { label: "Анализ", p: "analysis" },
    { label: "История", p: "history" }, { label: "Эксперты", p: "experts" }, { label: "Контакты", p: "contacts" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(34,139,34,0.08)", boxShadow: "0 1px 16px rgba(34,139,34,0.05)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <div onClick={() => setPage("home")}><Logo compact /></div>
        <nav className="hidden md:flex items-center gap-5">
          {nav.map((n) => (
            <button key={n.p} onClick={() => setPage(n.p)}
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13.5px", fontWeight: page === n.p ? 600 : 400, color: page === n.p ? "#228B22" : "#4B5563", letterSpacing: "0.03em", position: "relative", padding: "4px 0", background: "none", border: "none", cursor: "pointer" }}>
              {n.label}
              {page === n.p && <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "2px", backgroundColor: "#228B22", borderRadius: "9px" }} />}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage("dashboard")}
            className="hidden sm:flex items-center gap-1.5"
            style={{ backgroundColor: "#228B2218", color: "#228B22", border: "1px solid #228B2228", borderRadius: "10px", padding: "6px 12px", fontSize: "12px", fontWeight: 600, fontFamily: "'Golos Text', sans-serif", cursor: "pointer" }}>
            <Icon name="Settings" size={12} /> Админ
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", color: "#228B22", cursor: "pointer", padding: "4px" }}>
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-2" style={{ borderColor: "rgba(34,139,34,0.08)", backgroundColor: "white" }}>
          {nav.map((n) => (
            <button key={n.p} onClick={() => { setPage(n.p); setOpen(false); }}
              style={{ textAlign: "left", fontFamily: "'Golos Text', sans-serif", fontSize: "14px", color: page === n.p ? "#228B22" : "#374151", backgroundColor: page === n.p ? "#228B2210" : "transparent", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", fontWeight: page === n.p ? 600 : 400 }}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HomePage({ setPage, setCurrentPost }: { setPage: (p: Page) => void; setCurrentPost: (id: string) => void }) {
  const [secs, setSecs] = useState(277 * 60 - 43 * 60 - 17);
  useEffect(() => {
    const t = setInterval(() => setSecs((v) => (v > 0 ? v - 1 : 277 * 60)), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div style={{ background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 55%, #F0F7F0 100%)" }}>
      <section className="relative overflow-hidden" style={{ padding: "80px 16px 96px" }}>
        <SacredGeometry />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8"
            style={{ backgroundColor: "#228B2212", color: "#228B22", border: "1px solid #228B2222", borderRadius: "100px", padding: "7px 18px", fontSize: "13px", fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#228B22", animation: "pulse 2s infinite" }} />
            Следующая генерация через {hh}:{mm}:{ss}
          </div>
          <h1 className="font-bold text-gray-900 mb-6" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(30px, 5.5vw, 62px)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
            Предсказательная Аналитика<br />
            <span style={{ color: "#228B22" }}>100 Лет Истории</span> — Один Клик
          </h1>
          <p className="text-lg text-gray-500 mx-auto mb-10" style={{ fontFamily: "'Golos Text', sans-serif", maxWidth: "540px", lineHeight: 1.7 }}>
            Каждые 277 минут алгоритм TALANT CAPITAL анализирует мировые события, находит исторические параллели и предсказывает развитие.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setPage("news")}
              className="flex items-center gap-2 transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#228B22", color: "white", borderRadius: "12px", padding: "12px 24px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(34,139,34,0.28)" }}>
              <Icon name="Newspaper" size={17} /> Читать аналитику
            </button>
            <button onClick={() => setPage("dashboard")}
              className="flex items-center gap-2 transition-all hover:bg-green-50"
              style={{ backgroundColor: "white", color: "#228B22", borderRadius: "12px", padding: "12px 24px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "14px", border: "1px solid #228B2235", cursor: "pointer" }}>
              <Icon name="Zap" size={17} /> Запустить генерацию
            </button>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#FAFFFE", borderTop: "1px solid rgba(34,139,34,0.07)", borderBottom: "1px solid rgba(34,139,34,0.07)", padding: "28px 16px" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "FileText", val: "247", label: "Статей создано" },
            { icon: "TrendingUp", val: "89%", label: "Точность прогнозов" },
            { icon: "Globe", val: "100", label: "Лет истории" },
            { icon: "Clock", val: "277", label: "Минут цикл" },
          ].map((s) => (
            <div key={s.label} className="text-center py-3">
              <Icon name={s.icon} size={22} className="mx-auto mb-2" style={{ color: "#228B22" }} />
              <div style={{ fontFamily: "'Cormorant', serif", fontSize: "28px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11.5px", color: "#9CA3AF", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 16px 80px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "30px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Последние материалы</h2>
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF" }}>Автоматически сгенерированные аналитические статьи</p>
            </div>
            <button onClick={() => setPage("news")} className="hidden sm:flex items-center gap-1"
              style={{ color: "#228B22", fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
              Все статьи <Icon name="ArrowRight" size={15} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => { setCurrentPost(post.id); setPage("post"); }} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 16px 80px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden text-center p-12" style={{ backgroundColor: "#228B22", boxShadow: "0 20px 60px rgba(34,139,34,0.25)" }}>
            <SacredGeometry />
            <div className="relative">
              <div className="flex justify-center mb-5"><Logo /></div>
              <p style={{ color: "rgba(255,255,255,0.78)", fontFamily: "'Golos Text', sans-serif", fontSize: "15px", lineHeight: 1.75, maxWidth: "420px", margin: "0 auto 24px" }}>
                Аналитическая платформа, использующая исторические паттерны для предсказания будущего. Каждое событие — часть более длинного цикла.
              </p>
              <button style={{ backgroundColor: "white", color: "#228B22", borderRadius: "12px", padding: "11px 22px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "13.5px", border: "none", cursor: "pointer" }}>
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NewsPage({ setPage, setCurrentPost }: { setPage: (p: Page) => void; setCurrentPost: (id: string) => void }) {
  const [filter, setFilter] = useState("Все");
  const cats = ["Все", "Анализ", "История", "Новости", "Эксперты"];
  const filtered = filter === "Все" ? MOCK_POSTS : MOCK_POSTS.filter((p) => p.category === filter);
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "48px 16px 80px" }}>
      <div className="max-w-7xl mx-auto">
        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "38px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>Все Материалы</h1>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "32px" }}>
          {MOCK_POSTS.length} аналитических статей TALANT CAPITAL
        </p>
        <div className="flex gap-2 flex-wrap mb-8">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ backgroundColor: filter === c ? "#228B22" : "#228B2212", color: filter === c ? "white" : "#228B22", border: `1px solid ${filter === c ? "#228B22" : "#228B2225"}`, borderRadius: "100px", padding: "6px 16px", fontSize: "13px", fontWeight: 500, fontFamily: "'Golos Text', sans-serif", cursor: "pointer", transition: "all 0.15s" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => { setCurrentPost(post.id); setPage("post"); }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostPage({ setPage }: { setPage: (p: Page) => void }) {
  const post = MOCK_POSTS[0];
  const [imgIdx, setImgIdx] = useState(0);
  const images = [
    { url: "https://images.unsplash.com/photo-1543699935-2b39ab3a7e8c?w=800&q=80", caption: "Веймарская гиперинфляция 1923 года: очереди за хлебом в Берлине" },
    { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80", caption: "Нефтяной шок 1973: длинные очереди на бензоколонках в США" },
    { url: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80", caption: "Индекс потребительских цен 2020–2026: паттерн повторяется" },
  ];
  const sources = [
    { title: "IMF World Economic Outlook 2024", domain: "imf.org" },
    { title: "BIS Working Papers: Inflation History", domain: "bis.org" },
    { title: "Federal Reserve Historical Statistics", domain: "federalreserve.gov" },
    { title: "Wikipedia: Hyperinflation in the Weimar Republic", domain: "wikipedia.org" },
    { title: "NBER: Business Cycle Dating Committee", domain: "nber.org" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)" }}>
      <div className="max-w-3xl mx-auto px-4" style={{ padding: "48px 16px 80px" }}>
        <button onClick={() => setPage("news")} className="flex items-center gap-2 mb-8 transition-colors hover:text-green-700"
          style={{ color: "#228B22", fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="ArrowLeft" size={15} /> Все статьи
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <CategoryBadge cat={post.category} />
          <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{post.date} · {post.readTime}</span>
          <ConfBar val={post.confidence} />
        </div>

        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 700, color: "#111827", lineHeight: 1.15, marginBottom: "28px" }}>
          {post.title}
        </h1>

        <div className="rounded-2xl overflow-hidden mb-10" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.1)" }}>
          <img src={post.image} alt="" className="w-full object-cover" style={{ height: "280px" }} />
        </div>

        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "#374151", fontWeight: 500, marginBottom: "24px" }}>
          В феврале 2026 года мировая экономика переживает инфляционный цикл, структурно идентичный трём историческим периодам: веймарскому кризису 1923 года, нефтяному шоку 1973–1975 годов и азиатскому финансовому кризису 1997–1998 годов. Алгоритм TALANT CAPITAL, обученный на 100-летних экономических данных 47 стран, определил текущую фазу цикла с точностью 87%.
        </p>

        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "24px", fontWeight: 700, color: "#111827", margin: "36px 0 14px" }}>
          Исторические параллели: три кризиса, один паттерн
        </h2>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#4B5563", marginBottom: "18px" }}>
          Кризис 1923 года в Германии начался с внешнего шока (французская оккупация Рура), усиленного монетарной экспансией. Инфляция достигла 29 525% в месяц. Ключевым индикатором разворота стал переход центрального банка к жёсткой монетарной политике — именно то, что мы наблюдаем сегодня.
        </p>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#4B5563", marginBottom: "24px" }}>
          Нефтяной шок 1973 года создал стагфляционный паттерн, который ФРС потребовалось 7 лет для преодоления. Текущие данные указывают на более короткий цикл в 3–4 года благодаря более гибкой монетарной архитектуре. Исторические данные по 15 аналогичным эпизодам дают медианное время нормализации инфляции в 28 месяцев после пика.
        </p>

        <blockquote style={{ margin: "28px 0", padding: "20px 20px 20px 20px", borderLeft: "4px solid #228B22", borderRadius: "0 12px 12px 0", backgroundColor: "#228B2208" }}>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: "19px", fontStyle: "italic", color: "#374151", lineHeight: 1.65, marginBottom: "10px" }}>
            "Текущий инфляционный цикл следует паттерну 'сжатой пружины' — чем дольше удерживается давление, тем быстрее наступает нормализация. Исторически это всегда заканчивалось одинаково."
          </p>
          <cite style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontStyle: "normal", fontWeight: 600, color: "#228B22" }}>
            Арсен Мусаев <span style={{ fontWeight: 400, color: "#9CA3AF" }}>— Старший аналитик TALANT CAPITAL</span>
          </cite>
        </blockquote>

        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "24px", fontWeight: 700, color: "#111827", margin: "36px 0 14px" }}>
          Прогноз: четыре сценария развития
        </h2>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "#4B5563", marginBottom: "18px" }}>
          На основании анализа 47 исторических эпизодов инфляции выше 5% за последние 100 лет, алгоритм TALANT CAPITAL генерирует четыре сценария:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            { label: "Мягкая посадка", prob: "54%", color: "#228B22", desc: "Нормализация до 2–2.5% к Q3 2025" },
            { label: "Стагфляция", prob: "23%", color: "#B8860B", desc: "Затяжная инфляция, аналог 1973–1980" },
            { label: "Дефляционный риск", prob: "15%", color: "#1565C0", desc: "Резкое снижение спроса, аналог 1929" },
            { label: "Гиперинфляция", prob: "8%", color: "#B71C1C", desc: "Системный монетарный сбой" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "14px 16px", borderRadius: "12px", border: `1px solid ${s.color}22`, backgroundColor: `${s.color}08` }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 600, color: s.color }}>{s.label}</span>
                <span style={{ fontFamily: "'Cormorant', serif", fontSize: "20px", fontWeight: 700, color: s.color }}>{s.prob}</span>
              </div>
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#6B7280" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <blockquote style={{ margin: "28px 0", padding: "20px", borderLeft: "4px solid #228B22", borderRadius: "0 12px 12px 0", backgroundColor: "#228B2208" }}>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: "19px", fontStyle: "italic", color: "#374151", lineHeight: 1.65, marginBottom: "10px" }}>
            "История не повторяется буквально, но рифмует с точностью до структурных паттернов. Сегодня мы видим рифму с 1946–1948 годами — послевоенная нормализация, завершившаяся 'золотым веком' роста."
          </p>
          <cite style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontStyle: "normal", fontWeight: 600, color: "#228B22" }}>
            Лариса Ковалёва <span style={{ fontWeight: 400, color: "#9CA3AF" }}>— Историк-экономист</span>
          </cite>
        </blockquote>

        <div className="mb-10">
          <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Галерея</h3>
          <div className="rounded-2xl overflow-hidden mb-3" style={{ border: "1px solid rgba(34,139,34,0.1)" }}>
            <img src={images[imgIdx].url} alt="" className="w-full object-cover" style={{ height: "220px" }} />
          </div>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF", textAlign: "center", marginBottom: "12px" }}>{images[imgIdx].caption}</p>
          <div className="flex gap-2 justify-center">
            {images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ width: "64px", height: "40px", borderRadius: "8px", overflow: "hidden", border: i === imgIdx ? "2px solid #228B22" : "2px solid transparent", opacity: i === imgIdx ? 1 : 0.45, cursor: "pointer", padding: 0 }}>
                <img src={images[i].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(34,139,34,0.1)" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(34,139,34,0.1)", backgroundColor: "#FAFFFE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="flex items-center gap-2">
              <Icon name="Play" size={17} style={{ color: "#228B22" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>Видеоанализ: Инфляция через призму истории</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF" }}>2:47</span>
              {["YouTube", "Vimeo", "VK Video"].map((pl) => (
                <span key={pl} style={{ backgroundColor: "#228B2215", color: "#228B22", fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", fontFamily: "'Golos Text', sans-serif" }}>{pl}</span>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: "#111827", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}>
              <Icon name="Play" size={26} style={{ color: "white", marginLeft: "4px" }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Golos Text', sans-serif", fontSize: "13px" }}>Видео-анализ · YouTube</span>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center gap-2 mb-4" style={{ fontFamily: "'Cormorant', serif", fontSize: "20px", fontWeight: 700, color: "#111827" }}>
            <Icon name="Link" size={17} style={{ color: "#228B22" }} /> Источники ({sources.length})
          </h3>
          <div className="space-y-2">
            {sources.map((src, i) => (
              <a key={i} href="#" className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-green-50 group"
                style={{ border: "1px solid rgba(34,139,34,0.1)", textDecoration: "none" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "7px", backgroundColor: "#228B22", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, fontFamily: "'Golos Text', sans-serif", flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1F2937", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{src.title}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", color: "#9CA3AF" }}>{src.domain}</div>
                </div>
                <Icon name="ExternalLink" size={13} style={{ color: "#D1D5DB", flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Авторы анализа</h3>
          <div className="flex flex-wrap gap-3">
            {EXPERTS_DATA.slice(0, 3).map((e) => (
              <div key={e.name} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ border: "1px solid rgba(34,139,34,0.1)", backgroundColor: "#FAFFFE" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#228B22", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: 700, fontFamily: "'Cormorant', serif", flexShrink: 0 }}>{e.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>{e.name}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", color: "#9CA3AF" }}>{e.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisPage() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "48px 16px 80px" }}>
      <SacredGeometry />
      <div className="relative max-w-5xl mx-auto">
        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "38px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>Аналитика</h1>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "40px" }}>Методология предсказательного анализа</p>
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: "Search", title: "Поиск паттернов", desc: "Алгоритм сканирует 100 лет данных из 47 стран, находя структурно схожие события методом DTW.", step: "01" },
            { icon: "BarChart2", title: "Анализ исходов", desc: "Каждый паттерн анализируется по 23 параметрам: длительность, глубина, внешние факторы, разрешение.", step: "02" },
            { icon: "TrendingUp", title: "Прогноз", desc: "Взвешенная вероятность каждого сценария на основе ансамбля 15+ исторических аналогов.", step: "03" },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 18px rgba(34,139,34,0.07)" }}>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", fontWeight: 700, color: "#228B22", letterSpacing: "0.18em", opacity: 0.45, marginBottom: "12px" }}>ШАГ {item.step}</div>
              <Icon name={item.icon} size={26} style={{ color: "#228B22" }} className="mb-3" />
              <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 18px rgba(34,139,34,0.06)" }}>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Источники данных</h3>
            {["NewsAPI.org", "Wikipedia API", "IMF Data", "World Bank Open Data", "FRED Federal Reserve", "UN Statistics"].map((s) => (
              <div key={s} className="flex items-center gap-2 py-1.5" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#374151" }}>
                <Icon name="CheckCircle" size={13} style={{ color: "#228B22" }} /> {s}
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-2xl" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 18px rgba(34,139,34,0.06)" }}>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Публикация видео</h3>
            {["YouTube Data API v3", "Vimeo API", "VK Video API", "Rumble API", "TikTok Content API"].map((s) => (
              <div key={s} className="flex items-center gap-2 py-1.5" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#374151" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#228B22", flexShrink: 0 }} /> {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "20px 24px", borderRadius: "14px", backgroundColor: "#228B2208", border: "1px solid rgba(34,139,34,0.12)" }}>
          <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#228B22", fontWeight: 600, marginBottom: "6px" }}>Cron-расписание (Vercel)</div>
          <code style={{ fontFamily: "monospace", fontSize: "13px", color: "#374151" }}>{"*/277 * * * * → /api/cron/generate"}</code>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>Автоматический запуск каждые 277 минут: trending → анализ → статья → видео → публикация</p>
        </div>
      </div>
    </div>
  );
}

function HistoryPage({ setPage, setCurrentPost }: { setPage: (p: Page) => void; setCurrentPost: (id: string) => void }) {
  const timeline = [
    { year: "1923", event: "Гиперинфляция Веймарской Германии", relevance: "Инфляция 2022–2024" },
    { year: "1929", event: "Великая депрессия", relevance: "Дефляционный риск" },
    { year: "1945", event: "Послевоенная нормализация", relevance: "Постковидный рост" },
    { year: "1973", event: "Нефтяной шок ОПЕК", relevance: "Энергокризис 2022" },
    { year: "1997", event: "Азиатский финансовый кризис", relevance: "EM рынки 2024" },
    { year: "2008", event: "Мировой финансовый кризис", relevance: "Банковский сектор 2023" },
  ];
  const histPosts = MOCK_POSTS.filter((p) => p.category === "История" || p.category === "Анализ");
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "48px 16px 80px" }}>
      <div className="max-w-5xl mx-auto">
        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "38px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>100 Лет Истории</h1>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "40px" }}>Исторические параллели с текущими событиями</p>
        <div className="relative mb-14">
          <div style={{ position: "absolute", left: "16px", top: 0, bottom: 0, width: "1px", backgroundColor: "rgba(34,139,34,0.18)" }} />
          {timeline.map((item, i) => (
            <div key={item.year} className="relative flex gap-6 mb-7" style={{ paddingLeft: "48px" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#228B22", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700, fontFamily: "'Golos Text', sans-serif", zIndex: 1 }}>{i + 1}</div>
              <div style={{ flex: 1, padding: "14px 16px", borderRadius: "14px", backgroundColor: "white", border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 12px rgba(34,139,34,0.06)" }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", fontWeight: 700, color: "#228B22" }}>{item.year}</span>
                    <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "17px", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{item.event}</h3>
                  </div>
                  <span style={{ backgroundColor: "#228B2212", color: "#228B22", border: "1px solid #228B2222", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "100px", fontFamily: "'Golos Text', sans-serif", whiteSpace: "nowrap" }}>{item.relevance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>Статьи с историческим анализом</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {histPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => { setCurrentPost(post.id); setPage("post"); }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExpertsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "48px 16px 80px" }}>
      <div className="max-w-5xl mx-auto">
        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "38px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>Команда Экспертов</h1>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "40px" }}>Аналитики и исследователи TALANT CAPITAL</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {EXPERTS_DATA.map((e) => (
            <div key={e.name} className="bg-white p-5 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer"
              style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 18px rgba(34,139,34,0.07)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#228B22", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "17px", fontWeight: 700, fontFamily: "'Cormorant', serif", marginBottom: "14px" }}>{e.avatar}</div>
              <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "3px" }}>{e.name}</h3>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", fontWeight: 600, color: "#228B22", marginBottom: "8px" }}>{e.title}</div>
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12.5px", color: "#6B7280", lineHeight: 1.6, marginBottom: "12px" }}>{e.bio}</p>
              <div className="flex items-center gap-1" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF" }}>
                <Icon name="FileText" size={12} style={{ color: "#228B22" }} /> {e.articles} статей
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [generating, setGenerating] = useState(false);
  const [tab, setTab] = useState<"logs" | "keys" | "schedule">("logs");
  const apis = [
    { key: "NEWS_API_KEY", label: "NewsAPI.org", set: false },
    { key: "OPENAI_API_KEY", label: "OpenAI (статьи)", set: true },
    { key: "RUNWAY_API_KEY", label: "Runway ML (видео)", set: false },
    { key: "YOUTUBE_API_KEY", label: "YouTube Data API v3", set: true },
    { key: "VIMEO_ACCESS_TOKEN", label: "Vimeo API", set: false },
    { key: "VK_ACCESS_TOKEN", label: "VK Video API", set: true },
    { key: "SUPABASE_URL", label: "Supabase URL", set: true },
    { key: "SUPABASE_ANON_KEY", label: "Supabase Anon Key", set: true },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(155deg, #F8FAFC 0%, #FFFFFF 100%)", padding: "48px 16px 80px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "34px", fontWeight: 700, color: "#111827" }}>Панель управления</h1>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF" }}>Автоматическая генерация аналитических статей</p>
          </div>
          <button onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 3000); }} disabled={generating}
            className="flex items-center gap-2 transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: generating ? "#6B9E6B" : "#228B22", color: "white", borderRadius: "12px", padding: "11px 22px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(34,139,34,0.28)" }}>
            <Icon name={generating ? "Loader" : "Zap"} size={16} className={generating ? "animate-spin" : ""} />
            {generating ? "Генерация..." : "Запустить сейчас"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Статей за неделю", val: "12", icon: "FileText" },
            { label: "Активных API", val: "5/8", icon: "Key" },
            { label: "Следующий запуск", val: "3:42", icon: "Clock" },
            { label: "Точность прогнозов", val: "89%", icon: "Target" },
          ].map((s) => (
            <div key={s.label} className="bg-white p-4 rounded-2xl" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 12px rgba(34,139,34,0.07)" }}>
              <Icon name={s.icon} size={20} style={{ color: "#228B22" }} className="mb-2" />
              <div style={{ fontFamily: "'Cormorant', serif", fontSize: "26px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11.5px", color: "#9CA3AF", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 20px rgba(34,139,34,0.07)" }}>
          <div className="flex" style={{ borderBottom: "1px solid rgba(34,139,34,0.1)" }}>
            {(["logs", "keys", "schedule"] as const).map((id) => {
              const labels = { logs: "Логи", keys: "API ключи", schedule: "Расписание" };
              return (
                <button key={id} onClick={() => setTab(id)}
                  style={{ padding: "13px 20px", fontSize: "13px", fontWeight: tab === id ? 600 : 400, fontFamily: "'Golos Text', sans-serif", color: tab === id ? "#228B22" : "#6B7280", borderBottom: tab === id ? "2px solid #228B22" : "2px solid transparent", backgroundColor: tab === id ? "#228B2208" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s" }}>
                  {labels[id]}
                </button>
              );
            })}
          </div>
          <div style={{ padding: "20px" }}>
            {tab === "logs" && (
              <div className="space-y-2">
                {LOGS.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: log.status === "error" ? "#FEF2F2" : log.status === "warning" ? "#FFFBEB" : "#F0FDF4" }}>
                    <Icon name={log.status === "success" ? "CheckCircle" : log.status === "warning" ? "AlertTriangle" : "XCircle"} size={16}
                      style={{ color: log.status === "success" ? "#16A34A" : log.status === "warning" ? "#D97706" : "#DC2626", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#374151" }}>{log.message}</p>
                      <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "keys" && (
              <div className="grid sm:grid-cols-2 gap-3">
                {apis.map((api) => (
                  <div key={api.key} style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(34,139,34,0.1)", backgroundColor: "#FAFFFE" }}>
                    <div className="flex items-center justify-between mb-2">
                      <label style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", fontWeight: 600, color: "#374151" }}>{api.label}</label>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", fontFamily: "'Golos Text', sans-serif", backgroundColor: api.set ? "#DCFCE7" : "#F3F4F6", color: api.set ? "#16A34A" : "#6B7280" }}>
                        {api.set ? "✓ Активен" : "Не задан"}
                      </span>
                    </div>
                    <input type="password" placeholder="Введите ключ..." defaultValue={api.set ? "••••••••••••" : ""}
                      style={{ width: "100%", fontSize: "12px", padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(34,139,34,0.18)", fontFamily: "'Golos Text', sans-serif", backgroundColor: "white", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div className="sm:col-span-2 pt-1">
                  <button style={{ backgroundColor: "#228B22", color: "white", borderRadius: "10px", padding: "9px 18px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "13px", border: "none", cursor: "pointer" }}>
                    Сохранить ключи
                  </button>
                </div>
              </div>
            )}
            {tab === "schedule" && (
              <div className="space-y-3">
                <div style={{ padding: "14px 16px", borderRadius: "12px", backgroundColor: "#228B2208", border: "1px solid rgba(34,139,34,0.12)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontFamily: "'Cormorant', serif", fontSize: "17px", fontWeight: 700, color: "#111827" }}>Автогенерация каждые 277 минут</span>
                    <div className="flex items-center gap-1.5">
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
                      <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#16A34A", fontWeight: 600 }}>Активно</span>
                    </div>
                  </div>
                  <code style={{ fontFamily: "monospace", fontSize: "12px", color: "#6B7280" }}>{"*/277 * * * * → /api/cron/generate"}</code>
                </div>
                {[
                  { n: "1", title: "Получение трендов", desc: "NewsAPI → топ-5 событий → выбор наиболее значимого" },
                  { n: "2", title: "Исторический анализ", desc: "Wikipedia API + web_search → паттерны 100 лет → DTW" },
                  { n: "3", title: "Генерация статьи", desc: "OpenAI → 1200 слов: введение + анализ + история + прогноз" },
                  { n: "4", title: "Создание видео", desc: "Runway ML → сценарий → рендер 2–3 мин → S3" },
                  { n: "5", title: "Публикация везде", desc: "Supabase → YouTube + Vimeo + VK + Rumble + TikTok" },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 p-3 rounded-xl bg-white" style={{ border: "1px solid rgba(34,139,34,0.1)" }}>
                    <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#228B22", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, fontFamily: "'Golos Text', sans-serif", flexShrink: 0 }}>{s.n}</div>
                    <div>
                      <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>{s.title}</div>
                      <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: "100vh", background: "linear-gradient(155deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "48px 16px 80px" }}>
      <SacredGeometry />
      <div className="relative max-w-3xl mx-auto">
        <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "38px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>Контакты</h1>
        <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "40px" }}>Свяжитесь с командой TALANT CAPITAL</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "Mail", label: "Email", val: "info@talantcapital.com" },
            { icon: "Globe", label: "Сайт", val: "talantcapital.com" },
            { icon: "MapPin", label: "Офис", val: "Алматы, Казахстан" },
            { icon: "Phone", label: "Телефон", val: "+7 (727) 000-00-00" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 bg-white p-5 rounded-2xl"
              style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 14px rgba(34,139,34,0.06)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#228B2215", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={c.icon} size={18} style={{ color: "#228B22" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", color: "#9CA3AF" }}>{c.label}</div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-2xl" style={{ border: "1px solid rgba(34,139,34,0.1)", boxShadow: "0 2px 20px rgba(34,139,34,0.07)" }}>
          <h2 style={{ fontFamily: "'Cormorant', serif", fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>Написать нам</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[["Имя", "Ваше имя", "text"], ["Email", "your@email.com", "email"]].map(([label, ph, type]) => (
                <div key={label}>
                  <label style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", fontWeight: 500, color: "#4B5563", display: "block", marginBottom: "5px" }}>{label}</label>
                  <input type={type} placeholder={ph} style={{ width: "100%", fontSize: "13px", padding: "9px 12px", borderRadius: "10px", border: "1px solid rgba(34,139,34,0.18)", fontFamily: "'Golos Text', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", fontWeight: 500, color: "#4B5563", display: "block", marginBottom: "5px" }}>Сообщение</label>
              <textarea rows={4} placeholder="Ваш вопрос или предложение..." style={{ width: "100%", fontSize: "13px", padding: "9px 12px", borderRadius: "10px", border: "1px solid rgba(34,139,34,0.18)", fontFamily: "'Golos Text', sans-serif", outline: "none", resize: "none", boxSizing: "border-box" }} />
            </div>
            <button className="flex items-center gap-2"
              style={{ backgroundColor: "#228B22", color: "white", borderRadius: "10px", padding: "10px 20px", fontFamily: "'Golos Text', sans-serif", fontWeight: 600, fontSize: "13px", border: "none", cursor: "pointer" }}>
              <Icon name="Send" size={14} /> Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(34,139,34,0.08)", backgroundColor: "#FAFFFE", padding: "48px 16px 32px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo compact />
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12.5px", color: "#9CA3AF", lineHeight: 1.65, marginTop: "12px", maxWidth: "240px" }}>
              Аналитическая платформа предсказательной журналистики на основе 100-летних исторических данных.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>Разделы</div>
            {(["Главная", "Новости", "Анализ", "История", "Эксперты"] as const).map((label) => {
              const map: Record<string, Page> = { "Главная": "home", "Новости": "news", "Анализ": "analysis", "История": "history", "Эксперты": "experts" };
              return (
                <button key={label} onClick={() => setPage(map[label])}
                  style={{ display: "block", fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: "3px 0", transition: "color 0.15s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#228B22")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
                  {label}
                </button>
              );
            })}
          </div>
          <div>
            <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>Публикация видео</div>
            {["YouTube", "Vimeo", "VK Video", "Rumble", "TikTok"].map((s) => (
              <div key={s} className="flex items-center gap-1.5 py-0.5" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "#9CA3AF" }}>
                <Icon name="Video" size={11} style={{ color: "#228B22" }} /> {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(34,139,34,0.08)", paddingTop: "20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#D1D5DB" }}>© 2026 TALANT CAPITAL. Территория осознанных дел.</p>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "#D1D5DB" }}>Генерация каждые 277 минут · Supabase · Vercel</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [currentPost, setCurrentPost] = useState("1");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setCurrentPost={setCurrentPost} />;
      case "news": return <NewsPage setPage={setPage} setCurrentPost={setCurrentPost} />;
      case "analysis": return <AnalysisPage />;
      case "history": return <HistoryPage setPage={setPage} setCurrentPost={setCurrentPost} />;
      case "experts": return <ExpertsPage />;
      case "dashboard": return <DashboardPage />;
      case "contacts": return <ContactsPage />;
      case "post": return <PostPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} setCurrentPost={setCurrentPost} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "white" }}>
      <Header page={page} setPage={setPage} />
      <main style={{ flex: 1 }}>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}