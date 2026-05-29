import { useState, useMemo } from "react";
import { Dress } from "../types";
import { DRESSES } from "../data";
import { Search, Star, SlidersHorizontal, Heart, X, Check, Calendar, ArrowRight } from "lucide-react";

interface CatalogProps {
  onSelectDressForBooking: (dress: Dress) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function Catalog({ onSelectDressForBooking, favorites, onToggleFavorite }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDress, setActiveDress] = useState<Dress | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // Filter options
  const categories = useMemo(() => ["All", "Casamento", "Formatura", "Debutante", "Gala / Coquetel"], []);
  const silhouettes = useMemo(() => ["All", "Sereia", "Princesa", "Evasê", "Fluído & Reto"], []);

  // Filter logic
  const filteredDresses = useMemo(() => {
    return DRESSES.filter((dress) => {
      const matchCategory = selectedCategory === "All" || dress.category === selectedCategory;
      const matchSilhouette = selectedSilhouette === "All" || dress.silhouette === selectedSilhouette;
      const matchSearch =
        dress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dress.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dress.fabrics.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSilhouette && matchSearch;
    });
  }, [selectedCategory, selectedSilhouette, searchQuery]);

  return (
    <section id="catalogo" className="py-20 bg-[#0a0a0a] text-[#f5f2ed] border-b border-[#f5f2ed]/10 scroll-mt-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Acervo Exclusivo</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">A Coleção Bella Festa</h2>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
          <p className="text-[#f5f2ed]/70 font-sans mt-4">
            Curadoria inspirada no requinte milanês e parisiense. Vestidos impecáveis para as ocasiões mais extraordinárias de sua vida.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#141414] border border-[#f5f2ed]/10 p-6 rounded-lg shadow-2xl mb-10 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por nome, tecido (ex: seda)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 rounded-md focus:outline-none focus:border-gold-400 font-sans text-sm text-[#f5f2ed] transition-all"
            />
          </div>

          {/* Filters select & pills */}
          <div className="flex flex-wrap gap-4 w-full md:w-auto items-center justify-start md:justify-end">
            <div className="flex items-center gap-2 text-[#f5f2ed]/60 text-sm font-sans mr-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-400" />
              <span>Filtros:</span>
            </div>

            {/* Category dropdown */}
            <div className="flex flex-col gap-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#0a0a0a] text-[#f5f2ed] border border-[#f5f2ed]/15 rounded-md px-3 py-2 font-sans text-sm focus:outline-none focus:border-gold-400"
              >
                <option value="All" className="bg-[#141414]">Todas as Ocasiões</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat} className="bg-[#141414]">{cat}</option>
                ))}
              </select>
            </div>

            {/* Silhouette dropdown */}
            <div className="flex flex-col gap-1">
              <select
                value={selectedSilhouette}
                onChange={(e) => setSelectedSilhouette(e.target.value)}
                className="bg-[#0a0a0a] text-[#f5f2ed] border border-[#f5f2ed]/15 rounded-md px-3 py-2 font-sans text-sm focus:outline-none focus:border-gold-400"
              >
                <option value="All" className="bg-[#141414]">Todas as Silhuetas</option>
                {silhouettes.slice(1).map((sil) => (
                  <option key={sil} value={sil} className="bg-[#141414]">{sil}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid Lists */}
        {filteredDresses.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-[#f5f2ed]/10 rounded-lg p-8 shadow-2xl">
            <p className="font-serif text-xl text-stone-400">Nenhum vestido encontrado na nossa curadoria com esses filtros.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSelectedSilhouette("All"); setSearchQuery(""); }}
              className="mt-4 px-6 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/10 text-white font-mono text-xs tracking-wider uppercase hover:border-gold-400 transition-all rounded"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDresses.map((dress) => {
              const isFav = favorites.includes(dress.id);
              return (
                <div
                  key={dress.id}
                  id={`dress-card-${dress.id}`}
                  className="group bg-[#141414] border border-[#f5f2ed]/10 rounded-lg overflow-hidden flex flex-col justify-between hover:border-gold-400 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Dress Image Box */}
                  <div className="relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Occasion Label */}
                    <span className="absolute left-4 top-4 bg-black/8 w-auto bg-opacity-70 backdrop-blur-md text-white px-3 py-1 font-mono text-[10px] tracking-wider uppercase border border-[#f5f2ed]/10 rounded-sm">
                      {dress.category}
                    </span>

                    {/* Like button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(dress.id);
                      }}
                      className="absolute right-4 top-4 p-2 rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-lg bg-black/60 hover:bg-black/90 text-[#f5f2ed] border border-[#f5f2ed]/15"
                    >
                      <Heart
                        className={`w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "text-[#f5f2ed]/80"}`}
                      />
                    </button>
                  </div>

                  {/* Description Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-gold-400 tracking-wider uppercase">{dress.silhouette}</span>
                      <div className="flex items-center gap-1 text-gold-400 text-xs font-mono">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{dress.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl text-white group-hover:text-gold-400 transition-colors mb-2">
                      {dress.name}
                    </h3>
                    
                    <p className="text-[#f5f2ed]/70 font-sans text-sm line-clamp-2 mb-4 flex-grow">
                      {dress.description}
                    </p>

                    <div className="border-t border-[#f5f2ed]/10 pt-4 mt-auto">
                      <div className="text-xs font-mono text-gold-400 font-semibold mb-4">{dress.priceRange}</div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setActiveDress(dress);
                            setSelectedColorIndex(0);
                          }}
                          className="flex-1 px-4 py-2.5 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-white font-sans text-xs tracking-wider hover:bg-[#1a1a1a] font-medium transition-all text-center rounded-sm uppercase"
                        >
                          Ver Detalhes
                        </button>
                        <button
                          onClick={() => onSelectDressForBooking(dress)}
                          className="flex-1 px-4 py-2.5 bg-[#ba942b] hover:bg-gold-400 text-black font-sans text-xs tracking-wider font-bold transition-all text-center rounded-sm uppercase"
                        >
                          Agendar Prova
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Dress Modal overlay */}
        {activeDress && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#141414] border border-[#f5f2ed]/15 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn flex flex-col md:flex-row text-[#f5f2ed]">
              {/* Close Button */}
              <button
                onClick={() => setActiveDress(null)}
                className="absolute right-4 top-4 z-10 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#f5f2ed]/15 text-[#f5f2ed] p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto md:h-auto bg-[#0a0a0a] relative">
                <img
                  src={activeDress.image}
                  alt={activeDress.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute left-4 top-4 bg-[#0a0a0a]/90 text-white border border-[#f5f2ed]/10 px-3 py-1 font-mono text-xs tracking-wider uppercase rounded-sm">
                  {activeDress.category}
                </span>
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gold-400 tracking-wider uppercase font-semibold">
                      {activeDress.silhouette}
                    </span>
                    <span className="text-[#f5f2ed]/20">•</span>
                    <div className="flex items-center gap-1 text-gold-400 text-xs font-mono">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{activeDress.rating.toFixed(1)} de Curadoria</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 border-b border-[#f5f2ed]/10 pb-3">
                    {activeDress.name}
                  </h3>

                  <p className="text-[#f5f2ed]/80 font-sans text-sm leading-relaxed mb-6 font-light">
                    {activeDress.description}
                  </p>

                  {/* Fabrics tag list */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono tracking-wider text-[#f5f2ed]/60 uppercase mb-2">Tecidos de Alta Costura:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDress.fabrics.map((fab, idx) => (
                        <span key={idx} className="bg-[#0a0a0a] text-[#f5f2ed]/90 border border-[#f5f2ed]/10 font-sans text-xs px-2.5 py-1 rounded-sm">
                          {fab}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colors Selector */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono tracking-wider text-[#f5f2ed]/60 uppercase mb-2">
                      Cores Disponíveis para Ajuste:
                    </h4>
                    <div className="flex gap-3">
                      {activeDress.colors.map((col, idx) => (
                        <button
                          key={idx}
                          title={col.name}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColorIndex === idx ? "border-gold-400 scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: col.hex }}
                        >
                          {selectedColorIndex === idx && (
                            <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                          )}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-[#f5f2ed]/60 mt-1.5 block">
                      Tom selecionado: <strong className="text-white">{activeDress.colors[selectedColorIndex]?.name}</strong>
                    </span>
                  </div>

                  {/* Exclusivity specifications */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono tracking-wider text-[#f5f2ed]/60 uppercase mb-2">Especificações do Atelier:</h4>
                    <ul className="space-y-2">
                      {activeDress.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#f5f2ed]/80 font-sans leading-relaxed">
                          <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[#f5f2ed]/10 pt-6 mt-6">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs text-[#f5f2ed]/60 font-sans">Condições</span>
                    <span className="text-sm font-semibold text-gold-400 font-sans">{activeDress.priceRange}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        onSelectDressForBooking(activeDress);
                        setActiveDress(null);
                      }}
                      className="w-full col-span-2 py-3 bg-gold-400 text-black hover:bg-gold-300 font-sans text-sm font-bold transition-all rounded-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Experiência de Prova</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
