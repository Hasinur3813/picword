import Container from "@/components/ui/Container";

const MOCK_CATEGORIES = [
  { name: "Daily Life", slug: "daily-life", icon: "🏠", wordCount: 45, description: "Essential words for everyday conversations" },
  { name: "Academic", slug: "academic", icon: "🎓", wordCount: 62, description: "Words commonly used in academic writing" },
  { name: "Business", slug: "business", icon: "💼", wordCount: 38, description: "Professional vocabulary for the workplace" },
  { name: "Technology", slug: "technology", icon: "💻", wordCount: 51, description: "Modern tech and digital terminology" },
  { name: "Emotions", slug: "emotions", icon: "💭", wordCount: 34, description: "Express feelings with precision" },
  { name: "Nature", slug: "nature", icon: "🌿", wordCount: 29, description: "Words describing the natural world" },
];

const STATS = [
  { label: "Words", value: "500+" },
  { label: "Categories", value: "12" },
  { label: "Visual Cards", value: "500+" },
];

const WORD_OF_THE_DAY = {
  word: "Ephemeral",
  phonetic: "/ɪˈfem(ə)rəl/",
  bengali: "ক্ষণস্থায়ী",
  meaning: "Lasting for a very short time",
  example: "The beauty of cherry blossoms is ephemeral, lasting only a few days each spring.",
  synonyms: ["Fleeting", "Transient", "Momentary"],
};

const TESTIMONIALS = [
  {
    name: "Rafiul Islam",
    role: "IELTS Candidate",
    avatar: "🧑‍🎓",
    quote: "The visual cards made abstract words finally click. I went from confusing 'affect' and 'effect' to using both confidently.",
  },
  {
    name: "Nusrat Jahan",
    role: "University Student",
    avatar: "👩‍💻",
    quote: "Categorized learning changed everything. I focus on Academic words before exams and Business words for internships.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Software Engineer",
    avatar: "👨‍💼",
    quote: "Picword's Bengali translations paired with real examples helped me actually retain vocabulary instead of just memorizing lists.",
  },
];

