import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const apiUrl = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000"

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setMessage("Informe o e-mail cadastrado.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Verifique seu e-mail para o link de redefinição de senha.")
      } else {
        const data = await response.json()
        setStatus("error")
        setMessage(data.error || "Não foi possível enviar o link de redefinição.")
      }
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
            <h1 className="text-4xl font-bold">Esqueci a senha</h1>
            <p className="mt-3 text-sm text-slate-300">
              Digite o e-mail cadastrado para receber um link de redefinição de senha.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ana@azis.com"
                className="bg-slate-100 text-slate-900 placeholder:text-slate-500"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Enviar link"}
            </Button>
          </form>

          {message ? (
            <div className={`mt-6 rounded-2xl border p-4 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-rose-500/20 bg-rose-500/10 text-rose-200"}`}>
              {message}
            </div>
          ) : null}

          <div className="mt-8 text-center text-sm text-slate-300">
            <Link to="/login" className="text-sky-400 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
