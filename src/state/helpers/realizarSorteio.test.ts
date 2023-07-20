import { realizarSorteio } from "./realizarSorteio";

describe("dado um sorteio de amigo secreto", () => {
  test("cada participante não receba a si mesmo", () => {
    const participantes = [
      "Ana",
      "Catarina",
      "Juliana",
      "João",
      "Marcelo",
      "Lucas",
    ];

    const sorteio = realizarSorteio(participantes);

    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
