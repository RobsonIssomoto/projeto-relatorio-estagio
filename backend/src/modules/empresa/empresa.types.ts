export interface IEmpresa {
  id: number;
  usuarioId: number; // A ponte para o login
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  responsavel: string;
  createdAt: Date;
}

export type ICreateEmpresaDTO = Omit<IEmpresa, "id" | "createdAt">;
