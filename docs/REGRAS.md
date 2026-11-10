# Regras de comportamento

Este documento é a fonte da verdade do comportamento esperado do protótipo. Mantenha-o atualizado sempre que uma regra mudar. O histórico de como se chegou a cada regra está em [HISTORICO.md](HISTORICO.md).

## 1. Modos

- A barra de ações tem **Modo Programação**, que é a tela principal, e **Modo Teste**.
- Sair do Modo Programação fecha a pop-up CR-KP7-RF, descartando o que não foi concluído, e fecha o menu de contexto.
- Ao voltar para o Modo Programação, vínculos e nomes são preservados.
- O Modo Teste mostra dados **fixos** e não reflete o estado real (pendência).

## 2. Árvores

**Dispositivos do Projeto** (esquerda): Novo Projeto › ambientes › dispositivos. Os dados são fixos:

| Ambiente | Dispositivos |
|---|---|
| Sala de Reunião | EB-NTL1, Sensor Reunião 1 e 2, KP7 Reunião |
| Sala de Conferência | Sensor Conferência 1 e 2, KP7 Conferência |
| Escritório | Sensor Desenvolvimento, Financeiro e RH, KP7 Desenvolvimento, RH e Financeiro |

**Dispositivos da Rede** (direita):
- E-NET › LAN › EB-NTL1, com os sensores CR-LUMI-RF já vinculados.
- Pasta **Controles CR-KP7-RF**:
  - fica visível sempre que o projeto tem pelo menos um KP7;
  - antes da primeira inclusão fica vazia, sem seta;
  - depois de uma inclusão (Concluir), lista os 6 keypads encontrados;
  - continua visível mesmo se todos os keypads forem desassociados;
  - é expandida automaticamente ao concluir uma inclusão.

## 3. Cores do texto

| Situação | Projeto | Rede e pop-up |
|---|---|---|
| Pasta, projeto, ambiente | preto | preto |
| Vinculado | verde `#007F00` | verde `#007F00` |
| Livre (não vinculado) | **azul** `#3939FF` | **preto** |
| Livre e destino válido **durante o arraste** | (não se aplica) | **azul** `#3939FF` |

O azul em Rede e na pop-up só existe enquanto um item está sendo arrastado e some ao soltar ou cancelar.

## 4. Seleção

- **Clique:** o item fica com fundo `#F5D59D` e moldura interna de 2px `#F8E1B9`. O texto não se desloca.
- **Par vinculado:** fica destacado com `#DEDEDE`, na outra árvore.
- **Botão direito:** também seleciona o item.

## 5. Arrastar e soltar (vincular)

- Só itens **livres** de Dispositivos do Projeto podem ser arrastados (na prática, os KP7).
- **Destinos válidos:**
  - na árvore da rede, um item livre do **mesmo tipo**;
  - na pop-up, uma linha de keypad livre.
- A relação é **1 para 1**:
  - um destino já vinculado não é sobrescrito;
  - um KP7 já usado na pop-up não vincula uma segunda linha.
- **Vínculo pela árvore:** vale na hora.
- **Vínculo pela pop-up:** fica pendente até Concluir. Enquanto isso, o KP7 já aparece verde no projeto.
- **Nome ao vincular:** o keypad recém-vinculado assume o nome do KP7. Qualquer nome digitado antes da vinculação é descartado.

## 6. Menus de contexto

O componente é `ContextMenu`, com estilo e2:
- itens de 25px, `px-12`;
- borda `#a5a5a5`, sombra;
- hover com fundo `#0096c9` e texto branco.

| Onde (botão direito) | Item | Ação |
|---|---|---|
| Sensor na rede | Inclusão de CR-KP7-RF | Abre a pop-up |
| Pasta Controles CR-KP7-RF | Inclusão de CR-KP7-RF | Abre a pop-up |
| KP7 **vinculado** no projeto | Desvincular | Desfaz o vínculo; o keypad continua na rede |
| Keypad na rede | Desassociar | Desfaz o vínculo e **remove** o keypad da rede até a próxima inclusão |

O menu fecha com um clique fora ou com **Esc**.

## 7. Pop-up CR-KP7-RF (inclusão)

**Abertura e busca**
- Abre centralizada, em 650×650, e pode ser arrastada pelo cabeçalho.
- A busca é simulada: revela os 6 keypads, um a cada 1,5s.

**Estrutura da tabela**
- Colunas: Keypad RF | Intensidade | Associar.
- Cada keypad tem uma checkbox **(Móvel)** e linhas de sensores com intensidade e checkbox.
- **Modo padrão:** 1 sensor por keypad. **Modo avançado:** 2 ou 3 sensores.
- **Móvel** marca e trava todos os sensores visíveis, também ao trocar de modo.

**Linha do keypad**
- **Livre:** `Nome [MAC]`. O nome padrão é "CR-KP7-RF".
- **Vinculada:** `Nome (Ambiente)`, por exemplo "KP7 Reunião (Sala de Reunião)", em verde e sem MAC.
- Há exatamente um espaço entre o nome e o sufixo.

**Nome editável**
- O nome é sempre editável, antes e depois da vinculação.
- Clicar no nome seleciona o texto inteiro.

**Concluir e cancelar**
- **Concluir** aplica os vínculos e os nomes e (re)inclui na rede todos os keypads encontrados, inclusive os desassociados antes.
- **X ou Esc** descartam vínculos e nomes pendentes.

## 8. Nomes

**Keypad na rede**: o nome segue esta ordem de prioridade.
1. Se estiver vinculado: `<nome do KP7> (CR-KP7-RF) [MAC]`.
2. Se tiver nome personalizado (keypad livre renomeado na pop-up): `<nome> (CR-KP7-RF) [MAC]`.
3. Senão: genérico `Keypad RF N (CR-KP7-RF) [MAC]`, com N de 1 a 6.

**Renomear na pop-up** (aplicado só no Concluir)
- **Keypad livre:** muda só o nome dele na rede.
- **Keypad vinculado:** renomeia o **KP7 do projeto**, e o novo nome aparece no projeto e na rede. Nome vazio mantém o anterior.
- **Desvincular ou Desassociar depois de renomear:**
  - o KP7 do projeto mantém o novo nome;
  - o keypad da rede volta ao nome genérico;
  - Desassociar também apaga o nome personalizado da rede.

## 9. Dados dos keypads (fixos, em `KEYPADS`)

| # | MAC | Id na rede | Nome genérico |
|---|---|---|---|
| 1 | A0:C3:9E:44 | kp7-reuniao-net | Keypad RF 1 |
| 2 | 7F:2A:C9:10 | kp7-conferencia-net | Keypad RF 2 |
| 3 | B4:88:3D:E1 | kp7-desenvolvimento-net | Keypad RF 3 |
| 4 | 09:FE:61:AC | kp7-financeiro-net | Keypad RF 4 |
| 5 | E7:55:B0:19 | kp7-rh-net | Keypad RF 5 |
| 6 | 09:FE:31:AB | kp7-extra-net | Keypad RF 6 (manter ou remover: pendente) |
