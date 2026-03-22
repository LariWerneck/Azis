import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getActiveUsers, getCurrentUser } from "@/data/mock";
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

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  assignedTo: z.string().min(1, "Atribuição é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  nivel?: number;
  gestorId?: string | null;
  managerEmail?: string | null;
}

interface TaskFormModalProps {
  trigger: React.ReactNode;
  onSubmit: (data: FormData) => void;
}

export default function TaskFormModal({ trigger, onSubmit }: TaskFormModalProps) {
  const [open, setOpen] = useState(false);

  const currentUser = getCurrentUser();
  const users = getActiveUsers();
  const usersLoading = false;
  const usersError = null;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
    },
  });

  const subordinates = users
    ? users.filter((user) => {
        if (!currentUser || currentUser.role !== 'gestor') return false;

        const isDirectSubordinateById = user.gestorId?.toString() === currentUser.id?.toString();
        const isDirectSubordinateByEmail =
          user.managerEmail?.toString().toLowerCase() === currentUser.email?.toLowerCase();

        return Boolean(isDirectSubordinateById || isDirectSubordinateByEmail);
      })
    : [];

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    form.reset();
    setOpen(false);
    toast({
      title: "Tarefa criada",
      description: "A nova tarefa foi criada com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova tarefa no Kanban.
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
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atribuir para</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um subordinado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usersLoading ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Carregando...</span>
                        </div>
                      ) : usersError ? (
                        <div className="p-2 text-sm text-destructive">
                          Erro ao carregar usuários
                        </div>
                      ) : subordinates.length > 0 ? (
                        subordinates.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">
                          Nenhum subordinado disponível para este gestor
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Tarefa</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}