// 1. Dados específicos do Estagiário
export interface DadosEstagiario {
  Nome: string;
  CPF: string;
  Telefone?: string;
  NomeCurso?: string;
}

// 2. Dados específicos da Empresa/Representante
export interface DadosEmpresa {
  Nome: string; // Nome do Representante
  CNPJ: string;
  RazaoSocial?: string;
  Telefone?: string;
}

// 3. O DTO Principal
// O React manda tudo no mesmo corpo (req.body)
export interface CriarUsuarioDTO {
  Login: string;
  Senha: string;
  Email: string;
  Perfil: number;

  // Campos mistos (opcionais, pois variam de acordo com o Perfil)
  Nome: string;
  CPF?: string;
  CNPJ?: string;
  Telefone?: string;
  RazaoSocial?: string;
  NomeCurso?: string;
}

export interface EditarUsuarioDTO{
  Nome? : string;
  CPF?: string;
  CNPJ?: string;
  Telefone?: string;
  RazaoSocial?: string;
  NomeCurso?: string;
}