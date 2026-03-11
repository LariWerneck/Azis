import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import mascotVideo from "@/assets/mascot-wave.mp4";
import mascotVideoDark from "@/assets/mascot-wave2.mp4";
import { useTheme } from "@/hooks/use-theme";
import logoLight from "@/assets/logo-azis.svg";
import logoDark from "@/assets/logo-azis-branco.svg";

import {
  KanbanSquare,
  Trophy,
  Smile,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  { icon: KanbanSquare, title: "Kanban Intuitivo", desc: "Organize tarefas com drag & drop, como Trello" },
  { icon: Trophy, title: "Gamificação", desc: "Pontos, ranking e recompensas para motivar a equipe" },
  { icon: Smile, title: "Humor da Equipe", desc: "Acompanhe o bem-estar diário dos colaboradores" },
  { icon: BarChart3, title: "Dashboards", desc: "Relatórios de produtividade e satisfação em tempo real" },
  { icon: Users, title: "Gestão de Times", desc: "Convide membros, atribua tarefas e acompanhe progresso" },
  { icon: Zap, title: "Feedback Mensal", desc: "Questionários automáticos para medir engajamento" },
];

export default function Landing() {
  const isDark = useTheme();
  const currentMascotVideo = isDark ? mascotVideoDark : mascotVideo;

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

            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>

            <Link to="/register">
              <Button size="sm">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </nav>


      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

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

              <p className="text-lg text-foreground mb-10">
                Gerencie tarefas, motive sua equipe com gamificação e acompanhe
                o humor dos colaboradores — tudo em uma plataforma.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow px-8">
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>


          {/* MASCOTE */}
          <div className="w-96 md:w-[420px] flex justify-center">
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              className="w-96 md:w-[420px] bg-primary/10 rounded-lg"
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <source src={currentMascotVideo} type="video/mp4" />
            </motion.video>
          </div>

        </div>
      </section>


      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Tudo que sua equipe precisa
            </h2>

            <p className="text-foreground text-lg">
              Funcionalidades pensadas para produtividade e bem-estar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                  <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {f.title}
                </h3>

                <p className="text-foreground text-sm">{f.desc}</p>

              </motion.div>
            ))}
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
