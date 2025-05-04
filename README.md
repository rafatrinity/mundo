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
   cd mundo
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou
   # yarn install
   ```

*(Nota: Se houver um backend separado, siga as instruções de instalação dele também.)*

## Execução do Projeto

### Modo Desenvolvimento (Frontend)
Para iniciar o servidor de desenvolvimento Vite com hot-reload:
```bash
npm run dev
# ou
# yarn dev
```
Acesse a aplicação no endereço fornecido pelo Vite (geralmente algo como `http://localhost:5173`, mas verifique a saída do terminal).

### Modo Produção (Frontend)
Para criar uma versão otimizada para deploy:
1. Gere o build:
   ```bash
   npm run build
   # ou
   # yarn build
   ```
   Os arquivos otimizados estarão na pasta `dist/`.
2. Para testar o build localmente (simulando um servidor de produção):
   ```bash
   npm run preview
   # ou
   # yarn preview
   ```
   Acesse no endereço fornecido pelo Vite.

*(Nota: Para a funcionalidade multiplayer completa, o servidor backend também precisa estar em execução.)*

## Funcionalidades Planejadas / Principais

O desenvolvimento está organizado em torno das seguintes funcionalidades chave (veja as [Issues](https://github.com/rafatrinity/mundo/issues) para detalhes e progresso):

- **Mundo Vasto e Explorável**: Implementação de um mapa grande, utilizando estratégias eficientes de carregamento/streaming (ex: chunks, tiles) para otimização web.
- **Multiplayer em Tempo Real**: Conexão de múltiplos jogadores via WebSockets (ou tecnologia similar), com sincronização de posição, rotação e interações básicas.
- **Avatar do Jogador**: Representação 3D do jogador na cena, com movimentação controlada pelo usuário.
- **Controles Flexíveis**: Suporte a múltiplos métodos de entrada: teclado/mouse, toque (mobile), gamepad e exploração do uso de sensores de dispositivos móveis (giroscópio, acelerômetro, bússola).
- **Interface de Usuário (HUD)**: Exibição de informações relevantes na tela (lista de jogadores, chat básico, status, etc.) usando HTML/CSS sobreposto ao canvas 3D.
- **Otimização Web**: Foco contínuo em performance (análise de gargalos, LOD para avatares, carregamento eficiente de assets) para garantir uma experiência fluida no navegador.
- **Interação com o Mundo**: Adição gradual de elementos no ambiente com os quais os jogadores possam interagir.

*(Dica: Adicione capturas de tela ou GIFs do projeto em desenvolvimento aqui para enriquecer esta seção!)*

## Contribuição

Interessado em contribuir para o "Mundo"? Ótimo!

- **Reportar Problemas**: Encontrou um bug ou tem uma ideia? Abra uma [Issue](https://github.com/rafatrinity/mundo/issues).
- **Enviar Pull Requests**:
  1. Faça um fork do repositório `rafatrinity/mundo`.
  2. Crie uma branch para sua funcionalidade ou correção (ex: `git checkout -b feature/nova-interacao` ou `fix/bug-movimento`).
  3. Faça suas alterações e commit (`git commit -m 'feat: Adiciona interação X'`).
  4. Garanta que o código segue os padrões (use `npm run lint` se configurado).
  5. Envie um *Pull Request* para a branch principal (`main` ou `master`) do repositório original com uma descrição clara do que foi feito.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). (Certifique-se de ter um arquivo `LICENSE` no seu repositório contendo o texto da licença MIT).
