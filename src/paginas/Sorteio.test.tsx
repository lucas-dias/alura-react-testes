import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import { RecoilRoot } from "recoil";
import Sorteio from "./Sorteio";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})
jest.mock('../state/hooks/useResultadoDoSorteio', () => {
  return {
    useResultadoDoSorteio: jest.fn()
  }
})

describe('na página do sorteio', () => {
  const resultado = new Map([
    ['Ana', 'Catarina'],
    ['Ana Catarina', 'Ana'],
    ['Catarina', 'Ana Catarina']
  ])
  const participantes = [
    'Ana',
    'Catarina',
    'Ana Catarina'
  ]
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado)
  })


  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(<RecoilRoot><Sorteio /></RecoilRoot>)

    const opcoes = screen.queryAllByRole('option')
    expect(opcoes).toHaveLength(participantes.length + 1)
  })

  test('o amigo secreto é exibido quando solicitado', () => {
    render(<RecoilRoot><Sorteio /></RecoilRoot>)

    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })
    const botao = screen.getByRole('button')

    fireEvent.click(botao)
    const amigoSecreto = screen.getByRole('alert')
    expect(amigoSecreto).toBeInTheDocument()
  })
})