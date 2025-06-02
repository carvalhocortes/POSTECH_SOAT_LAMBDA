export class Client {
  constructor(public cpf: string) {
    if (!/^\d{11}$/.test(cpf)) throw new Error('CPF inválido')
  }
}