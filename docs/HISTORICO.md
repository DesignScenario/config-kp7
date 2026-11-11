# Histórico de implementação

Este é o registro do que foi feito, por quê e com quais decisões do usuário. **Adicione uma entrada a cada mudança**, a mais recente no fim. As regras vigentes ficam em [REGRAS.md](REGRAS.md).

Formato de cada entrada: **pedido → o que mudou → arquivos → decisões**.

---

## Pendências e decisões em aberto

- [ ] **Modo Teste estático:** os dados de `ModoTeste.tsx` são fixos e não refletem vínculos, nomes nem remoções. É a falha conhecida B8 nos testes. Falta decidir se o Modo Teste deve ser sincronizado com o estado real.
- [ ] **Móvel e sensores não são salvos:** as escolhas da pop-up se perdem ao concluir.
- [ ] **"(Buscando dispositivos...)":** o texto nunca muda quando a busca termina.
- [ ] **"Procurar dispositivos"** e as outras ações da barra, fora os dois modos, não fazem nada.
- [ ] **6º keypad (`09:FE:31:AB`):** foi adicionado para igualar o Figma. Falta decidir se fica.
- [ ] **Código legado:** remover `E2CrKp7Rf-1`, `E2CrKp7Rf-2`, `E2OverlayInclusaoDeCrKp7Rf`, `MenuDeContexto*` e, se o Modo Teste migrar para SVG, os PNGs de `src/imports/`.

---

## 10/11/2026

### 1. Revisão inicial do projeto
**Pedido:** resumir funcionalidades e interações do protótipo.
**Mudanças:** nenhuma.

### 2. Modo Programação igual ao Figma (`10153:117594`)
**O que mudou:**
- **Ícones:** os PNGs viraram SVGs do Figma em `src/imports/icons/`.
- **Fonte:** corrigida a fonte bold inválida.
- **Cromo da janela:** barra superior com o logo, barra de menu sem o toggle extra e taskbar com o toggle "EMBRACE ASSISTANT" ON e o botão colapsar.
- **Barras e abas:** espaçamentos das abas e do menu de ações; quebras "Procurar⏎Redes" e "Atualizar⏎Firmwares".
- **Árvores:** borda própria dos painéis, setas da árvore em SVG e checkbox no EB-NTL1 da rede.
- **Rodapé:** recriado conforme o Figma.

**Arquivos:** `App.tsx`, `src/imports/icons/`.
**Decisão:** o usuário removeu o botão **Modo CAD** do escopo, portanto não adicionar.

### 3. Pop-up CR-KP7-RF igual ao Figma (`14348:159567`)
**O que mudou:**
- `E2CrKp7Rf.tsx` foi reescrito (de ~1460 para ~400 linhas) com a lista `KEYPADS`, que tem 6 keypads, como no Figma.
- Barra de rolagem e2 (`scrollbar.css`) e novo `Checkbox` em SVG.

**Depois:** o texto do cabeçalho e do conteúdo da tabela passou para **12px**, a pedido do usuário.
**Arquivos:** `E2CrKp7Rf.tsx`, `ProgressiveKp7Discovery.tsx`, `Checkbox.tsx`, `scrollbar.css`, `index.css`.

### 4. Correções de interação e navegação
**Pedido:** "ao desassociar um keypad, não consigo incluir novos", e procurar outras incoerências.

**Correções:**
- Keypad desassociado não voltava nunca. Agora uma nova inclusão (Concluir) traz de volta todos os encontrados.
- Desassociar deixava o KP7 do projeto verde, com um vínculo órfão.
- Soltar na pop-up sobre uma linha já vinculada sobrescrevia o vínculo.
- Móvel com modo avançado deixava sensores desmarcados.
- Renomear e fechar no X mantinha o nome. Agora o nome só vale no Concluir.
- Esc não fazia nada. Agora fecha o menu ou a pop-up.
- Trocar para o Modo Teste deixava a pop-up aberta.
- Estado de arraste ficava preso depois de um arraste cancelado.

**Testes:** criado o harness e2e (agora em `tests/e2e/`).

### 5. Salto do texto ao selecionar
**Causa:** borda de 2px com margem de −2px encolhia a linha em 4px.
**Correção:** `box-shadow` inset. Corrigido também no Modo Teste.

### 6. Pasta CONTROLES RF oculta quando vazia
Substituída depois pela regra da entrada 9.

### 7. Menus de contexto no padrão do Figma
**O que mudou:**
- Os 3 menus antigos (fonte inválida e layouts diferentes) foram unificados no `ContextMenu.tsx`.
- Depois, o layout passou a seguir `14480:184584`/`14480:184602`, com hover `#0096c9` e texto branco.

### 8. Azul só durante o arraste
**Regra:** texto padrão preto; azul `#3939FF` só nos destinos livres enquanto se arrasta, na árvore da rede e na pop-up; vinculados continuam verdes.
**Decisão:** manter o verde dos vinculados.

### 9. Pasta "Controles CR-KP7-RF" e inclusão pela pasta
**O que mudou:**
- Pasta renomeada de "CONTROLES RF" para "Controles CR-KP7-RF".
- Ela aparece sempre que o projeto tem um KP7.
- O botão direito na pasta abre "Inclusão de CR-KP7-RF".

**Decisão:** o menu nos sensores também continua.

