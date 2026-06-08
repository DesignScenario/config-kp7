Crie uma interface para a tela Instalação > Rede > Modo Programação dentro do software Config, usado para configurar ambientes e equipamentos de automação residencial.

A tela já possui uma estrutura inicial, então mantenha a base visual existente e atualize o conteúdo, a hierarquia das árvores, os estados visuais e as regras de nomenclatura conforme descrito abaixo.

Contexto da tela

Estamos dentro do programa Config.

A navegação atual é:

Instalação > Rede > Modo Programação

Nesta tela existem duas seções principais, lado a lado:

Dispositivos do Projeto
Dispositivos da Rede

Cada seção deve funcionar como uma árvore hierárquica, com nós expansíveis, ícones e linhas clicáveis.

1. Dispositivos do Projeto

A seção Dispositivos do Projeto deve conter o nó raiz:

Novo Projeto

Dentro de Novo Projeto, devem existir três ambientes:

Sala de Reunião
Sala de Conferência
Escritório
Sala de Reunião

Dentro de Sala de Reunião, adicionar os seguintes dispositivos:

EB-NTL1
Tipo: interface de comunicação
Sensor Reunião 1
Modelo: CR-LUMI-RF
Sensor Reunião 2
Modelo: CR-LUMI-RF
KP7 Reunião
Modelo: CR-KP7-RF
Tipo: Keypad RF
Sala de Conferência

Dentro de Sala de Conferência, adicionar:

Sensor Conferência 1
Modelo: CR-LUMI-RF
Sensor Conferência 2
Modelo: CR-LUMI-RF
KP7 Conferência
Modelo: CR-KP7-RF
Tipo: Keypad RF
Escritório

Dentro de Escritório, adicionar:

Sensor Desenvolvimento
Modelo: CR-LUMI-RF
Sensor Financeiro
Modelo: CR-LUMI-RF
Sensor RH
Modelo: CR-LUMI-RF
KP7 Desenvolvimento
Modelo: CR-KP7-RF
KP7 RH
Modelo: CR-KP7-RF
KP7 Financeiro
Modelo: CR-KP7-RF
2. Dispositivos da Rede

A seção Dispositivos da Rede deve conter a seguinte hierarquia:

E-NET
└── LAN
    └── EB-NTL1
        └── sensores associados

Dentro da EB-NTL1, listar os seguintes sensores da rede:

Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião
Sensor Reunião 2 (CR-LUMI-RF) [B5:15:A1:65] - Sala de Reunião
Sensor Conferência 1 (CR-LUMI-RF) [C2:81:5D:9A] - Sala de Conferência
Sensor Conferência 2 (CR-LUMI-RF) [1D:42:0A:33] - Sala de Conferência
Sensor Desenvolvimento (CR-LUMI-RF) [C1:04:EE:38] - Escritório
Sensor Financeiro (CR-LUMI-RF) [8D:6B:A0:F2] - Escritório
Sensor RH (CR-LUMI-RF) [D2:14:7B:5F] - Escritório
Regras de nomenclatura

Para sensores da rede já associados a dispositivos do projeto, usar este formato:

“Nome que foi dado no projeto” (Modelo) [MAC] - “Ambiente em que está atribuído”

Exemplo:

Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião

Para sensores da rede ainda não associados, usar este formato:

Modelo [MAC]

Exemplo:

CR-LUMI-RF [5A:9C:2F:B7]

No estado atual desta tela, todos os sensores da rede listados acima já estão associados aos sensores correspondentes do projeto.

Estados visuais dos itens

Aplicar as seguintes cores ao texto dos itens da árvore:

Itens associados

Usar texto na cor:

#007F00

Aplicar esta cor aos sensores da rede que já estão associados aos sensores do projeto.

Itens ainda não associados

Usar texto na cor:

#3939FF

Essa cor deve ser reservada para dispositivos associáveis que ainda não foram vinculados.

Mesmo que no estado atual não existam dispositivos não associados, deixe esse estado previsto na interface.

Itens que não podem ser associados

Usar texto na cor:

#000000

Aplicar essa cor para pastas, agrupadores, nós de rede e itens estruturais, como:

Novo Projeto
Sala de Reunião
Sala de Conferência
Escritório
E-NET
LAN
EB-NTL1 quando usada como nó estrutural
Estado de seleção

Quando o usuário clicar em uma linha da árvore, essa linha deve ficar selecionada.

A linha selecionada deve ter:

Preenchimento: #F5D59D
Stroke: 2px
Cor do stroke: #F8E1B9

Além disso, quando um item associado for selecionado em uma árvore, o item correspondente na outra árvore também deve aparecer selecionado, porém com um estado secundário.

Seleção principal

Usada no item clicado diretamente pelo usuário:

Fill: #F5D59D
Stroke: 2px #F8E1B9
Seleção correspondente na outra árvore

Usada no item associado correspondente:

Fill: #DEDEDE
Sem destaque principal
Manter aparência de seleção secundária, mais neutra

Exemplo:
Se o usuário clicar em Sensor Reunião 1 dentro de Dispositivos do Projeto, o item correspondente em Dispositivos da Rede também deve ficar selecionado com fill #DEDEDE.

Da mesma forma, se o usuário clicar em:

Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião

na árvore de rede, o item Sensor Reunião 1 dentro de Sala de Reunião na árvore do projeto deve receber a seleção secundária.

Comportamento esperado

A interface deve comunicar claramente que:

Os dispositivos do projeto representam a estrutura lógica configurada pelo usuário.
Os dispositivos da rede representam os equipamentos encontrados fisicamente na rede.
Sensores em verde já foram associados entre projeto e rede.
Dispositivos azuis ainda estariam disponíveis para associação.
Pastas, ambientes e nós estruturais aparecem em preto porque não são associáveis.
Ao selecionar um item associado, a interface mostra visualmente sua correspondência na outra árvore.
Direção visual

Mantenha o estilo visual da tela inicial já criada pelo Figma Make, mas refine a interface para parecer um software desktop técnico/profissional de configuração.

A interface deve ter:

Layout limpo e funcional
Duas árvores hierárquicas lado a lado
Títulos claros para cada seção
Ícones coerentes para projeto, ambientes, rede, interface de comunicação, sensores e keypads
Espaçamento compacto, semelhante a softwares desktop de configuração
Linhas de árvore com altura consistente
Indentação clara por nível hierárquico
Estados de hover e seleção bem perceptíveis
Visual técnico, organizado e corporativo

Não criar uma interface com aparência de aplicativo mobile. O foco é uma tela desktop de configuração técnica.