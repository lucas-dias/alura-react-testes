import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useSorteador } from "../state/hooks/useSorteador"
import estilos from "./Rodape.module.scss"

const Rodape = () => {

  const participantes = useListaParticipantes()

  const sortear = useSorteador()

  const navegarPara = useNavigate()

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }

  return (
    <footer className={estilos.rodape}>
      <button disabled={participantes.length < 3} onClick={iniciar} className={estilos.botao}>Sortear</button>
      <img src="/imagens/sacolas.png" alt="Sacolas de presente" />
    </footer>
  )
}

export default Rodape