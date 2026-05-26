import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoLight from "@/assets/logo-azis.svg";
import logoDark from "@/assets/logo-azis-branco.svg";
import card1 from "@/assets/card1.png";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";
import CardSwap, { Card } from "@/components/CardSwap";
import Aurora from "@/components/Aurora";
import Grainient from "@/components/Grainient";
import CircularGallery from "@/components/CircularGallery";

import {
  KanbanSquare,
  Trophy,
  BarChart3,
  Users,
  Zap,
  Star,
  Clock,
} from "lucide-react";

const SELO_ITEMS = [
  { image: '/badges/SELO_-_MARIO-removebg-preview.png',           text: 'Super Tarefa Bros!' },
  { image: '/badges/SELO_-_SONIC-removebg-preview.png',           text: 'Velocidade de Entrega' },
  { image: '/badges/SELO_-_SUPER_MAN-removebg-preview.png',       text: 'Homem de Aço' },
  { image: '/badges/SELO_-_HARRY_POTTER-removebg-preview.png',    text: 'Câmara dos Segredos' },
  { image: '/badges/SELO_-_HOMEM_ARANHA-removebg-preview (1).png', text: 'Grandes Poderes' },
  { image: '/badges/SELO_-_LARA_CROFT-removebg-preview.png',      text: 'Origem das Entregas' },
  { image: '/badges/SELO_-_STAR_WARS-removebg-preview.png',       text: 'Contra-Ataca' },
  { image: '/badges/SELO_-_SIMBA-removebg-preview.png',           text: 'O Rei das Metas' },
  { image: '/badges/SELO_-_ZELDA-removebg-preview.png',           text: 'A Lenda do Funcionário' },
];

const features = [
  {
    icon: KanbanSquare,
    title: "Kanban Intuitivo",
    desc: "Visualize e organize tarefas com drag & drop em tempo real. Priorize o que importa, elimine bloqueios e mantenha a equipe sempre sincronizada.",
    tag: "Produtividade",
  },
  {
    icon: Trophy,
    title: "Gamificação Real",
    desc: "Transforme metas em conquistas. Pontos, rankings e recompensas criam competição saudável e mantêm o time genuinamente engajado.",
    tag: "Engajamento",
  },
  {
    icon: BarChart3,
    title: "Dashboards ao Vivo",
    desc: "Relatórios de produtividade atualizados em tempo real. Tome decisões com dados precisos — não com suposições.",
    tag: "Análise",
  },
  {
    icon: Users,
    title: "Gestão de Times",
    desc: "Convide membros, atribua responsabilidades e acompanhe o progresso individual. Liderança clara, equipe alinhada.",
    tag: "Colaboração",
  },
];

const CARD_IMG_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'top center',
  borderRadius: '13px',
  display: 'block',
};

const HERO_CARDS = [
  { src: card1, alt: 'Dashboard Azis' },
  { src: card2, alt: 'Kanban Azis' },
  { src: card3, alt: 'Preview Azis' },
];

