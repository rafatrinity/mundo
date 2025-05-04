# Mundo

Este projeto, "Mundo", visa criar uma experiência 3D de mundo aberto, explorável e multiplayer, acessível diretamente pelo navegador web. Utilizando **Three.js** e tecnologias web modernas (como Vite), o objetivo é construir um ambiente virtual compartilhado, otimizado para performance e com suporte a diversas formas de interação.

## Estrutura do Projeto

A organização do projeto busca clareza, modularidade e facilidade de manutenção:

- **`public/`**: Contém os arquivos estáticos da aplicação.
  - **`index.html`**: Ponto de entrada da aplicação web.
  - **`assets/`**: Modelos 3D (mapa, avatares, objetos), texturas, arquivos de áudio e outros recursos.
- **`src/`**: Código-fonte principal da aplicação.
  - **`Experience/`**: Orquestra a cena 3D principal: câmera, renderer, loop de atualização e elementos centrais da experiência.
  - **`World/`**: Lógica relacionada ao ambiente do jogo, carregamento de cenário, elementos estáticos e dinâmicos.
  - **`Components/`**: Entidades dinâmicas da cena, como `Player` (representação do avatar do usuário) e outros elementos interativos ou NPCs básicos.
  - **`Managers/`**: Gerenciadores de sistemas específicos:
    - `InputManager`: Captura e processa entradas do usuário (teclado, mouse, touch, gamepad, sensores).
    - `NetworkManager`: Gerencia a comunicação com o servidor para a funcionalidade multiplayer (conexão, sincronização).
    - `UIManager`: Controla a interface do usuário (HUD) sobreposta à cena 3D.
    - `WorldManager`: Responsável pela lógica de carregamento, streaming ou gerenciamento de partes do mundo.
  - **`Config/`**: Arquivos de configuração, constantes e definições globais.
  - **`Utils/`**: Funções utilitárias reutilizáveis em diferentes partes do projeto.
- **`node_modules/`**: Dependências do projeto (gerenciadas pelo npm/yarn).
- **`package.json`**: Configuração do projeto Node.js, scripts e lista de dependências.
- **`vite.config.js`**: Configuração específica do Vite para o servidor de desenvolvimento e build de produção.
- **`(backend)/`** (Opcional/Separado): Pode haver um diretório ou repositório separado para o código do servidor Node.js responsável pelo multiplayer.

## Dependências e Instalação

### Pré-requisitos

- **Node.js** (Verifique a versão recomendada no `package.json` ou use LTS)
- **npm** ou **yarn** como gerenciador de pacotes

### Passos para Instalação (Frontend)

1. Clone o repositório:

   ```bash
   git clone https://github.com/rafatrinity/mundo.git
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
