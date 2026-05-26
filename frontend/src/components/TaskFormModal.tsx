import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getActiveUsers, getCurrentUser } from "@/data/mock";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TASK_LEVELS = [
  { label: "Básico", points: 25 },
  { label: "Médio", points: 75 },
  { label: "Avançado", points: 125 },
];

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  assignedTo: z.string().min(1, "Atribuição é obrigatória"),
  level: z.enum(["Básico", "Médio", "Avançado"], {
    required_error: "Nível é obrigatório",
  }),
  deadline: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TaskFormModalProps {
  trigger?: React.ReactNode;
  onSubmit: (data: { title: string; description: string; assignedTo: string; points: number; deadline?: string }) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialValues?: Partial<FormData>;
  isEditMode?: boolean;
}

const DEFAULT_VALUES: FormData = {
  title: "",
  description: "",
  assignedTo: "",
  level: "Básico",
  deadline: "",
};

export default function TaskFormModal({
  trigger,
  onSubmit,
  open: controlledOpen,
  onOpenChange,
  initialValues,
  isEditMode = false,
}: TaskFormModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { user } = useAuth();

  const isControlled = controlledOpen !== undefined;
  const dialogOpen = isControlled ? controlledOpen! : internalOpen;
  const setDialogOpen = (val: boolean) => {
    if (isControlled) onOpenChange?.(val);
    else setInternalOpen(val);
  };

  const currentUser = user ?? getCurrentUser();
  const users = getActiveUsers();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (dialogOpen && initialValues) {
      form.reset({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        assignedTo: initialValues.assignedTo ?? "",
        level: initialValues.level ?? "Básico",
        deadline: initialValues.deadline ?? "",
      });
    } else if (!dialogOpen) {
      form.reset(DEFAULT_VALUES);
    }
  }, [dialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const levelValue = form.watch("level");
  const selectedLevel = TASK_LEVELS.find(l => l.label === levelValue);
  const currentPoints = selectedLevel ? selectedLevel.points : 0;

  const subordinates = users
    ? users.filter((u) => {
        if (!currentUser || currentUser.role !== "gestor") return false;
        const byId = u.gestorId?.toString() === currentUser.id?.toString();
        const byEmail =
          (u as any).managerEmail?.toString().toLowerCase() ===
          currentUser.email?.toLowerCase();
        return Boolean(byId || byEmail);
      })
    : [];

  const handleSubmit = (data: FormData) => {
    const selectedLevel = TASK_LEVELS.find(l => l.label === data.level);
    const points = selectedLevel ? selectedLevel.points : 25;
    onSubmit({
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      points,
      deadline: data.deadline,
    });
    form.reset(DEFAULT_VALUES);
    setDialogOpen(false);
    if (!isEditMode) {
      toast({ title: "Tarefa criada", description: "A nova tarefa foi criada com sucesso." });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Tarefa" : "Criar Nova Tarefa"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edite os detalhes da tarefa."
              : "Preencha os detalhes da nova tarefa no Kanban."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição da tarefa"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <FormLabel className="text-sm font-medium text-[color:var(--text)]">
                      Nível da Tarefa
                    </FormLabel>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#f59e0b]">
                      ⭐ {currentPoints} pts
                    </span>
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="mt-1 bg-[color:var(--surface2)] border border-[color:var(--accent)] focus-visible:ring-[color:var(--accent)] text-[color:var(--text)]">
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_LEVELS.map((level) => (
                        <SelectItem key={level.label} value={level.label}>
                          {level.label} - {level.points} pontos
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-1">
                    Selecione o nível de dificuldade da tarefa.
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atribuir para</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um subordinado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subordinates.length > 0 ? (
                        subordinates.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                          Nenhum subordinado disponível
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Entrega</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="rounded-lg bg-[color:var(--surface2)] border-[color:var(--border)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEditMode ? "Salvar Alterações" : "Criar Tarefa"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
