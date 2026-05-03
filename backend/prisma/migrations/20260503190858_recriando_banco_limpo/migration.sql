BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[__EFMigrationsHistory] (
    [MigrationId] NVARCHAR(150) NOT NULL,
    [ProductVersion] NVARCHAR(32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId])
);

-- CreateTable
CREATE TABLE [dbo].[Empresas] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Nome] NVARCHAR(255) NOT NULL,
    [CNPJ] NVARCHAR(14) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [DataAtualizacao] DATETIME2,
    [DataCadastro] DATETIME2 NOT NULL CONSTRAINT [Empresas_DataCadastro_df] DEFAULT CURRENT_TIMESTAMP,
    [RazaoSocial] NVARCHAR(255) NOT NULL,
    [Telefone] NVARCHAR(20),
    [UsuarioId] INT NOT NULL,
    CONSTRAINT [PK_Empresas] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Empresas_CNPJ_key] UNIQUE NONCLUSTERED ([CNPJ]),
    CONSTRAINT [Empresas_Email_key] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[Estagiarios] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Nome] NVARCHAR(255) NOT NULL,
    [CPF] NVARCHAR(11) NOT NULL,
    [Telefone] NVARCHAR(20),
    [Email] NVARCHAR(255) NOT NULL,
    [DataCadastro] DATETIME2 NOT NULL CONSTRAINT [Estagiarios_DataCadastro_df] DEFAULT CURRENT_TIMESTAMP,
    [DataAtualizacao] DATETIME2,
    [UsuarioId] INT NOT NULL,
    [NomeCurso] NVARCHAR(255),
    CONSTRAINT [PK_Estagiarios] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Estagiarios_CPF_key] UNIQUE NONCLUSTERED ([CPF])
);

-- CreateTable
CREATE TABLE [dbo].[Orientadores] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Nome] NVARCHAR(255) NOT NULL,
    [CPF] NVARCHAR(11) NOT NULL,
    [Telefone] NVARCHAR(20),
    [Email] NVARCHAR(255) NOT NULL,
    [Departamento] NVARCHAR(255) NOT NULL,
    [DataCadastro] DATETIME2 NOT NULL CONSTRAINT [Orientadores_DataCadastro_df] DEFAULT CURRENT_TIMESTAMP,
    [DataAtualizacao] DATETIME2,
    [UsuarioId] INT NOT NULL,
    CONSTRAINT [PK_Orientadores] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Orientadores_CPF_key] UNIQUE NONCLUSTERED ([CPF])
);

-- CreateTable
CREATE TABLE [dbo].[SolicitacoesEstagio] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [DataSubmissao] DATETIME2 NOT NULL CONSTRAINT [SolicitacoesEstagio_DataSubmissao_df] DEFAULT CURRENT_TIMESTAMP,
    [Observacao] NVARCHAR(500),
    [Status] INT,
    [Email] NVARCHAR(255),
    [Token] NVARCHAR(255),
    [EstagiarioId] INT NOT NULL,
    [EmpresaId] INT,
    CONSTRAINT [PK_SolicitacoesEstagio] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Supervisores] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Nome] NVARCHAR(255) NOT NULL,
    [CPF] NVARCHAR(11) NOT NULL,
    [Cargo] NVARCHAR(255) NOT NULL,
    [EmpresaId] INT NOT NULL,
    [Email] NVARCHAR(255),
    [Telefone] NVARCHAR(20) NOT NULL,
    [UsuarioId] INT NOT NULL,
    CONSTRAINT [PK_Supervisores] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Supervisores_CPF_key] UNIQUE NONCLUSTERED ([CPF])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B611EEB6A2F] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[TermosCompromisso] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [CargaHoraria] INT,
    [ValorBolsa] FLOAT(53),
    [DataInicio] DATETIME2,
    [DataFim] DATETIME2,
    [NumeroApolice] NVARCHAR(255),
    [NomeSeguradora] NVARCHAR(255),
    [SolicitacaoEstagioId] INT NOT NULL,
    [OrientadorId] INT,
    [Justificativa] NVARCHAR(500),
    [PlanoDeAtividades] NVARCHAR(500),
    [SupervisorId] INT,
    [CaminhoArquivo] NVARCHAR(255),
    [NomeArquivo] NVARCHAR(255),
    CONSTRAINT [PK_TermosCompromisso] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_TermosCompromisso_SolicitacaoEstagioId] UNIQUE NONCLUSTERED ([SolicitacaoEstagioId])
);