### 10. Renomear após vincular + ambiente
**O que mudou:**
- Na pop-up, a linha vinculada tem o nome editável, que começa com o nome do KP7, seguido de "(Ambiente)".
- Ao vincular, um nome digitado antes da vinculação é descartado.

### 11. Ajustes de cor, seleção e espaçamento
**O que mudou:**
- Em Dispositivos do Projeto, itens livres voltaram a ser **azuis por padrão**. Na rede e na pop-up continua a regra do arraste.
- Clicar no nome na pop-up seleciona o texto inteiro.
- O campo de nome passou a ter largura automática, com exatamente um espaço até "(" ou "[".

### 12. O novo nome se sobrepõe no projeto
**O que mudou:**
- Renomear na pop-up um keypad vinculado renomeia o **KP7 do projeto** (estado `projectKp7Names`). O novo nome aparece no projeto e na rede.
- O keypad livre renomeado continua com nome próprio só na rede (`keypadCustomNames`).

**Decisão (padrão adotado):** depois de Desvincular, o KP7 mantém o novo nome e a rede volta a "Keypad RF N".

### 13. Documentação e testes versionados
**Criados:**
- `CLAUDE.md`, `docs/REGRAS.md` e `docs/HISTORICO.md`;
- `tests/e2e/`, com o harness CDP, os cenários a–h, `run-all.mjs` e o README;
- o script `npm run test:e2e`.

---

## 11/11/2026

### 14. Varredura do projeto: correções e limpeza
**Pedido:** varredura geral do projeto; o usuário aprovou corrigir os bugs, limpar código morto, remover dependências sem uso e trocar os e-mails do Login.

**Correções:**
- Com a pop-up aberta, vincular, Desvincular ou Desassociar na árvore apagava os vínculos e nomes pendentes na pop-up. Agora a pop-up faz *merge*: mantém o que está pendente, e só descarta o que conflita com a árvore (keypad ou KP7 que a árvore acabou de vincular).
- "Desvincular" aparecia num KP7 vinculado só na pop-up (pendente) e não fazia nada. Agora o menu só aparece para vínculo concluído; o pendente se desfaz fechando a pop-up.
- A pop-up podia ser arrastada para fora da tela. Agora parte do cabeçalho (80px na horizontal, 40px na vertical) fica sempre visível.

**Limpeza:**
- Removidos `src/app/components/ui/` (shadcn, sem uso), `components/figma/ImageWithFallback.tsx` (duplicado), `src/imports/E2Checkbox`, `src/imports/E2TelaEquipamentoEquipamentosScenario` e `findParentRoom` (`App.tsx`).
- `src/imports/pasted_text/programming-mode.tsx` → `.txt` (era texto colado e quebrava o `tsc`).
- Removidas todas as dependências sem import (MUI, Emotion, Radix, react-dnd, recharts etc.). Fica só `tw-animate-css`, importada em `tailwind.css`. O CSS do build caiu de 99 kB para 26 kB.
- `vite.config.ts`: tipo do parâmetro `id`; `npx tsc --noEmit` agora passa sem erros.
- Rótulo do Login trocado por `usuario@exemplo.com` (havia e-mails reais).
- Comentário de `getDeviceName` alinhado com REGRAS §8.

**Arquivos:** `App.tsx`, `E2CrKp7Rf.tsx`, `vite.config.ts`, `package.json`, `pnpm-lock.yaml`, `tests/e2e/scenario-i.js` (novo).

**Decisões:** os legados listados no CLAUDE.md continuam (pendência). Desvincular de KP7 pendente: não oferecer o menu, em vez de desfazer o pendente pela árvore.

**Testes:** `scenario-i.js` (I1–I7). Suíte: 62 PASS, 0 FAIL, 2 conhecidas (B8, H3).

### 15. Barra de tarefas e menu de ações (`14528:157038`)
**Pedido:** remover o botão "Informações do Projeto" da barra de tarefas e seguir o novo layout do menu de ações no Figma.

**O que mudou:**
- Barra de tarefas começa em "Estrutura". A aba "Informações" (linha de abas) continua.
- Menu de ações: Modo Programação · Modo Teste · Procurar Redes · Procurar Dispositivos · Atualizar Firmwares │ Zigbee · DALI.
- Zigbee foi para depois do divisor, **desabilitado** (fundo `#f0f0f0`, opacidade 40%, sem clique).
- Botão novo **DALI**, sem ação, com o ícone `10736:97982` em 3 camadas (`acao-dali-base/lampada/linha.svg`).
- "Procurar dispositivos" → "Procurar Dispositivos", como no Figma.
- Removido o ícone `tarefa-informacoes-do-projeto.svg`, que ficou sem uso.
- `tests/e2e/cdp.mjs`: captura opcional de uma região (`window.__shot` + variável `SHOT_PATH`), para comparar com o Figma.

**Arquivos:** `App.tsx`, `src/imports/icons/`, `tests/e2e/cdp.mjs`, `tests/e2e/scenario-j.js` (novo).

**Decisões:** a remoção é do botão da barra de tarefas, não da aba. Zigbee só visual (desabilitado); DALI habilitado e sem ação.

**Testes:** `scenario-j.js` (J1–J4, inclusive posições em px do Figma). Suíte: 71 PASS, 0 FAIL, 2 conhecidas (B8, H3).
