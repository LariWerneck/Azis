import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const apiUrl = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000"

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token inválido. Solicite um novo link de recuperação.")
    }
  }, [token])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!token) {
      setStatus("error")
      setMessage("Token inválido. Solicite um novo link de recuperação.")
      return
    }

    if (newPassword.length < 8) {
      setStatus("error")
      setMessage("A senha deve ter no mínimo 8 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      setStatus("error")
      setMessage("As senhas não coincidem.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Não foi possível redefinir a senha.")
        return
      }

      toast({ title: "Senha redefinida", description: data.message || "Sua senha foi alterada com sucesso." })
      setStatus("success")
      navigate("/login")
    } catch (error) {
      console.error(error)
      setStatus("error")
      setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-slate-950/90" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl">
          <div className="mb-8 text-center text-slate-100">
            <h1 className="text-4xl font-bold">Redefinir senha</h1>
            <p className="mt-3 text-sm text-slate-300">
              Defina uma nova senha para sua conta Azis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-slate-200">Nova senha</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-100 text-slate-900 placeholder:text-slate-500 pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 mr-3 flex items-center text-sm text-slate-500"
                >
                  {showNewPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-200">Confirmar senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-100 text-slate-900 placeholder:text-slate-500 pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 mr-3 flex items-center text-sm text-slate-500"
                >
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={status === "loading" || !token}>
              {status === "loading" ? "Aguarde..." : "Redefinir senha"}
            </Button>
          </form>

          {message ? (
            <div className={`mt-6 rounded-2xl border p-4 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-rose-500/20 bg-rose-500/10 text-rose-200"}`}>
              {message}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-slate-300">
            <Link to="/forgot-password" className="text-sky-400 hover:underline">
              Solicitar novo link de redefinição
            </Link>
            <Link to="/login" className="text-slate-300 hover:text-white hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
