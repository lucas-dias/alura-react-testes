import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import Rodape from "./Rodape"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

const mockSorteio = jest.fn()
jest.mock('../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})


describe("quando não existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })
  test("o sorteio não pode ser iniciado", () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole('button')

    expect(botao).toBeDisabled()
  })
})

describe("quando existem participantes suficientes", () => {
  const participantes = ['Ana', 'Catarina', 'Ana Catarina']
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })
  test("o sorteio pode ser iniciado", () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole('button')

    expect(botao).not.toBeDisabled()
  })
  test("o sorteio foi iniciado", () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole('button')
    expect(botao).not.toBeDisabled()

    fireEvent.click(botao)
    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
})