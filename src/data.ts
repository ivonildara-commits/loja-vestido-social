import { Dress } from "./types";

export const DRESSES: Dress[] = [
  {
    id: "dress-emerald",
    name: "Masterpiece Imperial Esmeralda",
    category: "Gala / Coquetel",
    silhouette: "Fluído & Reto",
    priceRange: "Aluguel sob consulta / Confecção a partir de R$ 4.800",
    description: "Um vestido icônico em seda pura italiana de tom esmeralda, que esculpe um drapeado orgânico fluído de tirar o fôlego. Seus vincos capturam a luz da maneira mais nobre possível.",
    details: [
      "100% Seda Pura Orgânica",
      "Forro interno de cetim duchese macio",
      "Drapeado esculpido à mão em Ateliê",
      "Fenda lateral fluída e elegante",
      "Capa fluída integrada que flutua ao caminhar"
    ],
    image: "/src/assets/images/hero_luxury_dress_1780012097716.png",
    colors: [
      { name: "Verde Esmeralda", hex: "#0F52BA" },
      { name: "Verde Oliva Profundo", hex: "#3D5229" }
    ],
    fabrics: ["Seda Pura", "Gazar de Seda", "Cetim Duchese"],
    rating: 5.0
  },
  {
    id: "dress-sapphire",
    name: "Sereia Safira Noturna",
    category: "Casamento",
    silhouette: "Sereia",
    priceRange: "Aluguel R$ 1.850 / Venda R$ 4.200",
    description: "Elegância magnética traduzida em silhueta sereia impecável. Feito em cetim premium com brilho aristocrático e decote ombro a ombro clássico que valoriza o busto com sutileza.",
    details: [
      "Cetim imperial de alta gramatura",
      "Decote ombro-a-ombro estruturado",
      "Estrutura interna corseterie ajustável",
      "Cauda média removível de 1,2 metros",
      "Costura invisível com acabamento francês"
    ],
    image: "/src/assets/images/sapphire_mermaid_1780012116777.png",
    colors: [
      { name: "Azul Safira", hex: "#0F2042" },
      { name: "Azul Royal", hex: "#1C39BB" },
      { name: "Azul Sereno", hex: "#B0C4DE" }
    ],
    fabrics: ["Cetim Imperial", "Crepe de Seda"],
    rating: 4.9
  },
  {
    id: "dress-blush",
    name: "Princesa Realeza Blush",
    category: "Debutante",
    silhouette: "Princesa",
    priceRange: "Aluguel R$ 2.400 / Venda R$ 6.300",
    description: "Um conto de fadas em forma de alta costura. Camadas etéreas de tule francês premium sobrepostas em tom rosé/blush de sonho com corset detalhado em renda floral bordada com mini pérolas.",
    details: [
      "Tule francês ultraleve multicamadas",
      "Renda italiana bordada à mão",
      "Micro-pérolas e cristais Swarovski salpicados no corpete",
      "Ajuste perfeito por amarração em fita de cetim nas costas",
      "Anágua integrada leve de alta roda"
    ],
    image: "/src/assets/images/blush_princess_1780012139318.png",
    colors: [
      { name: "Rosé Blush", hex: "#EDC9AF" },
      { name: "Nude Pérola", hex: "#F3E5AB" },
      { name: "Off-White Clássico", hex: "#FAF9F6" }
    ],
    fabrics: ["Tule Francês", "Renda Chantilly", "Pétalas Organza"],
    rating: 4.9
  },
  {
    id: "dress-onyx",
    name: "Madrinha Ônix Absoluto",
    category: "Gala / Coquetel",
    silhouette: "Sereia",
    priceRange: "Aluguel R$ 1.600 / Venda R$ 3.800",
    description: "O epítome do luxo minimalista e sensualidade comedida. Confeccionado em veludo de seda premium com um caimento pesado espetacular, costas abertas esculturais e fenda poderosa.",
    details: [
      "Veludo alemão de seda pura",
      "Costas nua em corte U geométrico profundo",
      "Fenda lateral estruturada resistente que não abre em excesso",
      "Mangas longas ajustadas com botões revestidos",
      "Toque macio com elastano de alta recuperação"
    ],
    image: "/src/assets/images/onyx_evening_1780012158388.png",
    colors: [
      { name: "Preto Ônix Absoluto", hex: "#0A0A0A" },
      { name: "Vinho Borgonha", hex: "#5C061C" },
      { name: "Verde Floresta Noturno", hex: "#1A4314" }
    ],
    fabrics: ["Veludo de Seda", "Silk Crepe Georgette"],
    rating: 5.0
  },
  {
    id: "dress-gold",
    name: "Áurea de Champagne Radiante",
    category: "Formatura",
    silhouette: "Evasê",
    priceRange: "Aluguel R$ 2.100 / Venda R$ 5.900",
    description: "Para momentos inesquecíveis sob os holofotes. Um vestido refinado recoberto de pedrarias finas, vidrilhos e lantejoulas sobre base champagne dourada que reflete um brilho cintilante inigualável.",
    details: [
      "Tule de seda recoberto por canutilhos e vidrilhos de alto brilho",
      "Decote halter em formato de joia lapidada com alças invisíveis",
      "Forro interno champagne acetinado de toque suave",
      "Modelagem evasê que define a cintura e abre de forma majestosa",
      "Bordados aplicados de maneira estratégica para alongar a silhueta"
    ],
    image: "/src/assets/images/gold_luxury_1780012175769.png",
    colors: [
      { name: "Dourado Champagne", hex: "#E5D3B3" },
      { name: "Prata Estelar", hex: "#C0C0C0" },
      { name: "Ouro Velho Rosé", hex: "#B87333" }
    ],
    fabrics: ["Tule de Seda Bordado", "Micro-Seda", "Renda com Fios de Ouro"],
    rating: 5.0
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    id: 1,
    name: "Mariana Vasconcellos",
    role: "Noiva & Madrinha Executiva",
    comment: "Eu simplesmente me senti a mulher mais deslumbrante da noite com o Sereia Safira. O caimento parecia esculpido direto no meu corpo, a costura francesa é impecável! O Ateliê superou todas as expectativas.",
    dress: "Sereia Safira Noturna",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Drª. Letícia Albuquerque",
    role: "Formanda de Medicina (Turma 108 UFMG)",
    comment: "O Áurea de Champagne Radiante fez o meu baile de formatura brilhar ainda mais. Cada vidrilho capturava o flash dos fotógrafos com leveza e o provador virtual IA acertou exatamente minhas medidas!",
    dress: "Áurea de Champagne Radiante",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Gabriela Mendes",
    role: "Debutante de Gala",
    comment: "Eu quis um vestido de princesa de verdade e o Princesa Realeza Blush superou o que eu sempre imaginei. O corpete corset aperta de forma confortável e as fotos saíram majestosas.",
    dress: "Princesa Realeza Blush",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  }
];

export const HO_MENS = [
  "09:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"
];
