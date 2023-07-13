import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('comportamento do Formulário.tsx', () => {
  test('participantes não são adicionados com input vazio', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    const botao = screen.getByRole('button')

    expect(input).toBeInTheDocument()

    expect(botao).toBeDisabled()
  })

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')

    //inserir valor no input
    fireEvent.change(input, {
      target: {
        value: 'Asdrúbal'
      }
    })

    //clicar no botão submit 
    fireEvent.click(botao)

    //garantir input com foco ativo
    expect(input).toHaveFocus()
    //garantir input esteja vazio
    expect(input).toHaveValue('')
  })

  test('não é permitido nomes duplicados na lista', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Asdrúbal'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Asdrúbal'
      }
    })
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')
    expect(mensagemDeErro.textContent).toBe('Não é permitido adicionar nomes duplicados à lista')
  })

  test('a mensagem de erro deve durar um tempo determinado', () => {
    jest.useFakeTimers()
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Asdrúbal'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Asdrúbal'
      }
    })
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()

    //esperar n segundos
    act(() => {
      // necessário o uso do act pois a fç runAllTimers() re-renderiza o componente.
      jest.runAllTimers()
    })
    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})