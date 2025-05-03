# Registro de Progresso - DevConnect

## Task Atual

*   Criação da funcionalidade de Discussões.
*   Refinamentos de UI/UX (Navbar, Views Devise)

## O que foi feito (03/05/2025)

*   Instalado e configurado ActionText para editor rico.
*   Gerado scaffold para `Discussion` com campos: `title:string`, `content:rich_text`, `user:references`, `pinned:boolean`, `closed:boolean`.
*   Gerado scaffold para `Reply` com campos: `discussion:references`, `user:references`, `content:rich_text`, `marked_as_answer:boolean`.
*   Gerado model `Vote` com campos: `user:references`, `votable:references{polymorphic}`, `value:integer`.
*   Gerado model `Reaction` com campos: `user:references`, `reactable:references{polymorphic}`, `emoji:string`.
*   Executadas as migrations correspondentes.
*   Configuradas associações e validações básicas nos models (`User`, `Discussion`, `Reply`, `Vote`, `Reaction`).
*   Arquivos de teste básicos gerados.
*   Ajustado espaçamento e visual da página de Nova Discussão.
*   Implementado `before_action :authenticate_user!` no `DiscussionsController`.
*   Geradas e estilizadas views do Devise (login, registro, recuperação de senha, confirmação) com Tailwind, incluindo dark mode.
*   Criado layout `auth.html.erb` específico para Devise, centralizando conteúdo e adicionando imagem lateral com citação.
*   Criado helper `user_initials` para gerar iniciais do nome.
*   Criado controller Stimulus `dropdown` para gerenciar o menu de usuário na navbar.
*   Atualizada navbar para usar o controller `dropdown`, exibir iniciais do usuário quando sem avatar, e mostrar botões Entrar/Criar Conta para usuários deslogados.

## O que falta

*   Configurar as rotas para aninhar `Replies` dentro de `Discussions`.
*   Ajustar os controllers e views de `Discussions` e `Replies` para usar ActionText (`content`).
*   Implementar a lógica de votos e reações nos controllers/views.
*   Implementar a marcação de "resposta correta".
*   Adicionar testes específicos para as funcionalidades.
*   Refinar as views e formulários (Ex: `discussions/show`). 