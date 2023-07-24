import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante"
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro"
import estilos from "./Formulario.module.scss"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Formulario = () => {

  const [nome, setNome] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const adicionarNaLista = useAdicionarParticipante()

  const mensagemDeErro = useMensagemDeErro()

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    adicionarNaLista(nome)
    setNome('')
    inputRef.current?.focus()
  }


  return (
    <div className={estilos.container}>
      <article className={estilos.article}>
        <form onSubmit={adicionarParticipante} className={estilos.form}>
          <p className={estilos.ptext}>Vamos Começar!</p>
          <div className={estilos.inputbtn}>
            <label htmlFor="" className={estilos.label}>
              <PersonAddIcon />
              <input
                ref={inputRef}
                value={nome}
                onChange={evento => setNome(evento.target.value)}
                type="text"
                placeholder="Insira os nomes dos participantes"
              />
            </label>
            <button disabled={!nome}>Adicionar</button>
          </div>
          {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
        </form>
      </article>
    </div>
  )
}

export default Formulario