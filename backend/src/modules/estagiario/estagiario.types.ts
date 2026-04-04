export interface IEstagiario {
  id: number;
  usuarioId: number; // A chave estrangeira que liga ao login!
  nome: string;
  cpf: string;
  telefone: string;
  createdAt: Date;
}

// O que precisamos para criar um (ignorando ID e data gerados pelo banco)
export type ICreateEstagiarioDTO = Omit<IEstagiario, "id" | "createdAt">;
