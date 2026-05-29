import React, { useState } from "react";
import { Dress, Appointment } from "../types";
import { DRESSES, HO_MENS } from "../data";
import { Calendar, Clock, Phone, User, Mail, Sparkles, CheckCircle2, AlertCircle, Trash2, MapPin } from "lucide-react";

interface BookingFormProps {
  selectedDress: Dress | null;
  onClearSelectedDress: () => void;
  appointments: Appointment[];
  onAddAppointment: (appointment: Appointment) => void;
  onCancelAppointment: (id: string) => void;
}

export default function BookingForm({
  selectedDress,
  onClearSelectedDress,
  appointments,
  onAddAppointment,
  onCancelAppointment
}: BookingFormProps) {
  const [clientName, setClientName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [dressId, setDressId] = useState<string>(selectedDress?.id || "consultation");
  const [notes, setNotes] = useState<string>("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync selected dress state if passed from catalog
  useState(() => {
    if (selectedDress) {
      setDressId(selectedDress.id);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !email || !phone || !date || !time) {
      setMessage({ type: "error", text: "Preencha todos os campos obrigatórios." });
      return;
    }

    const newAppointment: Appointment = {
      id: "booking-" + Date.now(),
      clientName,
      email,
      phone,
      date,
      time,
      dressId: dressId === "consultation" ? undefined : dressId,
      status: "Confirmado",
      notes
    };

    onAddAppointment(newAppointment);
    setMessage({
      type: "success",
      text: "Sua reserva foi confirmada com sucesso! Um consultor de estilo do Atelier entrará em contato em breve para detalhar suas preferências."
    });

    // Reset input fields
    setClientName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setNotes("");
    onClearSelectedDress();

    setTimeout(() => setMessage(null), 8000);
  };

  const selectedDressDetails = DRESSES.find(d => d.id === dressId);

  return (
    <section id="agendamento" className="py-24 bg-[#0a0a0a] text-[#f5f2ed] border-b border-[#f5f2ed]/10 scroll-mt-10 animate-fadeIn relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase">Visita Exclusiva</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">Agende Sua Prova de Luxo</h2>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4"></div>
          <p className="text-[#f5f2ed]/70 font-sans mt-4">
            Reserve uma hora com um de nossos estilistas em nosso showroom com total exclusividade, provadores privativos amplos e espelhos de 360°.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel: Showroom hours & information */}
          <div className="lg:col-span-4 bg-[#141414] border border-[#f5f2ed]/10 p-8 rounded-lg relative shadow-2xl">
            <h3 className="font-serif text-2xl text-white mb-6 border-b border-[#f5f2ed]/10 pb-4">Nossos Ateliers</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans font-semibold text-white text-sm">Florença Couture Jardins</h4>
                  <p className="text-xs text-[#f5f2ed]/70 font-sans mt-1">
                    Alameda Lorena, 1420 - Jardins, São Paulo - SP
                  </p>
                  <p className="text-[11px] text-[#f5f2ed]/40 font-mono mt-0.5">Vagas de Valet de cortesia no local.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <div>
                  <h4 className="font-sans font-semibold text-white text-sm">Horários de Showroom</h4>
                  <p className="text-xs text-[#f5f2ed]/70 font-sans mt-1">
                    Segunda a Sexta: 09:00 às 20:30<br />
                    Sábado: 09:00 às 19:00<br />
                    Domingo e Feriados: Fechado
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] border border-[#f5f2ed]/10 rounded-sm">
                <h4 className="font-serif text-white text-base mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>A Experiência Bella Festa</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#f5f2ed]/80 font-sans leading-relaxed">
                  <li>• Atendimento 1-para-1 com estilista especialista</li>
                  <li>• Provador VIP individual com lounge para acompanhantes</li>
                  <li>• Serviço de champanhe e doces finos artesanais</li>
                  <li>• Costureiras internas focadas no seu caimento perfeito</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right panel: Multi-step interactive scheduling form */}
          <div className="lg:col-span-8 bg-[#141414] border border-[#f5f2ed]/10 shadow-2xl p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#f5f2ed]/10 pb-6 mb-4">
                <h3 className="font-serif text-2xl text-white">Preencha Seus Detalhes de Visita</h3>
                <p className="text-xs text-[#f5f2ed]/60 mt-1">Apenas 1 cliente por provador por horário.</p>
              </div>

              {message && (
                <div className={`p-4 rounded-md flex items-start gap-3 ${
                  message.type === "success" 
                    ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-300" 
                    : "bg-rose-950/40 border border-rose-500/20 text-rose-300"
                }`}>
                  {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />}
                  <span className="text-xs font-sans leading-relaxed">{message.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">Nome Completo *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Diana Prince..."
                      className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@ateliely.com.br"
                      className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">WhatsApp / Telefone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 98888-7777"
                      className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">Data Desejada *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">Horário da Sessão *</label>
                  <div className="relative font-sans">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400"
                    >
                      <option value="" className="bg-[#141414]">Selecione...</option>
                      {HO_MENS.map((hr) => (
                        <option key={hr} value={hr} className="bg-[#141414]">{hr}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">Modelo Escolhido para Prova *</label>
                  <select
                    value={dressId}
                    onChange={(e) => setDressId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400 font-sans"
                  >
                    <option value="consultation" className="bg-[#141414]">Apenas Consultoria Geral (Escolher no local)</option>
                    {DRESSES.map((d) => (
                      <option key={d.id} value={d.id} className="bg-[#141414]">{d.name} ({d.silhouette})</option>
                    ))}
                  </select>
                  {selectedDressDetails && (
                    <div className="mt-2 flex items-center gap-3 bg-[#0a0a0a] p-3 border border-[#f5f2ed]/10 rounded-sm">
                      <img
                        src={selectedDressDetails.image}
                        alt="dress detail preview"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-sm border border-[#f5f2ed]/10"
                      />
                      <div>
                        <span className="text-xs font-sans text-white font-semibold block">{selectedDressDetails.name}</span>
                        <span className="text-[10px] text-gold-400 font-mono tracking-wider">{selectedDressDetails.silhouette} • {selectedDressDetails.category}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#f5f2ed]/60 block">Observação / Restrições Pessoais</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Quero ajustar barra pois sou baixinha, ou irei acompanhada de três pessoas..."
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#f5f2ed]/15 text-[#f5f2ed] rounded text-sm focus:outline-none focus:border-gold-400 font-sans resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#f5f2ed]/10 flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-3 bg-gold-400 hover:bg-gold-300 text-black font-sans font-bold text-xs uppercase tracking-widest transition-all rounded-sm shadow-2xl cursor-pointer"
                >
                  Confirmar Agendamento Privado
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Dashboard panel: Scheduled slots list so they can easily review or cancel! */}
        {appointments.length > 0 && (
          <div className="mt-16 bg-[#141414] border border-[#f5f2ed]/10 p-8 rounded-lg shadow-2xl">
            <h4 className="font-serif text-2xl text-white mb-6">Seus Agendamentos de Visita</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((apt) => {
                const bookDress = DRESSES.find((dr) => dr.id === apt.dressId);
                return (
                  <div key={apt.id} className="bg-[#0a0a0a] border border-[#f5f2ed]/10 rounded-md p-5 flex justify-between gap-4 items-center">
                    <div>
                      <div className="flex gap-2 items-center mb-1.5">
                        <span className="bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 rounded uppercase">
                          {apt.status}
                        </span>
                        <span className="text-[11px] text-[#f5f2ed]/40 font-mono italic">#{apt.id}</span>
                      </div>

                      <h5 className="font-sans font-bold text-white text-sm">{apt.clientName}</h5>
                      <p className="text-xs text-[#f5f2ed]/70 font-sans mt-0.5">
                        📆 {new Date(apt.date).toLocaleDateString("pt-BR", { timeZone: 'UTC' })} às 🕰️ {apt.time}h
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        {bookDress ? (
                          <>
                            <img src={bookDress.image} referrerPolicy="no-referrer" className="w-6 h-6 object-cover rounded-full border border-[#f5f2ed]/10" />
                            <span className="text-xs text-gold-400 font-sans font-semibold">{bookDress.name}</span>
                          </>
                        ) : (
                          <span className="text-xs text-[#f5f2ed]/60 font-sans italic">Consultoria Geral de Estilo</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="p-2.5 bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-rose-300 transition-colors rounded-full border border-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
