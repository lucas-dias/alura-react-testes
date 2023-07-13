import { atom } from "recoil";

export const listaDeParticipantesState = atom<string[]>({
  key: "listaParticipantesState",
  default: [],
});

export const erroState = atom<string>({
  key: "erroState",
  default: "",
});
