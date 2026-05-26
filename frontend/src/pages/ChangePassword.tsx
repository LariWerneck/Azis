import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function ChangePassword() {
  const { token, updateUser } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const apiUrl = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000"

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (newPassword.length < 8) {
      setStatus("error")
      setMessage("A nova senha deve ter no mínimo 8 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      setStatus("error")
      setMessage("As senhas não coincidem.")
      return
    }

    if (currentPassword === newPassword) {
      setStatus("error")
      setMessage("A nova senha deve ser diferente da senha atual.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch(`${apiUrl}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      })

      const data = await response.json()
      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Não foi possível alterar a senha.")
        return
      }

      updateUser({ must_change_password: false })
      toast({ title: "Senha alterada", description: data.message || "Sua senha foi alterada com sucesso." })
      setStatus("success")
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      setStatus("error")
      setMessage("Erro de conexão. Tente novamente mais tarde.")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-slate-950/90" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl">
          <div className="mb-8 text-center text-slate-100">
            <h1 className="text-4xl font-bold">Trocar senha</h1>
            <p className="mt-3 text-sm text-slate-300">
              Por segurança, você precisa criar uma senha pessoal antes de continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-slate-200">Senha atual</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-100 text-slate-900 placeholder:text-slate-500 pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((value) => !value)}
                  className="absolute inset-y-0 right-0 mr-3 flex items-center text-sm text-slate-500"
                >
                  {showCurrent ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-slate-200">Nova senha</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-100 text-slate-900 placeholder:text-slate-500 pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((value) => !value)}
                  className="absolute inset-y-0 right-0 mr-3 flex items-center text-sm text-slate-500"
                >
                  {showNew ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-200">Confirmar nova senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-100 text-slate-900 placeholder:text-slate-500 pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="absolute inset-y-0 right-0 mr-3 flex items-center text-sm text-slate-500"
                >
                  {showConfirm ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={status === "loading"}>
              {status === "loading" ? "Alterando..." : "Salvar nova senha"}
            </Button>
          </form>

          {message ? (
            <div className={`mt-6 rounded-2xl border p-4 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-rose-500/20 bg-rose-500/10 text-rose-200"}`}>
              {message}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
