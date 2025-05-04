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


[![](https://img.plantuml.biz/plantuml/dsvg/hLZDSXit4hxpAH0U8aehqKdjZPLo8aiiXodPKebsvR2r1t06964F1XC0GqlUoiDuzv1AgdnovGduOljr0qE2FwfSSX5dCEX6_tpzTKC_-21TQ4qbBjqlhGugj4w-MJgbVfh-P1Usr_igB9LHmiYWd9QztecuggJtoeixf-j2Dr9xKIfn2tdbWvFhtzR_iqA9A-kKO5N3TxvNa90OFpJGekf2YV_qXFX78OroSYIk-9TMdAfBvPGRYVlqHAiVhAlAaVYPVkZT5wfM8_7cn_lnU3Yb5reDsj0Y_l8U_L7vaPZIJzJiRUiAMhll7ja6My_r0ZRmBwsqJGbl1wUzNtl9xcXVj5dNY1ayw8w_KyutgWXwfRPkG6bmji9PjswcmrLw_LwSYDjMs1Pl8kZ6KkJINfMCXBqu-gWPNKYE6_ApchsyoQDsJ1aCY5j4PMspLSsXZNfLlTBEraRLOIJ6snVwrbJoaP9pnx_Vn-tAQ8hg60-F__ethScol9szGr06bd-Uy2TJ7e_sRNsZ5ylGkNIj7KNMrhBYTTPjPa1GsDbtcQtjkV1ADYCHhO3lRzG38Pp2dlGeCkT4l0swqc7zoMaBE5j6RxAI02M--swymkwnqG65yFnvj3VeuZt7z6efZOHORJckeacrKT4kMmyK2P-BGbRLJ1RlEHvsFZ-w7fnUB9JhlY5eac8MZM4uFs7D1rs6vKZKhPb502nL3D9sfT4FghgN26c-kW7AhnkWfG9vuYGGXV5PM2z12C733UVK0d7WmggiB0T93pjMoO-FDxH8_14eR9UbBYYxY5mZaHRQ8KXEruk_Bt98xqlK11A2W-0hPVzc_MMX2mO2yrpq-oKA-9MivQAhCLz080_L0Zkc0JWU2P0Tp8GN0weAF9x3YTQhybpGBhjIZgrYYYNDiH9HVTkNM1DJEcNGM5q7tua4658iDT7SD7ix4hH5yetGpeG26kOSTDcSr4qREhUE9nJvQ1l-SADzG4ax7mqyaW6OC7uOYPFtwh6q7-gJSt72fYjduFF9NqBuxMGdn5a8hhMdK0uuwZ4GI_k1edMBO4uBz98wG-bbMsgRwqe4DRLjpSYhozUGFTr-UTLwNGpGf8htyGk3uygQnjR41VxPk0wwbALY4c1ao1brDS0y7lf2UaMRmcCqtoY_x6WeSju_hpEsArKL9378rkp8dG9C12WSAbpAkgmKvsoWwUyrHs-NG3l-1EC-gKZg5sefLzg2hoydtVC-4v-8YuiB57mb6LGC8azhz2dhrxRhxoAHO_xjuk9vryFtbpSDQVz3RERxgzozznTZ3p_Kt7Nn0rDYA-VKOWXfFTLv0qFMVr2X-DwcaGw7ptCdHw9VAuLOye0XlXPnGEdtOdkatLjgt6mcmbAbO5Rp-Lxk79jj30L1GugOMoTY4ZRxsV2ysyRb_hTzSOO4zRyP3l6Oi0ETD3L8Z03z8nlF-WaQE_iGZbGiNd2vuj5W-Z0fevZPjkWVw5B9YWnHOgMbu4e6C6mBsNSg3ddWcZokfxsSFoa0srA79SbXBFOFDkxcmCZ7RYfYAXNCX-1PejTdOF0MzTJlxV0QQTb6fxP1pp6LY3YmYC761m_1j8z4TdH0i6BwyvmXhhuarUV1gKhJRMFXkbUqfSI8WhII_fnOkNesqVGa93lUbbv8AmpeoJu3pcI6cAo6OGp6A2yKlP8h87U69MVoNXMjypQf1i91-33BKJuxCYCAurDw-Q1r0EAMXld0Wn48qCW6MCdiEBxV80ALVzQ9zGzcg7sx36uNTgTKkmhPNpkezXqBzifhtr9Uov5EgJ9a22ekjmznihiPEu1J_fKSr_KI9c7EwSBioN4kyltjlJYd7Inl0tdm2KQ_jYjWeqZtgmmltJM4UIrTdIoF_o4VmwwWpibAVvIY-nnHy8uQsMQ4pCU9gAl5t5Q7dRacjd5PUqtpzo1O_fertqr7IRU61o0IJOMk0u_fCf0rcDSsm3LlP-2P5rRIxN7z2UEpZBq6zQg4esbLs7d61j1yTZR92USw8vpHsHasP4ZXkYnmJwNAz67ztqZtGX0AlMhzJdaCOiiwt_IeSw52CQHU2rLmSltfegA48EpM8SkrGkOy0-YSDgqqGepmUiIhKW4X5ulApd0Z7lQWKf1NlUXRfURiMWuoTkw5r0zMN1OMJCNDDpgr0yOw-hw2RtJF846p_ZrOyYhoJoHg03rIsn0xtdfqFWFRG6Y61zsEmmSvxiXR7YFHtZi2XIJ2Xt5hHPVP6YATQAaIAzBkQgbY8q5Gf3bmUMP3eEOoprYDNPxUtaokeviNz7f_XnVC3wLCs0SReMHXD3GZMrxEKBZ4fFJToM4IlBrYmJia_G92NRqWNdO5M-b-dIpMHY_uKYBWF7T6tyvIdPt2NKDyXeQ12qow2QFFPJsgE_5coYTEDyAaFcCWof7XnW3z7alj-lDA4HoY_2JAJoXeSqaqC92_jFfS6Fel2d1MACZ8wZJJfEY_2-lFPDn6p_M4zRnQVodRAZefA_I7cewhn20p_NIB7iC1Y1qRYdFaGC6CWTXfY4Wu9Sj8FKl6IHYL-AVYGI21uY3n0HTWP3t_BmkIXS47nBIfuww19RYRfb9a2XAGNm8ZDDEzad0VXomY4YWng3wKhr7LqZgkH5ADTCB3fJsmQyClMNZOjfVxDwWntw2YQM-vTG2CPlq9kQfbTiMAvaMQZ76XqgHSEZjhFL4UKJBYg-Tq1h5E9vfe-KccO9ooUNUoT1IrAGuAQl6OsPMnC9i29aHPQvSTYArCUYvqmptidrpkeNvJUdniRjGFU6nDzNy0)](https://editor.plantuml.com/uml/hLZDSXit4hxpAH0U8aehqKdjZPLo8aiiXodPKebsvR2r1t06964F1XC0GqlUoiDuzv1AgdnovGduOljr0qE2FwfSSX5dCEX6_tpzTKC_-21TQ4qbBjqlhGugj4w-MJgbVfh-P1Usr_igB9LHmiYWd9QztecuggJtoeixf-j2Dr9xKIfn2tdbWvFhtzR_iqA9A-kKO5N3TxvNa90OFpJGekf2YV_qXFX78OroSYIk-9TMdAfBvPGRYVlqHAiVhAlAaVYPVkZT5wfM8_7cn_lnU3Yb5reDsj0Y_l8U_L7vaPZIJzJiRUiAMhll7ja6My_r0ZRmBwsqJGbl1wUzNtl9xcXVj5dNY1ayw8w_KyutgWXwfRPkG6bmji9PjswcmrLw_LwSYDjMs1Pl8kZ6KkJINfMCXBqu-gWPNKYE6_ApchsyoQDsJ1aCY5j4PMspLSsXZNfLlTBEraRLOIJ6snVwrbJoaP9pnx_Vn-tAQ8hg60-F__ethScol9szGr06bd-Uy2TJ7e_sRNsZ5ylGkNIj7KNMrhBYTTPjPa1GsDbtcQtjkV1ADYCHhO3lRzG38Pp2dlGeCkT4l0swqc7zoMaBE5j6RxAI02M--swymkwnqG65yFnvj3VeuZt7z6efZOHORJckeacrKT4kMmyK2P-BGbRLJ1RlEHvsFZ-w7fnUB9JhlY5eac8MZM4uFs7D1rs6vKZKhPb502nL3D9sfT4FghgN26c-kW7AhnkWfG9vuYGGXV5PM2z12C733UVK0d7WmggiB0T93pjMoO-FDxH8_14eR9UbBYYxY5mZaHRQ8KXEruk_Bt98xqlK11A2W-0hPVzc_MMX2mO2yrpq-oKA-9MivQAhCLz080_L0Zkc0JWU2P0Tp8GN0weAF9x3YTQhybpGBhjIZgrYYYNDiH9HVTkNM1DJEcNGM5q7tua4658iDT7SD7ix4hH5yetGpeG26kOSTDcSr4qREhUE9nJvQ1l-SADzG4ax7mqyaW6OC7uOYPFtwh6q7-gJSt72fYjduFF9NqBuxMGdn5a8hhMdK0uuwZ4GI_k1edMBO4uBz98wG-bbMsgRwqe4DRLjpSYhozUGFTr-UTLwNGpGf8htyGk3uygQnjR41VxPk0wwbALY4c1ao1brDS0y7lf2UaMRmcCqtoY_x6WeSju_hpEsArKL9378rkp8dG9C12WSAbpAkgmKvsoWwUyrHs-NG3l-1EC-gKZg5sefLzg2hoydtVC-4v-8YuiB57mb6LGC8azhz2dhrxRhxoAHO_xjuk9vryFtbpSDQVz3RERxgzozznTZ3p_Kt7Nn0rDYA-VKOWXfFTLv0qFMVr2X-DwcaGw7ptCdHw9VAuLOye0XlXPnGEdtOdkatLjgt6mcmbAbO5Rp-Lxk79jj30L1GugOMoTY4ZRxsV2ysyRb_hTzSOO4zRyP3l6Oi0ETD3L8Z03z8nlF-WaQE_iGZbGiNd2vuj5W-Z0fevZPjkWVw5B9YWnHOgMbu4e6C6mBsNSg3ddWcZokfxsSFoa0srA79SbXBFOFDkxcmCZ7RYfYAXNCX-1PejTdOF0MzTJlxV0QQTb6fxP1pp6LY3YmYC761m_1j8z4TdH0i6BwyvmXhhuarUV1gKhJRMFXkbUqfSI8WhII_fnOkNesqVGa93lUbbv8AmpeoJu3pcI6cAo6OGp6A2yKlP8h87U69MVoNXMjypQf1i91-33BKJuxCYCAurDw-Q1r0EAMXld0Wn48qCW6MCdiEBxV80ALVzQ9zGzcg7sx36uNTgTKkmhPNpkezXqBzifhtr9Uov5EgJ9a22ekjmznihiPEu1J_fKSr_KI9c7EwSBioN4kyltjlJYd7Inl0tdm2KQ_jYjWeqZtgmmltJM4UIrTdIoF_o4VmwwWpibAVvIY-nnHy8uQsMQ4pCU9gAl5t5Q7dRacjd5PUqtpzo1O_fertqr7IRU61o0IJOMk0u_fCf0rcDSsm3LlP-2P5rRIxN7z2UEpZBq6zQg4esbLs7d61j1yTZR92USw8vpHsHasP4ZXkYnmJwNAz67ztqZtGX0AlMhzJdaCOiiwt_IeSw52CQHU2rLmSltfegA48EpM8SkrGkOy0-YSDgqqGepmUiIhKW4X5ulApd0Z7lQWKf1NlUXRfURiMWuoTkw5r0zMN1OMJCNDDpgr0yOw-hw2RtJF846p_ZrOyYhoJoHg03rIsn0xtdfqFWFRG6Y61zsEmmSvxiXR7YFHtZi2XIJ2Xt5hHPVP6YATQAaIAzBkQgbY8q5Gf3bmUMP3eEOoprYDNPxUtaokeviNz7f_XnVC3wLCs0SReMHXD3GZMrxEKBZ4fFJToM4IlBrYmJia_G92NRqWNdO5M-b-dIpMHY_uKYBWF7T6tyvIdPt2NKDyXeQ12qow2QFFPJsgE_5coYTEDyAaFcCWof7XnW3z7alj-lDA4HoY_2JAJoXeSqaqC92_jFfS6Fel2d1MACZ8wZJJfEY_2-lFPDn6p_M4zRnQVodRAZefA_I7cewhn20p_NIB7iC1Y1qRYdFaGC6CWTXfY4Wu9Sj8FKl6IHYL-AVYGI21uY3n0HTWP3t_BmkIXS47nBIfuww19RYRfb9a2XAGNm8ZDDEzad0VXomY4YWng3wKhr7LqZgkH5ADTCB3fJsmQyClMNZOjfVxDwWntw2YQM-vTG2CPlq9kQfbTiMAvaMQZ76XqgHSEZjhFL4UKJBYg-Tq1h5E9vfe-KccO9ooUNUoT1IrAGuAQl6OsPMnC9i29aHPQvSTYArCUYvqmptidrpkeNvJUdniRjGFU6nDzNy0)
