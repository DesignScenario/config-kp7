# CLAUDE.md

Este projeto é um protótipo do **Scenario Config Embrace**, na tela **Instalação › Rede**. Ele cobre a inclusão de keypads CR-KP7-RF e a vinculação deles aos KP7 do projeto. É um export do Figma Make (React 18, Vite 6, Tailwind v4), e todo o estado vive no front-end, sem backend.

- **Comportamento esperado (fonte da verdade):** [docs/REGRAS.md](docs/REGRAS.md)
- **O que já foi feito, decisões e pendências:** [docs/HISTORICO.md](docs/HISTORICO.md)

## Como trabalhar neste projeto

- Responda em **português (Brasil)**.
- **Não faça commits** sem pedido explícito.
- Mudanças grandes ou ambíguas: planeje e pergunte antes de implementar.
- Ao concluir uma mudança:
  1. **sempre** adicione uma entrada em `docs/HISTORICO.md`;
  2. atualize `docs/REGRAS.md` se o comportamento mudou;
  3. crie ou ajuste um cenário em `tests/e2e/` e rode `npm run test:e2e`.
- Mudanças visuais seguem o Figma. Arquivo `OZN66ihMbQnVq04D2kCe4T` (Embrace - Desktop), nodes de referência:
  - Modo Programação: `10153:117594` (o botão "Modo CAD" foi removido de propósito);
  - menu de ações: `14528:157038` (o botão "Informações do Projeto" da barra de tarefas foi removido de propósito);
  - pop-up CR-KP7-RF: `14348:159567` (texto da tabela em 12px, a pedido do usuário);
  - menu de contexto: `14480:184584` (normal) e `14480:184602` (hover).

## Comandos

```sh
npm run dev                          # servidor de desenvolvimento
npm run build                        # build de produção (use para validar)
npx vite --port 4175 --strictPort    # servidor para os testes e2e
npm run test:e2e                     # testes de navegador (ver tests/e2e/README.md)
```

## Estrutura

| Arquivo | Papel |
|---|---|
| `src/app/App.tsx` | Tela inteira: barras, árvores (projeto e rede), estado de vínculos e nomes, menus, arraste |
| `src/imports/E2CrKp7Rf/E2CrKp7Rf.tsx` | Pop-up CR-KP7-RF: tabela, lista `KEYPADS` (MACs e sensores), renomear, Móvel |
| `src/app/components/ProgressiveKp7Discovery.tsx` | Simula a busca: revela 1 keypad a cada 1,5s |
| `src/app/components/ContextMenu.tsx` | Menu de contexto padrão e2 (único componente para todos os menus) |
| `src/app/components/Checkbox.tsx` | Checkbox e2 (SVG on/off) |
| `src/app/components/ModoTeste.tsx` | Modo Teste (dados **fixos**, não reflete o estado real) |
| `src/imports/icons/` | Assets exportados do Figma (SVG) usados na tela |
| `src/styles/scrollbar.css` | Barra de rolagem e2 (classe `.e2-scroll`) |

**Código legado não usado:**
- `src/imports/E2CrKp7Rf-1`, `E2CrKp7Rf-2`, `E2OverlayInclusaoDeCrKp7Rf`, `MenuDeContexto*`;
- os PNGs soltos em `src/imports/*.png`. Ainda são usados só por `ModoTeste.tsx`.

Não edite os legados; a remoção está nas pendências.

## Convenções e armadilhas

**Fontes**
- Use `font-['Segoe_UI',sans-serif] font-bold`. **Nunca** `font-['Segoe_UI:Bold',...]`, que é uma família inválida e faz o texto cair numa fonte genérica.
- O `theme.css` aplica `font-weight: 500` em `button`, então botões de texto precisam de `font-normal`.
- Para a altura de linha do Figma (16px em 12px), use `leading-[normal]`. Em Tailwind v4, `leading-normal` vale 1.5, ou seja, 18px.

**Bordas e layout**
- Bordas que não podem alterar o tamanho vão numa div de overlay (`absolute inset-0 border ... pointer-events-none`) ou numa `box-shadow` inset.
- A seleção da árvore usa `backgroundColor: #F5D59D` + `boxShadow: inset 0 0 0 2px #F8E1B9`. Borda com margem negativa já causou o "salto" do texto.
- O campo de nome da pop-up tem largura automática: um `span` invisível com o texto define a largura e o `input` fica `absolute inset-0` por cima. Assim o sufixo fica a exatamente um espaço do nome.

**Assets do Figma**
- Baixe para `src/imports/icons/` com nome legível. Nunca deixe URLs `figma.com/api/mcp/asset` no código.
- O Vite embute SVGs pequenos como data URI, então os testes não podem depender do nome do arquivo.

**Paleta**

| Uso | Cor |
|---|---|
| Vinculado | `#007F00` |
| Disponível para vinculação | `#3939FF` |
| Seleção | `#F5D59D` / `#F8E1B9` |
| Par associado selecionado | `#DEDEDE` |
| Cabeçalhos de painel | `#38404d` |
| Cabeçalho de janela | `#1d242c` |
| Hover de menu | `#0096c9` |
| Bordas | `#c8c8c8` (painéis), `#bebebe` (pop-up), `#a5a5a5` (menu) |

**Processos**
- Os servidores de teste usam a porta 4175.
- Encerre-os pelo PID, por exemplo: `Get-CimInstance Win32_Process` filtrando `*4175*`.
- **Nunca** mate todos os processos `node`: o usuário costuma ter o próprio `npm run dev` aberto.