export default function Landing() {
  const isDark = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src={isDark ? logoDark : logoLight}
                alt="Azis logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Azis</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground text-foreground transition-colors">
              Funcionalidades
            </a>

            <ThemeToggle />

            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-20 pb-20 px-6 relative">
        {/* Background: Aurora (dark) / Grainient (light) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {isDark ? (
            <Aurora
              colorStops={["#1A1C3B", "#22D3EE", "#1A1C3B"]}
              blend={0.41}
              amplitude={1.0}
              speed={0.7}
            />
          ) : (
            <Grainient
              color1="#3B82F6"
              color2="#ffffff"
              color3="#3B82F6"
              timeSpeed={0.25}
              colorBalance={0.0}
              warpStrength={1.0}
              warpFrequency={5.0}
              warpSpeed={2.0}
              warpAmplitude={50.0}
              blendAngle={0.0}
              blendSoftness={0.05}
              rotationAmount={500.0}
              noiseScale={2.0}
              grainAmount={0.1}
              grainScale={2.0}
              grainAnimated={false}
              contrast={1.5}
              gamma={1.0}
              saturation={1.0}
              centerX={0.0}
              centerY={0.0}
              zoom={0.9}
            />
          )}
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* TEXTO */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-sm font-medium mb-8">
                <Zap className="w-4 h-4" />
                Produtividade + Bem-estar
              </div>

              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
                Tarefas com{" "}
                <span className="text-gradient-primary">propósito</span>,{" "}
                equipe com{" "}
                <span className="text-gradient-accent">energia.</span>
              </h1>

              <p className="text-lg text-foreground mb-8">
                Gerencie tarefas, motive sua equipe com gamificação e acompanhe
                o humor dos colaboradores — tudo em uma plataforma.
              </p>
            </motion.div>
          </div>

          {/* COMPOSIÇÃO VISUAL (LADO DIREITO) */}
          <div className="relative w-full max-w-[720px] h-[660px] lg:h-[740px] mx-auto mt-12 md:mt-0">
            {/* Brilho de fundo (Aura) */}
            <div className="glow-fundo" />

            {/* Badge Pontos — mesma altura do mascote, mais à direita */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
              transition={{ opacity: { duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-[58%] right-[-10%] z-50 bg-background/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-border flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_0_14px_rgba(250,204,21,0.5)]">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-wider text-muted-foreground uppercase leading-none mb-0.5">Pontos</span>
                <span className="text-xl font-bold leading-none text-foreground">12.450</span>
              </div>
            </motion.div>

            {/* CardSwap com prints do site */}
            <CardSwap
              width={620}
              height={400}
              cardDistance={44}
              verticalDistance={55}
              delay={3800}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              {HERO_CARDS.map((card) => (
                <Card key={card.alt}>
                  <img src={card.src} alt={card.alt} style={CARD_IMG_STYLE} />
                </Card>
              ))}
            </CardSwap>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span
              className="text-xs font-black tracking-widest uppercase mb-3 inline-block"
              style={{ color: isDark ? '#60A5FA' : '#6366F1' }}
            >
              Plataforma
            </span>
            <h2
              className="text-3xl md:text-4xl font-heading font-bold mb-3"
              style={{ color: isDark ? '#F0F4FF' : '#0F172A' }}
            >
              Tudo que sua equipe precisa
            </h2>
            <p className="text-lg" style={{ color: isDark ? '#6B7DB3' : '#64748B' }}>
              Funcionalidades pensadas para produtividade e bem-estar
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {features.map((f, i) => {
              const isLeft  = i % 2 === 0;
              const isBlue  = i === 0 || i === 2;
              const iconBg     = isDark ? 'rgba(59,130,246,0.1)'   : 'rgba(99,102,241,0.08)';
              const iconColor  = isDark ? '#3B82F6'                : '#6366F1';
              const titleColor = isDark ? '#F0F4FF'                : '#0F172A';
              const descColor  = isDark ? '#6B7DB3'                : '#64748B';
              const cardBg     = isDark ? '#0E1117'                : '#ffffff';
              const cardBorder = isDark
                ? (isBlue ? 'rgba(59,130,246,0.18)' : 'rgba(124,58,237,0.18)')
                : (isBlue ? 'rgba(99,102,241,0.18)' : 'rgba(124,58,237,0.18)');
              const tagBg   = isBlue
                ? (isDark ? 'rgba(59,130,246,0.12)'  : 'rgba(99,102,241,0.08)')
                : (isDark ? 'rgba(124,58,237,0.12)'  : 'rgba(124,58,237,0.08)');
              const tagText = isBlue
                ? (isDark ? '#60A5FA' : '#6366F1')
                : (isDark ? '#A78BFA' : '#7C3AED');

              return (
                <motion.div
                  key={f.title}
                  className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: isLeft ? -56 : 56 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div
                    className="w-full md:w-[58%] rounded-3xl p-8 transition-shadow duration-300"
                    style={{
                      background: cardBg,
                      border: `1px solid ${cardBorder}`,
                      boxShadow: isDark
                        ? '0 8px 32px rgba(0,0,0,0.45)'
                        : '0 8px 32px rgba(99,102,241,0.08), 0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: iconBg }}
                    >
                      <f.icon style={{ width: 30, height: 30, color: iconColor }} />
                    </div>

                    <h3
                      className="font-heading font-bold text-2xl mb-3"
                      style={{ color: titleColor }}
                    >
                      {f.title}
                    </h3>

                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: descColor }}
                    >
                      {f.desc}
                    </p>

                    <span
                      className="inline-block text-[0.7rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: tagBg, color: tagText }}
                    >
                      {f.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GAMIFICAÇÃO - SELOS */}
      <section className="py-20 px-6 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs md:text-sm font-black tracking-wider text-primary uppercase mb-4 inline-block">
              Gamificação
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              Selos que motivam<br />de verdade
            </h2>
            <p className="text-foreground text-lg max-w-2xl mx-auto">
              Cada conquista desbloqueada é uma celebração. Funcionários coletam selos, acumulam pontos e sobem no ranking.
            </p>
          </div>

          <div style={{ height: '500px', position: 'relative' }}>
            <CircularGallery
              items={SELO_ITEMS}
              bend={3}
              textColor={isDark ? '#ffffff' : '#1e293b'}
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.03}
            />
          </div>
        </div>
      </section>

      {/* RANKING SECTION */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Ranking List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-xs md:text-sm font-black tracking-wider text-primary uppercase mb-4 inline-block">
                Ranking
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 leading-tight">
                Competição<br />saudável<br />entre colegas
              </h2>
              <p className="text-foreground text-lg mb-8">
                O feed ao vivo mostra em tempo real quem desbloqueou selos, completou tarefas e subiu no ranking.
              </p>

              <div className="space-y-4">
                {[
                  { name: "Ana Carolina", subtitle: "A Linda do Funcionário do Tempo", points: "1.000", color: "bg-yellow-400" },
                  { name: "Rafael Mendes", subtitle: "A Recompensa Contra-Ataca", points: "750", color: "bg-blue-500" },
                  { name: "Mariana Silva", subtitle: "Tomb Raider: A Origem das Entrega", points: "500", color: "bg-purple-500" },
                  { name: "Lucas Ferreira", subtitle: "A Câmara dos Segredos Produtivos", points: "300", color: "bg-gray-400" },
                  { name: "Pedro Alves", subtitle: "O Homem de Aço Ganhou Pontos", points: "150", color: "bg-gray-300" },
                ].map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.subtitle}</p>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-primary ml-3 flex-shrink-0">{user.points}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Card 1 - Pontos esta semana */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📊</span>
                  <p className="text-sm font-semibold text-muted-foreground">Pontos esta semana</p>
                </div>
                <div className="flex gap-2 h-32 items-end justify-between">
                  {[
                    { name: "Ana", value: 85, color: "bg-yellow-400" },
                    { name: "Rafael", value: 65, color: "bg-blue-500" },
                    { name: "Mariana", value: 55, color: "bg-purple-500" },
                    { name: "Lucas", value: 40, color: "bg-gray-500" },
                    { name: "Pedro", value: 25, color: "bg-gray-400" },
                  ].map((bar, i) => (
                    <motion.div 
                      key={i} 
                      className="flex-1 flex flex-col items-center gap-2"
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: "auto", opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-full ${bar.color} rounded-lg shadow-md hover:shadow-lg transition-shadow`} style={{ height: `${bar.value}px` }} />
                      <p className="text-xs font-bold text-foreground text-center">{bar.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Card 2 - Missão da Semana */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white border border-purple-500/30"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">⚡</span>
                  <p className="text-xs font-black tracking-wider uppercase">Missão da semana</p>
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4">
                  Complete 5 tarefas e ganhe +50 pts bônus!
                </h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>3 dias restantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>218 participando</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src={isDark ? logoDark : logoLight}
                alt="Azis logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="font-heading font-semibold text-foreground">
              Azis
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Azis. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}