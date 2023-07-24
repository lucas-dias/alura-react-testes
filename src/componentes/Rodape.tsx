import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useSorteador } from "../state/hooks/useSorteador"
import sacolas from "../imagens/sacolas.png"
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
      <img src={sacolas} alt="Sacolas de compra" />
    </footer>
  )
}

export default Rodape