-- CreateTable
CREATE TABLE [dbo].[Usuarios] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Login] NVARCHAR(255) NOT NULL,
    [Senha] NVARCHAR(255) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [Perfil] INT NOT NULL,
    [DataCadastro] DATETIME2 NOT NULL CONSTRAINT [Usuarios_DataCadastro_df] DEFAULT CURRENT_TIMESTAMP,
    [DataAtualizacao] DATETIME2,
    CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [IX_Usuarios_Login] UNIQUE NONCLUSTERED ([Login]),
    CONSTRAINT [IX_Usuarios_Email] UNIQUE NONCLUSTERED ([Email])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Empresas_UsuarioId] ON [dbo].[Empresas]([UsuarioId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Estagiarios_UsuarioId] ON [dbo].[Estagiarios]([UsuarioId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Orientadores_UsuarioId] ON [dbo].[Orientadores]([UsuarioId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SolicitacoesEstagio_EmpresaId] ON [dbo].[SolicitacoesEstagio]([EmpresaId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SolicitacoesEstagio_EstagiarioId] ON [dbo].[SolicitacoesEstagio]([EstagiarioId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Supervisores_EmpresaId] ON [dbo].[Supervisores]([EmpresaId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Supervisores_UsuarioId] ON [dbo].[Supervisores]([UsuarioId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_TermosCompromisso_OrientadorId] ON [dbo].[TermosCompromisso]([OrientadorId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_TermosCompromisso_SupervisorId] ON [dbo].[TermosCompromisso]([SupervisorId]);

-- AddForeignKey
ALTER TABLE [dbo].[Empresas] ADD CONSTRAINT [FK_Empresas_Usuarios_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[Usuarios]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Estagiarios] ADD CONSTRAINT [FK_Estagiarios_Usuarios_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[Usuarios]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Orientadores] ADD CONSTRAINT [FK_Orientadores_Usuarios_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[Usuarios]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SolicitacoesEstagio] ADD CONSTRAINT [FK_SolicitacoesEstagio_Empresas_EmpresaId] FOREIGN KEY ([EmpresaId]) REFERENCES [dbo].[Empresas]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SolicitacoesEstagio] ADD CONSTRAINT [FK_SolicitacoesEstagio_Estagiarios_EstagiarioId] FOREIGN KEY ([EstagiarioId]) REFERENCES [dbo].[Estagiarios]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Supervisores] ADD CONSTRAINT [FK_Supervisores_Empresas_EmpresaId] FOREIGN KEY ([EmpresaId]) REFERENCES [dbo].[Empresas]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Supervisores] ADD CONSTRAINT [FK_Supervisores_Usuarios_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[Usuarios]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TermosCompromisso] ADD CONSTRAINT [FK_TermosCompromisso_Orientadores_OrientadorId] FOREIGN KEY ([OrientadorId]) REFERENCES [dbo].[Orientadores]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TermosCompromisso] ADD CONSTRAINT [FK_TermosCompromisso_SolicitacoesEstagio_SolicitacaoEstagioId] FOREIGN KEY ([SolicitacaoEstagioId]) REFERENCES [dbo].[SolicitacoesEstagio]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TermosCompromisso] ADD CONSTRAINT [FK_TermosCompromisso_Supervisores_SupervisorId] FOREIGN KEY ([SupervisorId]) REFERENCES [dbo].[Supervisores]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
