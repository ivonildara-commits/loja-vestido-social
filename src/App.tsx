import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dress, Appointment } from "./types";
import { DRESSES, CLIENT_TESTIMONIALS } from "./data";
import Catalog from "./components/Catalog";
import AIAdviser from "./components/AIAdviser";
import BookingForm from "./components/BookingForm";
import {
  Scissors,
  Sparkles,
  Calendar,
  Heart,
  ChevronRight,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Award,
  ShieldCheck,
  Compass,
  ArrowRight,
  Star
} from "lucide-react";

export default function App() {
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);

  // Load state from localStorage if available
  useEffect(() => {
    const savedFavs = localStorage.getItem("bella_festa_favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedApts = localStorage.getItem("bella_festa_appointments");
    if (savedApts) setAppointments(JSON.parse(savedApts));
  }, []);

  const handleToggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("bella_festa_favorites", JSON.stringify(updated));
  };

  const handleAddAppointment = (newApt: Appointment) => {
    const updated = [newApt, ...appointments];
    setAppointments(updated);
    localStorage.setItem("bella_festa_appointments", JSON.stringify(updated));
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("bella_festa_appointments", JSON.stringify(updated));
  };

  const handleSelectDressForBooking = (dress: Dress) => {
    setSelectedDress(dress);
    // Smooth scroll to booking section
    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroNext = () => {
    setActiveHeroSlide((prev) => (prev + 1) % 2);
  };

  // Pre-selected dresses from lists to showcase in quick-scroll collections
  const bestSellers = DRESSES.filter((d) => d.rating === 5.0 && d.id !== "dress-emerald");

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-[#f5f2ed] scroll-smooth antialiased">
      {/* 1. STICKY TOP NAVIGATION BAR */}
      <nav id="navbar-main" className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#f5f2ed]/10 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Atelier Brand Logo */}
          <a href="#inicio" className="flex flex-col text-left group">
            <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-medium text-white group-hover:text-gold-400 transition-colors uppercase">
              Atelier Bella Festa
            </span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold-400 uppercase mt-0.5">
              Haute Couture di Lusso
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex gap-8 items-center text-xs tracking-widest font-mono uppercase text-[#f5f2ed]/70">
            <a href="#comecoes" className="hover:text-gold-400 transition-colors">Ideia</a>
            <a href="#catalogo" className="hover:text-gold-400 transition-colors">Coleção</a>
            <a href="#provador" className="hover:text-gold-400 transition-colors flex items-center gap-1 bg-[#141414] px-3 py-1.5 rounded border border-[#f5f2ed]/10 hover:border-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Provador Virtual</span>
            </a>
            <a href="#depoimentos" className="hover:text-gold-400 transition-colors">Opiniões</a>
            <a href="#agendamento" className="hover:text-gold-400 transition-colors flex items-center gap-1 bg-gold-400 text-[#000000] px-4 py-2 hover:bg-gold-300 font-bold tracking-widest transition-all rounded">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Prova</span>
            </a>
          </div>

          {/* Quick Stats: Favorites indicator */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
              }}
              title="Ir para os meus favoritos"
              className="relative p-2 rounded-full hover:bg-[#141414] border border-[#f5f2ed]/5 transition-colors text-[#f5f2ed]"
            >
              <Heart className={`w-5.5 h-5.5 ${favorites.length > 0 ? "fill-rose-500 text-rose-500" : "text-[#f5f2ed]/80"}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-400 text-black font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAJESTIC HERO SLIDER */}
      <section id="inicio" className="bg-[#0a0a0a] text-white min-h-[85vh] relative flex items-center overflow-hidden border-b border-[#f5f2ed]/10">
        {/* Animated Background Particle Mesh */}
        <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden opacity-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-900 via-[#0a0a0a] to-[#0a0a0a]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 relative z-10 w-full items-center">
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
                Estilo Sob Medida • São Paulo Jardins
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-tight">
                Vista a sua melhor <br />
                <span className="italic font-normal text-gold-300">História de Sonho</span>
              </h1>
              <div className="w-20 h-[1.5px] bg-gold-400"></div>
              <p className="text-stone-400 font-sans text-sm md:text-base leading-relaxed max-w-lg">
                Vestidos de gala, noivas, madrinhas e debutantes modelados com técnicas de alta costura tradicional. Descubra a combinação entre o luxo clássico e a inteligência do nosso ateliê exclusivo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href="#catalogo"
                className="px-8 py-3.5 bg-gold-400 hover:bg-gold-300 text-black duration-350 cursor-pointer font-sans font-bold text-xs uppercase tracking-widest text-center shadow-lg rounded-sm"
              >
                Explorar Acervo de Vestidos
              </a>
              <a
                href="#provador"
                className="px-8 py-3.5 bg-[#141414] border border-[#f5f2ed]/10 hover:bg-[#1a1a1a] text-white cursor-pointer font-sans font-semibold text-xs uppercase tracking-widest text-center duration-300 rounded-sm"
              >
                Provador Virtual Inteligente
              </a>
            </motion.div>
          </div>

          {/* Hero Dress Display Frame */}
          <div className="lg:col-span-6 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-stone-800/60"
            >
              <img
                src="/src/assets/images/hero_luxury_dress_1780012097716.png"
                alt="Imperial Emerald Dress Hero"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-float"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent p-6 flex justify-between items-end">
                <div>
                  <h4 className="font-serif text-lg text-white">Masterpiece Imperial Esmeralda</h4>
                  <p className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Fluído &amp; Reto • Seda Pura Italiana</p>
                </div>
                <button
                  onClick={() => {
                    const em = DRESSES.find(d => d.id === "dress-emerald");
                    if (em) handleSelectDressForBooking(em);
                  }}
                  className="p-3 bg-white hover:bg-gold-500 text-stone-950 rounded-full transition-all hover:scale-105 duration-200"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID / ATELIER PHILOSOPHY */}
      <section id="comecoes" className="py-24 bg-[#0a0a0a] text-[#f5f2ed] border-b border-[#f5f2ed]/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section title */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Savoir-Faire</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">A Experiência Artesanal</h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#141414] border border-[#f5f2ed]/10 hover:border-gold-400 hover:shadow-2xl rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#f5f2ed]/10 flex items-center justify-center text-gold-400 mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Modelagem Sob Medida</h3>
              <p className="text-stone-400 font-sans text-sm leading-relaxed">
                Técnicas de moulage e altíssima alfaiataria que ajustam o drapeado perfeitamente às suas dimensões e preferências de caimento.
              </p>
            </div>

            <div className="p-8 bg-[#141414] border border-[#f5f2ed]/10 hover:border-gold-400 hover:shadow-2xl rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#f5f2ed]/10 flex items-center justify-center text-gold-400 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Tecidos Nobres Selecionados</h3>
              <p className="text-stone-400 font-sans text-sm leading-relaxed">
                Importamos seda natural pura, renda chantilly francesa e tule ilusion ultraleve das mais prestigiadas tecelagens de Milão e Lyon.
              </p>
            </div>

            <div className="p-8 bg-[#141414] border border-[#f5f2ed]/10 hover:border-gold-400 hover:shadow-2xl rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#f5f2ed]/10 flex items-center justify-center text-gold-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Estilista Virtual IA</h3>
              <p className="text-stone-400 font-sans text-sm leading-relaxed">
                Nossa exclusiva ferramenta de visagismo digital e análise cromática com IA para recomendar joias, tecidos e tons ideais para sua pele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN DRESS CATALOG SECTOR */}
      <Catalog
        onSelectDressForBooking={handleSelectDressForBooking}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 5. AI ADVISER & INTERACTIVE STYLE FITTING SESSION */}
      <AIAdviser />

      {/* 6. BEST SELLERS SCROLL BAR */}
      <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden border-b border-[#f5f2ed]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Favoritos das Estilistas</span>
              <h3 className="font-serif text-3xl md:text-4xl text-white mt-2">Destaques da Alta Costura</h3>
            </div>
            <a href="#catalogo" className="text-xs font-mono tracking-wider text-gold-400 hover:text-gold-300 uppercase flex items-center gap-1.5 mt-2 md:mt-0 font-bold border-b border-gold-400 pb-0.5">
              <span>Ver acervo completo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((dress) => (
              <div
                key={dress.id}
                onClick={() => handleSelectDressForBooking(dress)}
                className="group cursor-pointer bg-[#141414] hover:bg-[#1a1a1a] border border-[#f5f2ed]/10 hover:border-gold-400 p-4 rounded hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[3/4] rounded overflow-hidden bg-stone-900 relative mb-4">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <span className="absolute left-3 top-3 bg-[#0a0a0a] border border-[#f5f2ed]/10 text-white font-mono text-[9px] px-2 py-0.5 rounded tracking-wide uppercase">
                    {dress.silhouette}
                  </span>
                </div>
                <h4 className="font-serif text-base text-white group-hover:text-gold-400 transition-colors">
                  {dress.name}
                </h4>
                <p className="text-[11px] font-mono text-gold-400 mt-1">{dress.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS SECTION */}
      <section id="depoimentos" className="py-24 bg-[#0a0a0a] text-[#f5f2ed] border-b border-[#f5f2ed]/10 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Validação Real</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-3 text-white">Histórias Inspiradoras</h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLIENT_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-[#141414] border border-[#f5f2ed]/10 p-8 rounded-lg relative flex flex-col justify-between shadow-2xl hover:border-gold-400 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex text-gold-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed italic">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-[#f5f2ed]/10 pt-6 mt-6">
                  {test.avatar && (
                    <img
                      src={test.avatar}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-full border border-[#f5f2ed]/10"
                    />
                  )}
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs">{test.name}</h4>
                    <span className="text-[10px] text-stone-400 font-mono tracking-wide uppercase">{test.role}</span>
                    <span className="text-[10px] text-gold-400 block font-sans mt-0.5">Vestiu: {test.dress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE SCHEDULING FORM CONTAINER */}
      <BookingForm
        selectedDress={selectedDress}
        onClearSelectedDress={() => setSelectedDress(null)}
        appointments={appointments}
        onAddAppointment={handleAddAppointment}
        onCancelAppointment={handleCancelAppointment}
      />

      {/* 9. LUXURIOUS FOOTER */}
      <footer className="bg-stone-950 text-white pt-20 pb-8 border-t border-stone-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-stone-900">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="font-serif text-2xl tracking-widest uppercase text-white">Atelier Bella Festa</h4>
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400 uppercase mt-1 block">Alta Costura Sob Medida</span>
            <p className="text-stone-400 font-sans text-xs leading-relaxed max-w-sm mt-3">
              Desde 2018 esculpindo sonhos em forma de vestidos refinados para casamentos, formaturas, debutantes e noites de gala nos Jardins, São Paulo.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 transition-colors rounded-full text-stone-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 transition-colors rounded-full text-stone-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs tracking-widest text-gold-400 uppercase font-bold">Navegação Rápida</h5>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li><a href="#comecoes" className="hover:text-gold-400 transition-colors">Artesanato</a></li>
              <li><a href="#catalogo" className="hover:text-gold-400 transition-colors">Acervo de Peças</a></li>
              <li><a href="#provador" className="hover:text-gold-400 transition-colors">Virtual Advisory IA</a></li>
              <li><a href="#agendamento" className="hover:text-gold-400 transition-colors">Marcar Prova</a></li>
            </ul>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs tracking-widest text-gold-400 uppercase font-bold">Contato Presencial</h5>
            <ul className="space-y-2 text-xs text-stone-400 font-sans leading-relaxed">
              <li className="flex gap-2 items-start">
                <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Al. Lorena, 1420 - Jardins, São Paulo - SP</span>
              </li>
              <li>📞 (11) 3218-4000</li>
              <li>📲 WhatsApp: (11) 98012-4040</li>
              <li>✉️ contato@bellafesta.com.br</li>
            </ul>
          </div>
        </div>

        {/* Trademarks & copyright */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-500 font-sans text-xs">
          <span>&copy; {new Date().getFullYear()} Atelier Bella Festa - São Paulo Jardins. Todos os direitos reservados.</span>
          <span className="flex items-center gap-1.5 mt-2 md:mt-0">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Código de Ética & Fila Segura Conectados</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
