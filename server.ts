import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route FIRST
  app.post("/api/adviser", async (req, res) => {
    try {
      const { occasion, bodyType, silhouette, stylePref, colors, materials, dreamDescription } = req.body;

      if (!ai) {
        // High quality simulated response if no API key is provided
        return res.json({
          recommendationLetter: `Prezada cliente, é uma honra recebê-la em nosso Ateliê Digital Bella Festa. Com base nas ricas escolhas descritas para o evento "${occasion || 'Gala'}", preparamos um dossiê sob medida. Para o biotipo "${bodyType || 'Ampulheta'}", a proposta estruturada da silhueta "${silhouette || 'Sereia'}" trará elegância magnética. Recomendamos a fluidez impecável do ${materials || 'seda pura'} tingida em tons de ${colors || 'verde esmeralda ou azul profundo'}. Atenciosamente, a Diretora de Estilo.`,
          idealSilhouettes: [silhouette || "Sereia", "Princesa Real", "Evasê Fluído"],
          suggestedColors: [colors || "Champagne Rose", "Deep Sapphire", "Emerald Luster"],
          accessoriesAdvice: "Harmonize com sandálias metálicas minimalistas com pulseira fina no tornozelo, uma clutch rígida de madrepérola e joias clássicas de lapidação brilhante.",
          makeupAndHair: "Para o cabelo, indicamos um coque chic banana levemente desconstruído. Maquiagem clássica com pele glow, batom nude elegante e delineado gatinho sofisticado."
        });
      }

      const prompt = `
        Analise a cliente de alta costura com as seguintes preferências:
        - Ocasião: ${occasion}
        - Biotipo corporal: ${bodyType}
        - Silhueta preferida: ${silhouette}
        - Estilo desejado: ${stylePref}
        - Cores preferidas: ${colors}
        - Tecidos desejados: ${materials}
        - Descrição do vestido dos sonhos: "${dreamDescription || 'Fluído com caimento majestoso e sofisticação em cada detalhe'}"

        Crie um relatório de consultoria de moda personalizado em Português do Brasil no formato JSON especificado. Seja poético, acolhedor, luxuoso e profissional. Fale como a estilista chefe do Atelier Bella Festa, um dos maiores nomes de alta costura do país.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Você é a estilista chefe ('Couturière') do Atelier Bella Festa no Brasil, especializada em alta costura e aconselhamento de imagem de luxo.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendationLetter: {
                type: Type.STRING,
                description: "Uma carta refinada e emocionante direcionada à cliente, aconselhando sobre corte, caimento, e tecidos que valorizam sua fisionomia para a ocasião escolhida.",
              },
              idealSilhouettes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Silhuetas recomendadas adicionais que se adequam ao biotipo da cliente.",
              },
              suggestedColors: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A cartela de tons e cores perfeita para esta proposta de vestido.",
              },
              accessoriesAdvice: {
                type: Type.STRING,
                description: "Dica sobre joias, brincos, sapato e clutch para harmonizar com a produção.",
              },
              makeupAndHair: {
                type: Type.STRING,
                description: "Guia refinado de cabelo e maquiagem perfeito para completar a produção.",
              }
            },
            required: ["recommendationLetter", "idealSilhouettes", "suggestedColors", "accessoriesAdvice", "makeupAndHair"],
          }
        }
      });

      const responseText = response?.text || "";
      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (error: any) {
      console.error("Erro no assessor:", error);
      res.status(500).json({ error: "Erro interno da consultoria. Por favor tente novamente." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
