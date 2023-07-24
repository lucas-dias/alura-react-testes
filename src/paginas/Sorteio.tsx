import { useState } from "react"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio"
import estilos from "./Sorteio.module.scss"
import Card from "../componentes/Card"

const Sorteio = () => {
  const participantes = useListaParticipantes()

  const [participanteDaVez, setParticipanteDaVez] = useState('')
  const [amigoSecreto, setAmigoSecreto] = useState('')

  const resultado = useResultadoDoSorteio()

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!)
    }
  }

  return (
    <Card>
      <section className={estilos.containerSorteio}>
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select
            required
            title="select"
            name="participanteDaVez"
            id="participanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}>
            {participantes.map(participante => <option key={participante}>{participante}</option>)}
          </select>
          <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
          <button className={estilos.botaoSortear}>Sortear</button>
        </form>

        {amigoSecreto && <p role="alert" className={estilos.resultado}>{amigoSecreto}</p>}
        <footer className="sorteio">
          <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
        </footer>
      </section>
    </Card>
  )
}

export default Sorteio