# Testes de navegador (e2e)

Os testes controlam um Chrome headless pelo Chrome DevTools Protocol. Não usam dependências novas, só Node 22+ e o Chrome instalado.

## Rodar

```sh
npx vite --port 4175 --strictPort   # em outro terminal
npm run test:e2e                     # todos os cenários
node tests/e2e/cdp.mjs scenario-g.js # um cenário
```

- **Chrome em outro caminho:** defina `CHROME_PATH`.
- **Outra URL:** use `npm run test:e2e -- http://localhost:5173/`.
- **No fim:** encerre o servidor de teste pelo PID. Não mate todos os processos `node`.

## Cenários

| Arquivo | Cobre |
|---|---|
| `scenario-a.js` | Inclusão, Desassociar e reincluir |
| `scenario-b.js` | Regras de drop, Móvel, X, Desvincular, seleção do par, Esc, troca de modo |
| `scenario-c.js` | Renomear + Concluir, keypad removido volta com nome padrão, Esc na pop-up |
| `scenario-d.js` | Seleção não desloca o texto (árvores e Modo Teste) |
| `scenario-e.js` | Pasta Controles CR-KP7-RF sempre visível e menu da pasta |
| `scenario-f.js` | Menu do sensor abre a pop-up |
| `scenario-g.js` | Cores no arraste, ambiente, renomear vinculado (projeto e rede), tamanho e hover dos menus |
| `scenario-h.js` | Um espaço entre o nome e o sufixo, seleção total ao clicar no nome |
| `scenario-i.js` | Árvore muda com a pop-up aberta (pendentes preservados, conflito), sem Desvincular em KP7 pendente, limite do arraste da pop-up, Login sem e-mail real |
| `scenario-j.js` | Barra de tarefas sem "Informações do Projeto", ordem e posições do menu de ações, Zigbee desabilitado, ícone DALI |

**Captura para comparar com o Figma:** se o cenário definir `window.__shot = {x, y, width, height}`, rodar com a variável `SHOT_PATH` salva um PNG (escala 2x) da região. Exemplo em PowerShell: `$env:SHOT_PATH="menu.png"; node tests/e2e/cdp.mjs scenario-j.js`.

**Falhas conhecidas:**
- **B8:** o Modo Teste usa dados fixos.
- **H3:** o foco feito por código em headless não seleciona o texto; o clique real, coberto pelo H4, seleciona.

## Escrever um cenário

O cenário é o corpo de uma função `async`, executado na página. Ele recebe `window.T`, definido em `helpers.js`:

- **`T.tree(painel)`:** textos da árvore, com o sufixo `[verde]` ou `[azul]` conforme a cor.
- **`T.treeRow(painel, texto)`:** a linha da árvore que contém o texto.
- **`T.openInclusion()`:** abre a pop-up e espera a busca terminar.
- **`T.overlay()`, `T.overlayKpCell(n)` e `T.overlayKpCells()`:** a pop-up e as células de nome dos keypads.
- **`T.drag(origem, destino)`, `T.contextMenu(el)` e `T.clickText(texto)`:** ações.
- **`T.check(nome, condição, extra)`:** registra PASS ou FAIL.
- **Retorno:** o cenário deve terminar com `return T.log.join('\n')`.

Para eventos reais de mouse (o CSS `:hover` e o clique que foca um input), defina antes do `return`:
- `window.__hover = { x, y, check }`
- `window.__click = { x, y, check }`

Nos dois, `check` é uma expressão JS que retorna uma linha `PASS ...` ou `FAIL ...`.
