# Meu Jogo Three.js

Este é um jogo 3D interativo desenvolvido com Three.js, onde o jogador navega por um ambiente tridimensional, enfrenta inimigos e coleta itens. O projeto foi criado com o objetivo de oferecer uma experiência imersiva, demonstrar boas práticas de desenvolvimento (como modularidade e baixo acoplamento) e servir como um template reutilizável para outros projetos 3D.

## Estrutura do Projeto

A organização do projeto foi pensada para facilitar a navegação e manutenção do código:

- **`public/`**: Contém os arquivos estáticos da aplicação.
  - **`index.html`**: Ponto de entrada da aplicação.
  - **`assets/`**: Modelos 3D, texturas e arquivos de áudio.
- **`src/`**: Código-fonte principal, dividido em módulos.
  - **`Experience/`**: Lógica central da experiência 3D, incluindo câmera, renderer e mundo.
  - **`Components/`**: Entidades do jogo, como `Player` (jogador) e `Enemy` (inimigos).
  - **`Managers/`**: Gerenciadores de lógica, como `GameManager` (estado do jogo) e `InputManager` (controles).
  - **`Config/`**: Arquivos de configuração e constantes globais.
  - **`Utils/`**: Funções utilitárias reutilizáveis.
- **`node_modules/`**: Dependências do projeto.
- **`package.json`**: Configuração do projeto e lista de dependências.
- **`vite.config.js`**: Configuração do Vite para build e desenvolvimento.

## Dependências e Instalação

### Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** como gerenciador de pacotes

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Execução do Projeto

### Modo Desenvolvimento
Para iniciar o projeto em modo de desenvolvimento com hot-reload:
```bash
npm run dev
```
Acesse a aplicação em `http://localhost:3000`.

### Modo Produção
Para criar uma versão otimizada e servi-la:
1. Gere o build:
   ```bash
   npm run build
   ```
2. Sirva o projeto:
   ```bash
   npm run serve
   ```

## Funcionalidades Principais

- **Experience**: Orquestra os elementos principais da cena 3D, como câmera, renderer e o mundo do jogo.
- **World**: Define o ambiente tridimensional, incluindo o jogador, inimigos e objetos interativos.
- **Player**: Entidade controlada pelo usuário, com suporte a movimentação e interações.
- **Enemy**: Inimigos com comportamentos básicos de inteligência artificial.
- **Managers**: Controlam aspectos como estado do jogo, entrada de comandos (inputs), interface de usuário (UI) e áudio.

*(Dica: Adicione capturas de tela ou GIFs do jogo em ação para enriquecer esta seção!)*

## Contribuição

Gostaria de ajudar a melhorar o projeto? Aqui estão algumas orientações:

- **Reportar Problemas**: Abra uma *issue* no GitHub para relatar bugs ou sugerir novas funcionalidades.
- **Enviar Pull Requests**: 
  1. Faça um fork do repositório.
  2. Crie uma branch para sua alteração (`git checkout -b minha-alteracao`).
  3. Adicione testes, se aplicável, e siga o estilo de código existente.
  4. Envie um *pull request* com uma descrição clara das mudanças.
- **Estilo de Código**: Utilizamos ESLint para manter a consistência. Execute `npm run lint` antes de submeter alterações.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Sinta-se à vontade para usar, modificar e distribuir, desde que a licença seja incluída.