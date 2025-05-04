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

[![](https://img.plantuml.biz/plantuml/dsvg/bLbDRoEv4RthLp0wh3wYaHFiJHXursiBCrxOuu7jmGO80eZgfYMEkvkzJRR7dYG_Pf93a01xckIIg_vONXNPtMp9NY1p63NP9BlugkhLXx-tJbQkpZDnKlrSQwTSNKbnccbLE2LUYVUL-QYS4PTraPh1u3Tkgt8bSkbKfULWC1Alw9yuDPKIjzjAgVb7AxuHLpXCMLV9tJzsVpT-qI39fBLY-LXYhoeI9Vuy4EAtYSnL9HVYb7zffb95gYfLBSHrUA9PcwX2BSJjs-lbSdv30vhzPAeiNOYVw8V6JkUq2F_p7lrPsOMueHz_iZLrbT3STVF8CfZYJcyW0__IZ2xAsbtAGcv8ZlDeH6yBvV3X-_RzkzwOLjIwVVdXF9gNTQfD--ea6ecHk2eJRGgPpG2m5Od9wvpFAbFWFPvWnQNKXSYCAONJoVtWhuC0gWVF0weBw1JmDbYzLvKjLUBqW-emnerTPJ80SLMjjJiDG_4NyTvegBwwCCbzD7kc7dIYhaXnJZf8sRuRYV2eh7YGi8hKD5W3zl4ala4dSAFPvqN-IQtVNCJAV-umVDal4NSLxjMTpSRW3rQjiIrYmwETTwhQ_Qj8j1Ib17GIfc2DaCBKk8mL-UvhMcV-Agfuq9KfSjmTntI3x-XbcSad8Bo0RihNVd2UpiHxVZfcU3BbtI1LugFP021SHumpaqXjXHALoeqpbYzd2TtaQlqH2hCD77xuxTaV_qH6iYQ7j28r0awm-r9fuo64qYHhkTrD4XaUa4Jd-okE_Jxj630FhanJB_dON-LCEZaJsi8SP3RngiZDW-ejEayZnUozcGcwajhNt8chPQO_Im4OTIfJnHVAcMMmCZCoFTtMnVquCQPABMrvJse2foYPws9pn6k5NAlAyPQw-7ytjGOJgTIRZQsB2xtPkaO1PxeY1oBVv7b6Ab-JC_JMdKHpUuO3NIo4LmR4kbMFJBImY72E4kEtPzT7opzSJne0lByq5Fl1wKmxrhVrV1kpAZ6UUFrw-O2ZbhbsKFNnSRWCCVn257M-ziwKr5N5fjnDgKoMLgNnLAeo9-C9OXnl9AOOA_hGJC0eihLCxabIBmXpxGkIVDAfsyP7RfL7hvifzQFAhebXubd917Om7RF2hydKSlqBSY7ivJRIpecroe609N0YTuMpvWPu63iJpciEJyebS_wqCnVGLYmOQKyTp8o356INf_viaMceHy09GKGPcmD_cxV8pqzqy9Yduar-ZR1cZHsvB5890IFBVWaG73629wHFevaObPNP041BptpW1GizQb7pmT0ZbAfrZVYuDk0oMRI1bvJTqnux_Oro3ixM8Xf5p8DNaO6_0TaJ7tjw11GNkwyRdSYUdSUH-2LxHmvJyeiBW8iyeR9CERSAHwHc9YvDRTLCt9ewsSx46yIEKeAdRbHXFJE_WTFQPFUrr5XzagWCeUBVkK9Sc8aVTlz5dCWaOmmCAMomKFoDTwRA0w-9L5kEBAm5mpVowT3Bsba-Bg0CPfe5iIphnWyHzE-ZuSSwBwDXm_uZjiTARm1Fym5mhgJ3pu8y9CH_SCsYaJMLjkF2VYhp4iH83XJy5d7wXX-H8U3v-lOKtpb7CD_zZICh31E9XdeCbyPp0QMFwyg74Y3KJFdWXt0-Taybb5FA9t8P1WKaIaUH7qeZhAeUD6n4Z1NGuZnDK2X5rbGQgnbXFcqBnyZK9VI3cunp_yinmMjD2l0opHKSUvfpVyLtWh1m4Y3V2U_7tlP_HFOKZo_KdQEHTnUAX3IYeEUUFd0u77NOjvcYHtbRfyjC-QpZxUtbHHWG9Fx9YBEhIv--6F7smzb-42Rx3u7ODe3Jy7GhtJukZF_MV6gp15C0fxnqOvgDmZTTehPZop-DqO8h00HxLo0fiD5yFk_krajrwNg1BcuCY8kOiKZVmHEz4kdhtz7PDmRA-VQC9patrhRRUbbZSemY8xcdhHF_XfWi-FtOrnPj7h3xGa9qXsKn_IpZH8JBdK0ySas530A3lyWFqgebwoy43_0y5e3Lu0GT5GBNxNx-5kL075qfQ4SviLUQG8217ppp8P-4-LKzBkOCAufVxni_c8dAE1aUALw9CH8PjOQTnoRlJIXEGm-aPB-6PPIWlgFb8m2X9m6IqjuI-OWkkms7SV0ko-o9HVSyoIvxmXR6zdDIgWBbJdo0T-WEcOFKzIMGuaJO5BUWabOvxBzPXiqDRpu4RpGGOEGtcoAo_-0wlIpi6faIsqxkITsRo60KLnUcANw5gv7EnczUlJfk2jtzwRRSsN_XQzlzMIvnzoTzeNjuSbFg7eZYwztzwLwvk_zohzRTVzrLk_jlOWOWn4x1Bg0Du1toMQ-vZSe7RNKudn_7o2x4i50AQkTcWFX6U0SV3dp9nv-9alamFVpzK4oXk-7lvlFfi74pd9MpC7Ru_Bf3eplSGl9rsINULufrRqEE5g_Z51rBa7nGCW3F4jIjY9VqhoeJ2bDORDmM0YC5hJFwDB3hvqejSDGpO2ndWS4KrLU0rcenrgcIMSwb1WNKa9PC1hsKwb2AZCdKYX1jU9lb4zZQXeVxEu37lcniPfgZxk3XJUOo7OKZXuEzr8EEyj0GQ4n8Ld0S5MjuFTHTC8CHD3w88NL3_NhaAzGZlqM4-7VasT5EdlrE9x9bMc7-2Ljz0VlijYvWHo9-EE_a2sblWzeuP0n7NV8mYVM_zmaoT-FqdLO7UPcv2p96TCSw8lc7Wqwm7egvV1Amp-efuCWtOtM4p60uwCLfsXnQIutXUe-3UGTjgeeDiekUbZeT87CSt0JIw8OHNvE5fy2Qao6w8abFVZqS17NqDmmE7N9lmO3wEgXkhGbYr9QpnX8Np6jDyIWkzNlEEuWawx_0gRtQ-wMJEwzfl7r_xe2U-n_gKyM-G3pNng5tYEjMBAaktlroXog9qvPUjxQ9JJ0X9IegjCbgkgyZuasdptHzNzs4j60ndMBDqf8cjTnKCgSaeGJZK1CGAUTqclWjq-aSAqz45Yest-X2ELexKsbgQJt8cRZR_OB4Iywmz065HngQmt1H-2UCARJZgAf7MOlw11zeKXGMPLpG-jnGRALY5w9FvWCOlA0xXfjcoBZfeWSzsUdqHXS9b8-If-t7uNOuojzqpyKuKqBD5ZfLeMhgLmfKhnCcaie9pc1MhCLLkmskQiNA6_GgIejKqsWqePzdM-5WM7DnrMtoZawz96hTMbNxgkT8iUnD_jycSqJD_QiSOBGspY5I0AMcSJwTUfivuGQ2E18tJS_COzDSQ_TFqW_YjjrzUL0PEq3earH7SF_c6LkO0tfzIZ5UjJswrT4gwjYj9Wm92cjavWwWXHO7tMNLUiYyQOcii9fwzgXWWMERDLf52IbNZu1a4s8aoPAhVFUregX7naRxgDryW8ip9O4I_srWEcrYhSzpOJE-FHHmUKOu0YcfQkxea2GaR82bkLVAh9jpAsVt2ojU1WJQdWuoTYmkscDyTzGAE2Ao8_kYuU_ziG8-lkx-4eCFytilVIzq9x9a6c3Zic9TrMIMOnVQ9eIYRvmutpZPD8qJybBVEfbE9rtZW-xJjJwcKo_1T1er7kXyjT_pc12N79g_JMgG3WLwsxGm3Y1eMSxlvTjVjumL433YHsyl7eCJNzUfs4bRZdEITDvQ69PxQNwk_Oksq9dtsM_bam6oqrJVmO0MOQCiCrh26C_2PX_3gPwYvOnAKwNr-CPxGz-rLm8fRt3E68xlyLZdsVy0)](https://editor.plantuml.com/uml/bLbDRoEv4RthLp0wh3wYaHFiJHXursiBCrxOuu7jmGO80eZgfYMEkvkzJRR7dYG_Pf93a01xckIIg_vONXNPtMp9NY1p63NP9BlugkhLXx-tJbQkpZDnKlrSQwTSNKbnccbLE2LUYVUL-QYS4PTraPh1u3Tkgt8bSkbKfULWC1Alw9yuDPKIjzjAgVb7AxuHLpXCMLV9tJzsVpT-qI39fBLY-LXYhoeI9Vuy4EAtYSnL9HVYb7zffb95gYfLBSHrUA9PcwX2BSJjs-lbSdv30vhzPAeiNOYVw8V6JkUq2F_p7lrPsOMueHz_iZLrbT3STVF8CfZYJcyW0__IZ2xAsbtAGcv8ZlDeH6yBvV3X-_RzkzwOLjIwVVdXF9gNTQfD--ea6ecHk2eJRGgPpG2m5Od9wvpFAbFWFPvWnQNKXSYCAONJoVtWhuC0gWVF0weBw1JmDbYzLvKjLUBqW-emnerTPJ80SLMjjJiDG_4NyTvegBwwCCbzD7kc7dIYhaXnJZf8sRuRYV2eh7YGi8hKD5W3zl4ala4dSAFPvqN-IQtVNCJAV-umVDal4NSLxjMTpSRW3rQjiIrYmwETTwhQ_Qj8j1Ib17GIfc2DaCBKk8mL-UvhMcV-Agfuq9KfSjmTntI3x-XbcSad8Bo0RihNVd2UpiHxVZfcU3BbtI1LugFP021SHumpaqXjXHALoeqpbYzd2TtaQlqH2hCD77xuxTaV_qH6iYQ7j28r0awm-r9fuo64qYHhkTrD4XaUa4Jd-okE_Jxj630FhanJB_dON-LCEZaJsi8SP3RngiZDW-ejEayZnUozcGcwajhNt8chPQO_Im4OTIfJnHVAcMMmCZCoFTtMnVquCQPABMrvJse2foYPws9pn6k5NAlAyPQw-7ytjGOJgTIRZQsB2xtPkaO1PxeY1oBVv7b6Ab-JC_JMdKHpUuO3NIo4LmR4kbMFJBImY72E4kEtPzT7opzSJne0lByq5Fl1wKmxrhVrV1kpAZ6UUFrw-O2ZbhbsKFNnSRWCCVn257M-ziwKr5N5fjnDgKoMLgNnLAeo9-C9OXnl9AOOA_hGJC0eihLCxabIBmXpxGkIVDAfsyP7RfL7hvifzQFAhebXubd917Om7RF2hydKSlqBSY7ivJRIpecroe609N0YTuMpvWPu63iJpciEJyebS_wqCnVGLYmOQKyTp8o356INf_viaMceHy09GKGPcmD_cxV8pqzqy9Yduar-ZR1cZHsvB5890IFBVWaG73629wHFevaObPNP041BptpW1GizQb7pmT0ZbAfrZVYuDk0oMRI1bvJTqnux_Oro3ixM8Xf5p8DNaO6_0TaJ7tjw11GNkwyRdSYUdSUH-2LxHmvJyeiBW8iyeR9CERSAHwHc9YvDRTLCt9ewsSx46yIEKeAdRbHXFJE_WTFQPFUrr5XzagWCeUBVkK9Sc8aVTlz5dCWaOmmCAMomKFoDTwRA0w-9L5kEBAm5mpVowT3Bsba-Bg0CPfe5iIphnWyHzE-ZuSSwBwDXm_uZjiTARm1Fym5mhgJ3pu8y9CH_SCsYaJMLjkF2VYhp4iH83XJy5d7wXX-H8U3v-lOKtpb7CD_zZICh31E9XdeCbyPp0QMFwyg74Y3KJFdWXt0-Taybb5FA9t8P1WKaIaUH7qeZhAeUD6n4Z1NGuZnDK2X5rbGQgnbXFcqBnyZK9VI3cunp_yinmMjD2l0opHKSUvfpVyLtWh1m4Y3V2U_7tlP_HFOKZo_KdQEHTnUAX3IYeEUUFd0u77NOjvcYHtbRfyjC-QpZxUtbHHWG9Fx9YBEhIv--6F7smzb-42Rx3u7ODe3Jy7GhtJukZF_MV6gp15C0fxnqOvgDmZTTehPZop-DqO8h00HxLo0fiD5yFk_krajrwNg1BcuCY8kOiKZVmHEz4kdhtz7PDmRA-VQC9patrhRRUbbZSemY8xcdhHF_XfWi-FtOrnPj7h3xGa9qXsKn_IpZH8JBdK0ySas530A3lyWFqgebwoy43_0y5e3Lu0GT5GBNxNx-5kL075qfQ4SviLUQG8217ppp8P-4-LKzBkOCAufVxni_c8dAE1aUALw9CH8PjOQTnoRlJIXEGm-aPB-6PPIWlgFb8m2X9m6IqjuI-OWkkms7SV0ko-o9HVSyoIvxmXR6zdDIgWBbJdo0T-WEcOFKzIMGuaJO5BUWabOvxBzPXiqDRpu4RpGGOEGtcoAo_-0wlIpi6faIsqxkITsRo60KLnUcANw5gv7EnczUlJfk2jtzwRRSsN_XQzlzMIvnzoTzeNjuSbFg7eZYwztzwLwvk_zohzRTVzrLk_jlOWOWn4x1Bg0Du1toMQ-vZSe7RNKudn_7o2x4i50AQkTcWFX6U0SV3dp9nv-9alamFVpzK4oXk-7lvlFfi74pd9MpC7Ru_Bf3eplSGl9rsINULufrRqEE5g_Z51rBa7nGCW3F4jIjY9VqhoeJ2bDORDmM0YC5hJFwDB3hvqejSDGpO2ndWS4KrLU0rcenrgcIMSwb1WNKa9PC1hsKwb2AZCdKYX1jU9lb4zZQXeVxEu37lcniPfgZxk3XJUOo7OKZXuEzr8EEyj0GQ4n8Ld0S5MjuFTHTC8CHD3w88NL3_NhaAzGZlqM4-7VasT5EdlrE9x9bMc7-2Ljz0VlijYvWHo9-EE_a2sblWzeuP0n7NV8mYVM_zmaoT-FqdLO7UPcv2p96TCSw8lc7Wqwm7egvV1Amp-efuCWtOtM4p60uwCLfsXnQIutXUe-3UGTjgeeDiekUbZeT87CSt0JIw8OHNvE5fy2Qao6w8abFVZqS17NqDmmE7N9lmO3wEgXkhGbYr9QpnX8Np6jDyIWkzNlEEuWawx_0gRtQ-wMJEwzfl7r_xe2U-n_gKyM-G3pNng5tYEjMBAaktlroXog9qvPUjxQ9JJ0X9IegjCbgkgyZuasdptHzNzs4j60ndMBDqf8cjTnKCgSaeGJZK1CGAUTqclWjq-aSAqz45Yest-X2ELexKsbgQJt8cRZR_OB4Iywmz065HngQmt1H-2UCARJZgAf7MOlw11zeKXGMPLpG-jnGRALY5w9FvWCOlA0xXfjcoBZfeWSzsUdqHXS9b8-If-t7uNOuojzqpyKuKqBD5ZfLeMhgLmfKhnCcaie9pc1MhCLLkmskQiNA6_GgIejKqsWqePzdM-5WM7DnrMtoZawz96hTMbNxgkT8iUnD_jycSqJD_QiSOBGspY5I0AMcSJwTUfivuGQ2E18tJS_COzDSQ_TFqW_YjjrzUL0PEq3earH7SF_c6LkO0tfzIZ5UjJswrT4gwjYj9Wm92cjavWwWXHO7tMNLUiYyQOcii9fwzgXWWMERDLf52IbNZu1a4s8aoPAhVFUregX7naRxgDryW8ip9O4I_srWEcrYhSzpOJE-FHHmUKOu0YcfQkxea2GaR82bkLVAh9jpAsVt2ojU1WJQdWuoTYmkscDyTzGAE2Ao8_kYuU_ziG8-lkx-4eCFytilVIzq9x9a6c3Zic9TrMIMOnVQ9eIYRvmutpZPD8qJybBVEfbE9rtZW-xJjJwcKo_1T1er7kXyjT_pc12N79g_JMgG3WLwsxGm3Y1eMSxlvTjVjumL433YHsyl7eCJNzUfs4bRZdEITDvQ69PxQNwk_Oksq9dtsM_bam6oqrJVmO0MOQCiCrh26C_2PX_3gPwYvOnAKwNr-CPxGz-rLm8fRt3E68xlyLZdsVy0)