// Enable ISR revalidating every hour
export const revalidate = 3600;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Picword",
    url: "https://picword.app",
    description:
      "Master English vocabulary visually through curated categories, Bengali definitions, AI mnemonics, and interactive flashcards.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://picword.app/words?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Schema.org WebSite JSON-LD for Search Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* ───── Hero Section ───── */}
      <section className="relative z-10 flex flex-col items-center text-center pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container size="lg" className="flex flex-col items-center">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent-light rounded-full glass-sm mb-8">
              Visual Vocabulary Learning
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up"
            style={{ fontFamily: "var(--font-space-grotesk)", animationDelay: "0.1s" }}
          >
            <span className="gradient-text">Picword</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-muted max-w-2xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Master new words through curated categories. Each word comes with
            definitions, Bengali translations, example sentences, and visual
            memory anchors.
          </p>

          {/* Stats row */}
          <div
            className="flex items-center gap-8 sm:gap-12 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="text-2xl sm:text-3xl font-bold gradient-text"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm text-muted mt-1">{stat.label}</span>
                {i < STATS.length - 1 && (
                  <span className="hidden" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            
            <a  href="/words"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary-light hover:scale-105 glow-effect"
            >
            
              Explore Words
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* ───── Word of the Day Section ───── */}
      <section className="relative z-10 pb-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 items-center glass glow-effect rounded-3xl p-8 sm:p-12 animate-fade-in-up">
            {/* Left: label + intro */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent-light rounded-full glass-sm mb-5">
                Word of the Day
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Learn something <span className="gradient-text-glow">new, daily</span>
              </h2>
              <p className="text-muted leading-relaxed max-w-sm mx-auto lg:mx-0">
                Every day brings a fresh word with full context — definition,
                Bengali meaning, real usage, and synonyms — so vocabulary
                sticks, not just gets memorized.
              </p>
            </div>

            {/* Right: word card */}
            <div className="glass-sm rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <h3
                    className="text-3xl sm:text-4xl font-bold gradient-text"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {WORD_OF_THE_DAY.word}
                  </h3>
                  <span className="text-sm text-muted">{WORD_OF_THE_DAY.phonetic}</span>
                </div>

                <p className="text-lg text-accent-light font-medium mb-4">
                  {WORD_OF_THE_DAY.bengali}
                </p>

                <p className="text-base mb-4">{WORD_OF_THE_DAY.meaning}</p>

                <p className="text-sm text-muted italic leading-relaxed mb-5 border-l-2 border-primary/30 pl-4">
                  "{WORD_OF_THE_DAY.example}"
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  {WORD_OF_THE_DAY.synonyms.map((syn) => (
                    <span
                      key={syn}
                      className="text-xs px-3 py-1 rounded-full glass-sm text-muted"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───── Categories Section ───── */}
      <section id="categories" className="relative z-10 pb-24">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Browse by <span className="gradient-text-glow">Category</span>
            </h2>
            <p className="text-muted max-w-md mx-auto">
              Pick a category and start learning. Every word is a visual card
              designed to stick in your memory.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_CATEGORIES.map((cat, i) => (
              <article
                key={cat.slug}
                className="group glass glow-effect p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                {/* Icon + Word count */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <span className="text-xs text-muted glass-sm px-3 py-1 rounded-full">
                    {cat.wordCount} words
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="text-lg font-semibold mb-1.5 group-hover:text-accent-light transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed">
                  {cat.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-1 mt-4 text-sm text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Start learning
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── How It Works Section ───── */}
      <section className="relative z-10 pb-24">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              How <span className="gradient-text-glow">It Works</span>
            </h2>
            <p className="text-muted max-w-md mx-auto">
              A simple yet powerful learning flow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick a Category",
                desc: "Browse through curated categories like Daily Life, Academic, Business, and more.",
              },
              {
                step: "02",
                title: "Explore Words",
                desc: "Each word is a visual flashcard with meaning, translation, synonyms, and an image anchor.",
              },
              {
                step: "03",
                title: "Master & Review",
                desc: "Use the dashboard to track progress, review saved words, and reinforce your memory.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass-sm p-6 rounded-2xl text-center animate-fade-in-up"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <span className="inline-block text-sm font-bold gradient-text mb-3">
                  {item.step}
                </span>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Testimonials Section ───── */}
      <section className="relative z-10 pb-24">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Loved by <span className="gradient-text-glow">Learners</span>
            </h2>
            <p className="text-muted max-w-md mx-auto">
              Real progress from students, professionals, and exam candidates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="glass p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                {/* Quote mark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary/30 mb-3"
                >
                  <path
                    d="M9.5 8C6.5 8 4 10.5 4 13.5S6.5 19 9.5 19c0 2-1.5 3-3.5 3v1c4 0 6-2.5 6-6.5V13c0-2.8-1.1-5-2.5-5zm10 0c-3 0-5.5 2.5-5.5 5.5S16.5 19 19.5 19c0 2-1.5 3-3.5 3v1c4 0 6-2.5 6-6.5V13c0-2.8-1.1-5-2.5-5z"
                    fill="currentColor"
                  />
                </svg>

                <p className="text-sm text-muted leading-relaxed mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Closing CTA Banner ───── */}
  {/* ───── Closing CTA Banner ───── */}
<section className="relative z-10 pb-24">
  <Container size="lg">
    <div className="relative overflow-hidden rounded-3xl glass glow-effect text-center px-8 py-14 sm:py-16 animate-fade-in-up">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Ready to grow your <span className="gradient-text">vocabulary</span>?
        </h2>
        <p className="text-muted max-w-lg mx-auto mb-8">
          Join learners mastering English one visual word card at a time.
          No sign-up friction, just start exploring.
        </p>
        
        <a  href="/words"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-primary text-white font-medium transition-all hover:bg-primary-light hover:scale-105 glow-effect"
        >
          Start Learning Free
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </Container>
</section>
    </main>
  );
}