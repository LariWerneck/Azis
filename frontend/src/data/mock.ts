export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type MoodType = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'stressed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'manager' | 'member';
  points: number;
  institution_id: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  status: TaskStatus;
  points: number;
  deadline: string;
  created_at: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  available: number;
}

export interface MoodLog {
  id: string;
  user_id: string;
  mood: MoodType;
  date: string;
}

export const currentUser: User = {
  id: '1',
  name: 'Ana Silva',
  email: 'ana@moodtask.com',
  avatar: '',
  role: 'manager',
  points: 1250,
  institution_id: '1',
};

const EXAMPLE_EMAIL = currentUser.email;

export function getCurrentUser(): User {
  try {
    const stored = localStorage.getItem('moodtask_user');
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<User>;

      const isExample = parsed.email === EXAMPLE_EMAIL;

      if (!isExample) {
        parsed.points = 0;
        parsed.role = 'member';
      }

      const baseUser = isExample ? currentUser : { ...currentUser, points: 0, role: 'member' };
      const result = {
        ...baseUser,
        points: baseUser.points,
        ...parsed,
      };

      if (import.meta.env.DEV) {
        console.log('[getCurrentUser] localStorage user:', parsed, '→ result:', result);
      }

      return result;
    }
  } catch {
    // ignore
  }

  if (import.meta.env.DEV) {
    console.log('[getCurrentUser] using mock user:', currentUser);
  }

  return currentUser;
}

export const teamMembers: User[] = [
  currentUser,
  { id: '2', name: 'Carlos Santos', email: 'carlos@moodtask.com', avatar: '', role: 'member', points: 980, institution_id: '1' },
  { id: '3', name: 'Maria Oliveira', email: 'maria@moodtask.com', avatar: '', role: 'member', points: 1100, institution_id: '1' },
  { id: '4', name: 'Pedro Costa', email: 'pedro@moodtask.com', avatar: '', role: 'member', points: 750, institution_id: '1' },
  { id: '5', name: 'Julia Lima', email: 'julia@moodtask.com', avatar: '', role: 'member', points: 890, institution_id: '1' },
  { id: '6', name: 'Rafael Souza', email: 'rafael@moodtask.com', avatar: '', role: 'member', points: 1350, institution_id: '1' },
];

export const mockTasks: Task[] = [
  { id: 't1', title: 'Redesign da landing page', description: 'Atualizar o design da página inicial com novo branding', assignee: teamMembers[1], status: 'todo', points: 50, deadline: '2026-03-15', created_at: '2026-03-01' },
  { id: 't2', title: 'Implementar API de pagamentos', description: 'Integrar gateway de pagamento', assignee: teamMembers[2], status: 'todo', points: 80, deadline: '2026-03-20', created_at: '2026-03-02' },
  { id: 't3', title: 'Testes de integração', description: 'Escrever testes automatizados para módulos críticos', assignee: teamMembers[3], status: 'in_progress', points: 40, deadline: '2026-03-12', created_at: '2026-03-01' },
  { id: 't4', title: 'Documentação da API', description: 'Criar documentação completa dos endpoints', assignee: teamMembers[4], status: 'in_progress', points: 30, deadline: '2026-03-18', created_at: '2026-03-03' },
  { id: 't5', title: 'Setup CI/CD pipeline', description: 'Configurar pipeline de deploy automático', assignee: teamMembers[5], status: 'done', points: 60, deadline: '2026-03-10', created_at: '2026-02-28' },
  { id: 't6', title: 'Otimizar queries do banco', description: 'Melhorar performance das consultas SQL', assignee: teamMembers[1], status: 'done', points: 45, deadline: '2026-03-08', created_at: '2026-02-25' },
  { id: 't7', title: 'Criar sistema de notificações', description: 'Implementar notificações push e email', assignee: teamMembers[2], status: 'todo', points: 70, deadline: '2026-03-25', created_at: '2026-03-04' },
  { id: 't8', title: 'Review de código do módulo auth', description: 'Revisar PR do sistema de autenticação', assignee: teamMembers[0], status: 'in_progress', points: 25, deadline: '2026-03-09', created_at: '2026-03-05' },
];

export const mockRewards: Reward[] = [
  { id: 'r1', name: 'Day Off', description: 'Um dia de folga extra para descansar', image: '🏖️', cost: 500, available: 3 },
  { id: 'r2', name: 'Vale Almoço', description: 'Vale refeição em restaurante parceiro', image: '🍽️', cost: 200, available: 10 },
  { id: 'r3', name: 'Curso Online', description: 'Acesso a um curso na plataforma parceira', image: '📚', cost: 800, available: 5 },
  { id: 'r4', name: 'Home Office Week', description: 'Uma semana trabalhando de casa', image: '🏠', cost: 350, available: 4 },
  { id: 'r5', name: 'Gift Card R$100', description: 'Vale presente para usar onde quiser', image: '🎁', cost: 600, available: 2 },
  { id: 'r6', name: 'Mentoria 1:1', description: 'Sessão de mentoria com líder da empresa', image: '🎯', cost: 150, available: 8 },
];

export const moodLabels: Record<MoodType, { emoji: string; label: string }> = {
  very_happy: { emoji: '😄', label: 'Muito Feliz' },
  happy: { emoji: '😊', label: 'Feliz' },
  neutral: { emoji: '😐', label: 'Neutro' },
  sad: { emoji: '😢', label: 'Triste' },
  stressed: { emoji: '😤', label: 'Estressado' },
};

export const weeklyMoodData = [
  { day: 'Seg', happy: 4, neutral: 2, sad: 0 },
  { day: 'Ter', happy: 3, neutral: 2, sad: 1 },
  { day: 'Qua', happy: 5, neutral: 1, sad: 0 },
  { day: 'Qui', happy: 3, neutral: 3, sad: 0 },
  { day: 'Sex', happy: 4, neutral: 1, sad: 1 },
];

export const monthlyProductivity = [
  { month: 'Jan', tasks: 42, points: 1250 },
  { month: 'Fev', tasks: 38, points: 1100 },
  { month: 'Mar', tasks: 55, points: 1680 },
];
