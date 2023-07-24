import Card from "../componentes/Card"
import Formulario from "../componentes/Formulario"
import { ListaParticipantes } from "../componentes/ListaParticipantes"
import Rodape from "../componentes/Rodape"


const Configuracao = () => {
  return (
    <Card>
      <section>
        <Formulario />
        <ListaParticipantes />
        <Rodape />
      </section>
    </Card>
  )
}

export default Configuracao