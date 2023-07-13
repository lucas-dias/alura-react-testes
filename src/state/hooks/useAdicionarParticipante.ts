import { useSetRecoilState, useRecoilValue } from "recoil";
import { erroState, listaDeParticipantesState } from "../atom";

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaDeParticipantesState);
  const lista = useRecoilValue(listaDeParticipantesState);
  const setErro = useSetRecoilState(erroState);
  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro("Não é permitido adicionar nomes duplicados à lista");
      setTimeout(() => {
        setErro("");
      }, 3000);
      return;
    }
    return setLista((listaAtual) => [...listaAtual, nomeDoParticipante]);
  };
};
