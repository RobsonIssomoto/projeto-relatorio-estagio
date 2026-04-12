export enum Perfil {
  Admin = 1,
  Estagiario = 2,
  Representante = 3,
  Supervisor = 4,
  Orientador = 5,
}

export interface IUsuario {
  id: number;
  email: string;
  perfil: Perfil;
  senhaHash: string;
  createdAt: Date; // Padrão de mercado para dataCadastro
  updatedAt?: Date; // Padrão de mercado para dataAtualizacao
}

export interface ICreateUsuarioDTO {
  email: string;
  senhaEmTextoPlano: string;
  perfil: Perfil;
}
