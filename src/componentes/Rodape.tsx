import { useNavigate } from "react-router-dom"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useSorteador } from "../state/hooks/useSorteador"

const Rodape = () => {

  const participantes = useListaParticipantes()

  const sortear = useSorteador()

  const navegarPara = useNavigate()

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }

  return (
    <footer>
      <button disabled={participantes.length < 3} onClick={iniciar}>Sortear</button>
    </footer>
  )
}

export default Rodape