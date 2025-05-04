# Lista de Issues e Tarefas

Esta lista organiza as issues do projeto com subtarefas (checklists) e comentários sobre dependências, para que você possa acompanhar o progresso e definir prioridades.

---

## Issue #20: [World] Adicionar Objetos Interativos Básicos  

*Descrição:* Criar objetos interativos simples (por exemplo, itens ou caixas colecionáveis) para testar a mecânica de interação dos jogadores. Esses objetos devem ter estado compartilhado entre clientes (por exemplo, desaparecer quando coletados).  
*Dependências:* Baseado na estrutura do mundo (Issue #3) e sincronização posterior (Issue #19).

- [ ] **Protótipo de Objetos:** Criar modelos básicos de itens/caixas colecionáveis.  
- [ ] **Mecânica de Interação:** Desenvolver a lógica que permite que o objeto seja coletado (e desapareça) quando o jogador interagir.  
- [ ] **Estado Compartilhado:** Implementar a atualização do estado do objeto para refletir a coleta em todos os clientes.  
- [ ] **Integração e Testes:** Validar a integração com o mundo básico e testes individuais de interação.

---

## Issue #19: [Multiplayer] Sincronizar Interações no Mundo  

*Descrição:* Sincronizar, via servidor, as interações dos jogadores com os objetos interativos. Ao interagir (por exemplo, ao coletar um item), o estado do objeto deve ser atualizado de forma consistente para todos os clientes.  
*Dependências:* Depende da sincronização de posições (Issue #9) e da existência dos elementos interativos (ver Issue #20 e #18).

- [ ] **Comunicação Server-Cliente:** Criar endpoints ou rotinas no servidor para receber e distribuir eventos de interação.  
- [ ] **Atualização Consistente:** Garantir que, ao coletar um item, o objeto seja removido ou alterado para todos os clientes.  
- [ ] **Integração com Sincronização:** Conectar a lógica de interação com o sistema de sincronização (ver Issue #9).  
- [ ] **Validação e Testes:** Testar a sincronização em cenários com múltiplos clientes conectados.

---

## Issue #18: [World] Adição de Elementos Interativos Simples  

*Descrição:* Adicionar objetos simples no mundo com os quais os jogadores possam interagir, como botões que mudam de estado/cor, itens que podem ser coletados e portas que abrem ou fecham.

- [ ] **Definição de Elementos:** Listar e definir os tipos de elementos interativos a serem implementados.  
- [ ] **Implementação dos Comportamentos:** Desenvolver scripts para alterar o estado (ex.: mudança de cor, desaparecimento ou abertura).  
- [ ] **Integração com o Mundo:** Adicionar os elementos ao cenário e associar eventos de interatividade.  
- [ ] **Teste de Funcionalidades:** Realizar testes unitários e de integração para validar o funcionamento de cada elemento.

---

## Issue #17: [UI] Implementar HUD Básico  

*Descrição:* Desenvolver uma interface de usuário básica (HUD) sobreposta ao canvas 3D utilizando HTML/CSS. Essa HUD deve exibir a lista de jogadores online, um chat simples e indicadores de status (como permissões de sensores, por exemplo).

- [ ] **Layout e Design:** Esboçar e implementar o layout da HUD (HTML/CSS).  
- [ ] **Lista de Jogadores:** Criar um componente que atualiza em tempo real a lista de jogadores conectados.  
- [ ] **Chat Simples:** Desenvolver a funcionalidade de chat, inclusive com publicação de mensagens.  
- [ ] **Indicadores de Status:** Adicionar indicadores (ex.: status de conexão, permissões) conforme especificado na arquitetura.  
- [ ] **Integração com Backend:** Garantir que a HUD responda às mudanças de estado enviadas pelo servidor.

---

## Issue #16: [Optimization] Otimizar Carregamento Dinâmico do Mundo  

*Descrição:* Refinar o sistema de carregamento do mundo para suportar mapas grandes, implementando o carregamento/descarregamento dinâmico de partes (chunks/tiles/assets) conforme a movimentação do jogador.  
*Dependências:* Baseado na estrutura do mundo (Issue #3) e estratégia de carregamento definida (Issue #2).

- [ ] **Revisão da Implementação Atual:** Analisar o carregamento do mundo definido na Issue #3.  
- [ ] **Lógica de Streaming:** Implementar detecção de movimento do jogador e carregamento dinâmico de chunks ou tiles.  
- [ ] **Gerenciamento de Memória:** Otimizar a liberação de assets não utilizados e minimizar os tempos de carregamento.  
- [ ] **Testes de Performance:** Realizar benchmark em mapas grandes e ajustar a implementação.

---

## Issue #15: [Optimization] Implementar LOD para Avatares  

*Descrição:* Implantar o Nível de Detalhe (LOD) para reduzir a carga de renderização de avatares distantes, substituindo modelos complexos por versões simplificadas.

- [ ] **Análise dos Modelos:** Verificar a complexidade dos modelos atuais e identificar gargalos na renderização.  
- [ ] **Criação de LODs:** Desenvolver versões simplificadas dos avatares para serem utilizadas quando distantes da câmera.  
- [ ] **Integração no Pipeline:** Ajustar o sistema de renderização para trocar modelos conforme a distância.  
- [ ] **Validação de Performance:** Comparar a performance antes e depois da implementação do LOD.

---

## Issue #14: [Optimization] Analisar Performance Inicial da Cena  

*Descrição:* Configurar e utilizar ferramentas de profiling para analisar a performance da cena com múltiplos jogadores (mesmo que simulados), identificando os principais gargalos em CPU, GPU, memória e rede.

- [ ] **Configuração de Ferramentas:** Instalar e configurar ferramentas como Stats.js, Chrome DevTools Performance e SpectoGL.  
- [ ] **Coleta de Dados:** Executar testes em cenário com múltiplos jogadores e coletar métricas de performance.  
- [ ] **Análise dos Gargalos:** Identificar e documentar problemas em CPU, GPU, memória ou rede.  
- [ ] **Documentação e Plano de Otimização:** Criar um relatório com sugestões e prioridades para otimizações futuras.

---

## Issue #13: [Input] Integrar Sensor de Orientação (Magnetômetro)  

*Descrição:* Usar o magnetômetro do dispositivo para funcionalidades como orientar um minimapa ou influenciar a câmera.  

- [ ] **Verificação da API:** Confirmar a disponibilidade da API de magnetômetro nos dispositivos alvo.  
- [ ] **Implementação da Funcionalidade:** Desenvolver a utilização dos dados do magnetômetro para melhorar a experiência (ex.: ajuste do minimapa).  
- [ ] **Permissões e Fallback:** Implementar solicitações de permissão e criar comportamentos alternativos caso o sensor não esteja disponível.  
- [ ] **Testes Cruzados:** Validar o funcionamento em diferentes dispositivos e navegadores.

---

## Issue #12: [Input] Integrar Sensores de Movimento (Giroscópio/Acelerômetro)  

*Descrição:* Permitir que o usuário controle a câmera ou execute ações por meio dos sensores de movimento do dispositivo.

- [ ] **Detecção de Suporte:** Verificar se a API dos sensores de movimento está disponível no dispositivo.  
- [ ] **Implementação de Controles:** Mapear os dados dos sensores para ações de controle (ex.: rotação da câmera).  
- [ ] **Permissão e Fallback:** Solicitar permissões necessárias e implementar soluções caso o sensor não esteja disponível.  
- [ ] **Validação de Usabilidade:** Realizar testes e ajustes para garantir uma experiência fluida.

---

## Issue #11: [Input] Integrar API de Gamepad do Navegador  

*Descrição:* Integrar a API de gamepad para permitir controle do jogo via joystick ou gamepad.

- [ ] **Detectar Disponibilidade:** Verificar a existência e conectividade da API de gamepad no navegador.  
- [ ] **Mapeamento de Controles:** Implementar a detecção do estado do gamepad e vincular aos comandos do jogo.  
- [ ] **Feedback de Conexão:** Exibir mensagens ou avisos caso o gamepad não esteja conectado.  
- [ ] **Testes Multi-Plataforma:** Testar com diferentes gamepads e em variados navegadores.

---

## Issue #10: [Input] Criar Camada de Abstração de Entrada  

*Descrição:* Refatorar o sistema de input para que diversas fontes (teclado, mouse, toque, gamepad e sensores) disparem ações genéricas, simplificando a lógica do jogo.

- [ ] **Mapeamento de Inputs:** Levantar os eventos de entrada atuais e definir ações genéricas (por exemplo, 'mover_frente', 'interagir').  
- [ ] **Refatoração do Código:** Ajustar o sistema para disparar eventos genéricos em vez de ler os eventos brutos.  
- [ ] **Documentação:** Documentar a nova camada de abstração para facilitar futuras integrações e adaptações.  
- [ ] **Teste de Extensibilidade:** Validar que a nova abordagem facilita a integração de novos métodos de controle.

---

## Issue #9: [Multiplayer] Sincronizar Posições de Jogadores  

*Descrição:* Implementar a sincronização de posição e rotação dos jogadores, enviando dados entre cliente e servidor para atualizar a representação visual entre todos.

- [ ] **Envio de Dados:** Configurar o cliente para enviar dados de transformação (posição e rotação) para o servidor.  
- [ ] **Broadcast no Servidor:** Implementar o repasse desses dados para os demais clientes conectados.  
- [ ] **Interpolação/Extrapolação:** Aplicar técnicas para suavizar os movimentos dos jogadores remotos.  
- [ ] **Integração com Conexão:** Certificar que essa sincronização se encaixa com a lógica de conexão e desconexão (Issue #8).

---

## Issue #8: [Multiplayer] Configurar Servidor Node.js Básico  

*Descrição:* Configurar o ambiente do servidor para lidar com múltiplos clientes, tratando conexões e desconexões de forma básica.

- [ ] **Setup do Ambiente:** Configurar o Node.js para o servidor do jogo.  
- [ ] **Lógica de Conexão:** Implementar handlers para `on connection` e `on disconnect`, gerenciando clientes.  
- [ ] **Lista de Clientes:** Manter uma lista atualizada dos clientes conectados, possibilitando broadcast.  
- [ ] **Testes de Comunicação:** Realizar testes iniciais de conexão para validar a comunicação básica.

---

## Issue #7: [Multiplayer] Definir Tecnologia de Rede  

*Descrição:* Pesquisar e decidir qual tecnologia e biblioteca utilizar para o multiplayer, considerando aspectos como facilidade de uso, performance, escalabilidade e latência.

- [ ] **Pesquisa de Tecnologias:** Revisar opções como WebSockets, WebRTC, Socket.IO, Colyseus, uWebSockets.js, entre outras.  
- [ ] **Avaliação de Trade-offs:** Listar prós e contras de cada alternativa em termos de requisitos do projeto.  
- [ ] **Documentação da Escolha:** Documentar a decisão final e as justificativas técnicas para a opção adotada.  
- [ ] **Revisão Arquitetural:** Confirmar que a tecnologia escolhida atende aos requisitos do multiplayer em tempo real.

---

## Issue #6: [Input] Adicionar Controles de Toque (Mobile)  

*Descrição:* Implementar controles via toque para dispositivos móveis, como um joystick virtual ou gestos de arrasto, para movimentação e rotação da câmera.

- [ ] **Design de UI Mobile:** Criar um layout intuitivo e responsivo para os controles de toque.  
- [ ] **Implementação do Joystick Virtual:** Desenvolver a lógica para detectar toques e arrastos, convertendo-os em comandos de movimentação.  
- [ ] **Integração:** Conectar os controles de toque à camada de abstração de input (Issue #10).  
- [ ] **Testes em Dispositivos:** Validar a usabilidade em diferentes tipos de dispositivos móveis.

---

## Issue #5: [Input] Adicionar Controles de Teclado/Mouse  

*Descrição:* Permitir a movimentação do jogador e controle da câmera utilizando teclado (WASD ou setas) e mouse.

- [ ] **Implementação de Movimentação:** Codificar a lógica de movimentação usando as teclas WASD ou setas.  
- [ ] **Controle de Câmera:** Integrar o uso do mouse para rotação e direcionamento da câmera, possibilitando uma visão livre.  
- [ ] **Integração com Mundo Básico:** Garantir que o movimento se integre com o cenário criado na Issue #3.  
- [ ] **Testes e Ajustes:** Validar a responsividade e ajustar a sensibilidade dos controles.

---

## Issue #4: [Player] Implementar Avatar 3D Básico  

*Descrição:* Adicionar um avatar 3D simples para cada jogador, utilizando objetos primitivos ou modelos leves (GLTF/GLB).

- [ ] **Seleção ou Criação do Modelo:** Escolher entre um modelo básico (ex.: BoxGeometry, SphereGeometry) ou importar um modelo simples.  
- [ ] **Posicionamento Inicial:** Definir e aplicar o ponto inicial do avatar no mundo, conforme a estrutura definida na Issue #3.  
- [ ] **Integração com Sistemas de Movimento:** Conectar o avatar ao sistema de input e sincronização de movimentação.  
- [ ] **Teste Visual:** Validar que o avatar seja exibido corretamente e responda às interações.

---

## Issue #3: [World] Implementar Mundo Básico para Testes  

*Descrição:* Desenvolver um protótipo do mundo de teste, com um ambiente amplo para validação dos sistemas de movimentação e interação.

- [ ] **Criação do Mundo:** Implementar uma esfera gigante, essa esfera deverá ser gigante, tão grande que pareça como um plano na visão do jogador, deverá ter escala planetaria.  
- [ ] **Marcadores Visuais:** Adicionar cubos ou outros marcadores que ajudem a definir a escala e facilitam os testes de movimentação.  
- [ ] **Integração Inicial:** Garantir que a movimentação do jogador seja testável neste ambiente.  
- [ ] **Documentação para Atualizações:** Anotar potenciais melhorias e escalabilidade para futuras implementações.

---

## Issue #2: [World] Definir Estratégia de Carregamento do Mundo Explorado  

*Descrição:* Pesquisar e definir abordagens para implementar um mapa grande, considerando técnicas como tiles, chunks, streaming ou geração procedural.  
*Dependências:* Essencial para otimização e escalabilidade (ligação com Issue #16).

- [x] **Pesquisa de Abordagens:** Investigar técnicas (tiles, chunks, streaming, procedural) para carregamento de mapas grandes.  
- [x] **Avaliação de Trade-offs:** Analisar performance, uso de memória e tempos de carregamento para cada abordagem.  
- [x] **Seleção da Estratégia:** Escolher a solução mais viável para o projeto com base na avaliação.  
- [x] **Documentação Técnica:** Registrar a decisão, justificativas e requisitos para a implementação.

---

## Issue #1: [Core] Inicializar Projeto com Vite e Three.js  

*Descrição:* Configurar a base do projeto utilizando Vite e Three.js, garantindo a operacionalidade inicial da cena, câmera e renderizador.

- [x] **Setup Inicial:** Configurar o template Vite integrado com Three.js.  
- [x] **Limpeza do Boilerplate:** Remover códigos não utilizados e estabelecer padrões iniciais de organização.  
- [x] **Validação dos Elementos Básicos:** Confirmar que a cena, a câmera e o renderer estão funcionando corretamente.  
- [x] **Documentação do Projeto:** Estabelecer diretrizes de arquitetura e organização para futuras implementações.
