import { useRecoilValue } from "recoil";
import { listaDeParticipantesState } from "../atom";

export const useListaParticipantes = () => {
  return useRecoilValue(listaDeParticipantesState);
};
