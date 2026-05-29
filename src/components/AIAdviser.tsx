import React, { useState } from "react";
import { AdviserResponse } from "../types";
import { Sparkles, Scissors, Wand2, RefreshCw, CheckCircle, Check } from "lucide-react";

export default function AIAdviser() {
  const [activeTab, setActiveTab] = useState<"advice" | "studio">("advice");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [result, setResult] = useState<AdviserResponse | null>(null);

  // Form states for advisory
  const [occasion, setOccasion] = useState<string>("Casamento (Madrinha)");
  const [bodyType, setBodyType] = useState<string>("Ampulheta (Equilibrada)");
  const [stylePref, setStylePref] = useState<string>("Clássico e Sofisticado");
  const [colors, setColors] = useState<string>("Verde Esmeralda ou Azul Royal");
  const [materials, setMaterials] = useState<string>("Seda com leve fluidez");
  const [dreamDescription, setDreamDescription] = useState<string>("");

  // States for custom studio sketch
  const [selectedNeckline, setSelectedNeckline] = useState<string>("Coração Sutil");
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>("Princesa do Mar");
  const [selectedFabric, setSelectedFabric] = useState<string>("Seda Imperial");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({
    name: "Vinho Borgonha",
    hex: "#5C061C",
  });
  const [embroideryStyle, setEmbroideryStyle] = useState<string>("Cristais Discretos");

  const colorsPalette = [
    { name: "Vinho Borgonha", hex: "#5C061C" },
    { name: "Verde Esmeralda", hex: "#064E3B" },
    { name: "Azul Safira", hex: "#0F2042" },
    { name: "Champagne Dourado", hex: "#D4AF37" },
    { name: "Rosé Blush", hex: "#E8C1B5" },
    { name: "Preto Ônix", hex: "#1A1A1A" },
  ];

  const triggerAnimation = async () => {
    setLoading(true);
    setResult(null);

    const steps = [
      "Analisando fisionomia e proporções...",
      "Cortando moldes sob medida no Ateliê Digital...",
      "Cruzando referências com a moda de Milão e Paris...",
      "Redigindo dossiê completo pela nossa Estilista-Chefe..."
    ];

    for (const step of steps) {
      setLoadingStep(step);
      await new Promise((res) => setTimeout(res, 1200));
    }
  };

  const handleFetchAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerAnimation();

    try {
      const response = await fetch("/api/adviser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion,
          bodyType,
          silhouette: "Drapeado sob medida",
          stylePref,
          colors,
          materials,
          dreamDescription
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        recommendationLetter: "Minha querida cliente, é um prazer imenso traduzir em vestido sua essência única. Para o estilo Clássico e Sofisticado, nós visualizamos um drapeado majestoso que ressalta os ombros esculpidos com refinamento de costura artesanal. O tecido nobre desliza como brisa na passarela de seus passos solenes.",
        idealSilhouettes: ["Sereia Imperial", "Reto Grego Fluído"],
        suggestedColors: ["Verde Esmeralda", "Uva Real", "Champagne Rosé"],
        accessoriesAdvice: "Adicione brincos de brilhante em cascata, sandália ouro-velho de salto fino e uma clutch rígida de cetim estruturado.",
        makeupAndHair: "Cabelo preso em coque chignon clássico francês e maquiagem dramática com delineado marcado e batom cor de boca de alta fixação."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudioDress = async () => {
    await triggerAnimation();

    try {
      const response = await fetch("/api/adviser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: "Baile de Gala e Alta Noite",
          bodyType: "Medida Exclusiva do Estúdio Bella Festa",
          silhouette: selectedSilhouette,
          stylePref: `Alta costura romântica com decote ${selectedNeckline}`,
          colors: selectedColor.name,
          materials: selectedFabric,
          dreamDescription: `Vestido exclusivo desenhado no Studio. Silhueta ${selectedSilhouette}, tecido ${selectedFabric}, decote ${selectedNeckline}, detalhes de ${embroideryStyle}`
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        recommendationLetter: `Magnífico desenho conceitual! O seu modelo combina o decote ${selectedNeckline} com a suntuosa silhueta ${selectedSilhouette}. Confeccionado em ${selectedFabric} em tom de ${selectedColor.name}, este design é ideal para ocasiões de extremo requinte e reflete o auge do design artesanal.`,
        idealSilhouettes: [selectedSilhouette, "Evasê Drapeado"],
        suggestedColors: [selectedColor.name, "Ouro Champagne", "Bronze Renascentista"],
        accessoriesAdvice: "Opte por joias de marcassita para dar um toque antique, uma clutch geométrica de veludo preto e sapatos de bico fino combinando.",
        makeupAndHair: "Para este design de alta-costura, sugerimos cabelos semi-presos com ondas românticas e maquiagem suave com foco em olhos dourados radiantes."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="provador" className="py-24 bg-[#0a0a0a] text-[#f5f2ed] border-b border-[#f5f2ed]/10 scroll-mt-10 overflow-hidden relative">
      {/* Decorative Golden Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fadeIn">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Consultoria Inteligente</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">Ateliê Virtual & Dossiê de Estilo</h2>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
          <p className="text-[#f5f2ed]/70 font-sans mt-4 text-sm md:text-base">
            Combine a tradição artesanal de nossa equipe com a precisão de nossa curadoria inteligente para projetar o modelo perfeito para sua silhueta.
          </p>
        </div>

        {/* Feature selection tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#141414] p-1.5 rounded-full border border-[#f5f2ed]/10 flex">
            <button
              onClick={() => { setActiveTab("advice"); setResult(null); }}
              className={`px-6 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all ${
                activeTab === "advice"
                  ? "bg-gold-400 text-black font-bold shadow-2xl"
                  : "text-[#f5f2ed]/60 hover:text-white"
              }`}
            >
              Provador &amp; Estilista IA
            </button>
            <button
              onClick={() => { setActiveTab("studio"); setResult(null); }}
              className={`px-6 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all ${
                activeTab === "studio"
                  ? "bg-gold-400 text-black font-bold shadow-2xl"
                  : "text-[#f5f2ed]/60 hover:text-white"
              }`}
            >
              Estúdio de Croquis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel: Form/Interactive design space */}
          <div className="lg:col-span-5 bg-[#141414] border border-[#f5f2ed]/10 p-8 rounded-xl shadow-2xl relative">
            {activeTab === "advice" ? (
              <form onSubmit={handleFetchAdvice} className="space-y-6">
                <div className="flex items-center gap-2 text-gold-400 border-b border-[#f5f2ed]/10 pb-4 mb-4">
                  <Wand2 className="w-5 h-5" />
                  <h3 className="font-serif text-lg text-white">Guia de Ajuste e Consultoria</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">1. Qual a Grande Ocasião?</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                  >
                    <option className="bg-[#141414]">Casamento (Madrinha)</option>
                    <option className="bg-[#141414]">Casamento (Convidada)</option>
                    <option className="bg-[#141414]">Formatura (Formanda Principal)</option>
                    <option className="bg-[#141414]">Formatura (Convidada)</option>
                    <option className="bg-[#141414]">Debutante / Baile de 15 Anos</option>
                    <option className="bg-[#141414]">Gala Executivo / Coquetel Premium</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">2. Estrutura Biotipo Corporal</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                  >
                    <option className="bg-[#141414]">Ampulheta (Busto e quadris equilibrados, cintura fina)</option>
                    <option className="bg-[#141414]">Triunfo/Triângulo (Quadril mais acentuado que os ombros)</option>
                    <option className="bg-[#141414]">Triângulo Invertido (Ombros mais proeminentes que quadril)</option>
                    <option className="bg-[#141414]">Retângulo (Ombros, cintura e quadril na mesma linha)</option>
                    <option className="bg-[#141414]">Oval (Região abnominal mais suave e arredondada)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">3. Estilo Desejado para Impacto</label>
                  <select
                    value={stylePref}
                    onChange={(e) => setStylePref(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                  >
                    <option className="bg-[#141414]">Clássico e Sofisticado (Elegância Atemporal)</option>
                    <option className="bg-[#141414]">Audacioso e Glamouroso (Sensual Moderno)</option>
                    <option className="bg-[#141414]">Romântico e Delicado (Rendas e Fluidezes)</option>
                    <option className="bg-[#141414]">Minimalista Contemporâneo (Cortes Prístinos, Sem Excesso)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Cores em Mente</label>
                    <input
                      type="text"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      placeholder="Ex: Marsala, Ouro"
                      className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Tecido Desejado</label>
                    <input
                      type="text"
                      value={materials}
                      onChange={(e) => setMaterials(e.target.value)}
                      placeholder="Ex: Seda, Tule"
                      className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Vestido dos Sonhos (Livre)</label>
                  <textarea
                    rows={2}
                    value={dreamDescription}
                    onChange={(e) => setDreamDescription(e.target.value)}
                    placeholder="Quero um vestido com gola alta, cauda longa e bordados de fita..."
                    className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-400 resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold-400 text-black hover:bg-gold-300 font-sans font-bold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer duration-200 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Dossiê de Alta Costura</span>
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gold-400 border-b border-[#f5f2ed]/10 pb-4 mb-4">
                  <Scissors className="w-5 h-5" />
                  <h3 className="font-serif text-lg text-white">Estúdio Criador de Esboço</h3>
                </div>

                {/* Interactive dress builder */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Decote &amp; Gola</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Coração Sutil", "Tomara que Caia", "Ombro a Ombro"].map((nec) => (
                        <button
                          key={nec}
                          onClick={() => setSelectedNeckline(nec)}
                          className={`py-2 px-1 text-[11px] font-sans rounded transition-all border ${
                            selectedNeckline === nec
                              ? "bg-gold-400/20 text-gold-400 border-gold-400 font-semibold"
                              : "bg-[#0a0a0a] border-[#f5f2ed]/15 text-[#f5f2ed]/70 hover:text-white"
                          }`}
                        >
                          {nec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Silhueta do Modelo</span>
                    <div className="grid grid-cols-2 gap-2">
                      {["Princesa Cleópatra", "Sereia Sutil", "Evasê Dramático", "Grego Imperador"].map((sil) => (
                        <button
                          key={sil}
                          onClick={() => setSelectedSilhouette(sil)}
                          className={`py-2 px-2 text-xs font-sans rounded transition-all border ${
                            selectedSilhouette === sil
                              ? "bg-gold-400/20 text-gold-400 border-gold-400 font-semibold"
                              : "bg-[#0a0a0a] border-[#f5f2ed]/15 text-[#f5f2ed]/70 hover:text-white"
                          }`}
                        >
                          {sil}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Tecido Base do Molde</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Seda Imperial", "Tulle Ilusion", "Veludo Parisiense", "Crepe Dior", "Renda Chantilly"].map((fab) => (
                        <button
                          key={fab}
                          onClick={() => setSelectedFabric(fab)}
                          className={`py-2 px-1 text-[10px] font-sans rounded transition-all border ${
                            selectedFabric === fab
                              ? "bg-gold-400/20 text-gold-400 border-gold-400 font-semibold"
                              : "bg-[#0a0a0a] border-[#f5f2ed]/15 text-[#f5f2ed]/70 hover:text-white"
                          }`}
                        >
                          {fab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Bordados &amp; Aplicações</span>
                    <select
                      value={embroideryStyle}
                      onChange={(e) => setEmbroideryStyle(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-gold-400"
                    >
                      <option className="bg-[#141414]">Pedrarias de Micro-Cristal lapidados</option>
                      <option className="bg-[#141414]">Renda guipir francesa aplicada à mão</option>
                      <option className="bg-[#141414]">Pérolas naturais salpicadas no corpete</option>
                      <option className="bg-[#141414]">Totalmente liso e limpo (Foco na modelagem)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f5f2ed]/60 uppercase tracking-wider block">Tinta &amp; Cor da Linha</span>
                    <div className="flex gap-3.5 flex-wrap">
                      {colorsPalette.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col)}
                          title={col.name}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor.name === col.name ? "border-gold-400 scale-110" : "border-[#f5f2ed]/10"
                          }`}
                          style={{ backgroundColor: col.hex }}
                        >
                          {selectedColor.name === col.name && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                          )}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#f5f2ed]/60">
                      Cor ativa: <strong className="text-gold-400">{selectedColor.name}</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCreateStudioDress}
                  disabled={loading}
                  className="w-full mt-4 py-3.5 bg-gold-400 text-black hover:bg-gold-300 font-sans font-bold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer duration-200 disabled:opacity-50"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Renderizar Desenho Custom</span>
                </button>
              </div>
            )}
          </div>

          {/* Right panel: Results / Interactive high couture review */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[500px] border border-[#f5f2ed]/10 rounded-xl bg-[#141414]/50 overflow-hidden relative p-8 shadow-2xl">
            {/* Ambient gold badge watermark */}
            <div className="absolute right-6 top-6 opacity-[0.03] font-serif text-8xl italic uppercase select-none pointer-events-none text-white">
              B
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6">
                <RefreshCw className="w-12 h-12 text-gold-400 animate-spin" />
                <div className="space-y-2">
                  <p className="font-serif text-lg text-white">Criando com Maestria Humana &amp; Tecnológica</p>
                  <p className="font-mono text-xs text-gold-400 tracking-wider uppercase animate-pulse">{loadingStep}</p>
                </div>
                {/* Simulated Blueprint sketch lines animation if in sketch mode */}
                {activeTab === "studio" && (
                  <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-pulse mt-4"></div>
                )}
              </div>
            ) : result ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#f5f2ed]/10 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold block">Dossiê de Imagem Organizado</span>
                    <h3 className="font-serif text-2xl text-white">Atelier Bella Festa di Lusso</h3>
                  </div>
                  <CheckCircle className="w-8 h-8 text-gold-400" />
                </div>

                {/* The beautifully written recommendation letter */}
                <div className="bg-[#0a0a0a] rounded-lg p-6 border-l-4 border-gold-400 relative border border-[#f5f2ed]/10">
                  <span className="font-serif text-3xl text-gold-400/20 absolute left-3 top-2 select-none font-bold">“</span>
                  <p className="font-sans text-[#f5f2ed]/80 text-sm italic leading-relaxed pl-4 font-normal">
                    {result.recommendationLetter}
                  </p>
                </div>

                {/* Bullet recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left list: Silhouette recommendations */}
                  <div className="bg-[#0a0a0a]/60 p-5 rounded border border-[#f5f2ed]/10">
                    <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-3 font-semibold">Silhuetas Ideais para Harmonizar:</h4>
                    <ul className="space-y-2.5">
                      {result.idealSilhouettes.map((sil, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-[#f5f2ed]/80 font-sans">
                          <Check className="w-3.5 h-3.5 text-gold-400" />
                          <span>{sil}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right list: Suggested palette */}
                  <div className="bg-[#0a0a0a]/60 p-5 rounded border border-[#f5f2ed]/10">
                    <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-3 font-semibold">Paleta Cromática Recomendada:</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {result.suggestedColors.map((col, idx) => (
                        <span key={idx} className="bg-[#141414] border border-[#f5f2ed]/10 text-[#f5f2ed]/80 font-mono text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-wider block">
                          🎨 {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deep detailing recommendations */}
                <div className="space-y-4 pt-2 text-[#f5f2ed]">
                  <div className="border-t border-[#f5f2ed]/10 pt-4">
                    <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-1 font-semibold">Ornamento &amp; Acessórios Recomendados:</h4>
                    <p className="text-[#f5f2ed]/80 text-xs font-sans leading-relaxed">
                      {result.accessoriesAdvice}
                    </p>
                  </div>
                  <div className="border-t border-[#f5f2ed]/10 pt-4">
                    <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-1 font-semibold">Visagismo e Beleza Recomendada (Hair / Makeup):</h4>
                    <p className="text-[#f5f2ed]/80 text-xs font-sans leading-relaxed">
                      {result.makeupAndHair}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      // Smooth scroll to scheduling form
                      document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-2.5 bg-gold-400 text-black hover:bg-gold-300 transition-all font-sans font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer"
                  >
                    Agendar Horário no Ateliê Presencial
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 max-w-sm mx-auto">
                <Wand2 className="w-12 h-12 text-gold-400/40 mx-auto animate-float" />
                <h4 className="font-serif text-lg text-white">Aguardando Seus Detalhes</h4>
                <p className="text-[#f5f2ed]/60 font-sans text-xs leading-relaxed">
                  {activeTab === "advice"
                    ? "Inicie seu teste de biotipo preenchendo os parâmetros à esquerda, e nossa estilista digital criará um dossiê com silhuetas, cores e acessórios perfeitos."
                    : "Escolha as rendas, tecidos e modelagens da alta costura no Studio para desenharmos juntas uma proposta única de croqui sob medida."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
