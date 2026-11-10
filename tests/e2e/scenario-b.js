const P = 'Dispositivos do Projeto', R = 'Dispositivos da Rede';
const ovText = () => T.overlay().textContent;
const cbState = () => [...T.overlay().querySelectorAll('.e2-scroll button')].map(b => (b.disabled ? 'd' : '') + (b.querySelector('img').src === document.querySelector('[data-cb-on]')?.src ? 'x' : '?'));

await T.openInclusion();

// B1: soltar um KP7 numa linha que já está associada (sobrescreve sem aviso?)
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(0));
await T.drag(T.treeRow(P, 'KP7 RH'), T.overlayKpCell(0));
T.check('B1 linha já associada não é sobrescrita por outro KP7', ovText().includes('KP7 Reunião') && !ovText().includes('KP7 RH'), `texto contém Reunião=${ovText().includes('KP7 Reunião')} RH=${ovText().includes('KP7 RH')}`);
T.log.push(`INFO  B1 KP7 Reunião no projeto: ${T.tree(P).find(t => t.startsWith('KP7 Reunião'))}`);

// B2: mesmo KP7 em duas linhas (regra 1-para-1)
await T.drag(T.treeRow(P, 'KP7 Conferência'), T.overlayKpCell(1));
await T.drag(T.treeRow(P, 'KP7 Conferência'), T.overlayKpCell(2));
T.check('B2 mesmo KP7 não associa duas linhas', ovText().split('KP7 Conferência').length - 1 === 1);

// B3: Móvel no modo padrão e depois troca para avançado
const rowsBefore = T.overlay().querySelectorAll('.e2-scroll button').length;
const mobileBtn = (kp) => T.overlayKpCell(kp).parentElement.querySelectorAll('button')[0];
mobileBtn(3).click(); await T.wait(50);
T.clickText('Modo avançado'); await T.wait(100);
const kp4Rows = (() => { const kpRow = T.overlayKpCell(3).parentElement; const group = kpRow.parentElement; return [...group.children].slice(1); })();
const sensorBtns = kp4Rows.map(r => r.querySelector('button'));
const imgs = sensorBtns.map(b => b.querySelector('img').src);
T.check('B3 com Móvel marcado, todos os sensores do modo avançado ficam marcados', imgs.every(s => s === imgs[0]) , `sensores=${kp4Rows.length}, ícones iguais=${imgs.every(s => s === imgs[0])}`);
T.clickText('Modo padrão'); await T.wait(50);

// B4: renomear e fechar no X (cancelar) — o nome deveria ser descartado?
const input = T.overlayKpCell(5).querySelector('input');
const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
setter.call(input, 'Teste Cancelado'); input.dispatchEvent(new Event('input', { bubbles: true }));
await T.wait(50);
T.overlay().querySelector('button.absolute').click(); await T.wait(100);
T.check('B4 fechar no X descarta associações pendentes', T.tree(P).some(t => t === 'KP7 Reunião (CR-KP7-RF) [azul]'));
await T.openInclusion();
T.check('B4 fechar no X descarta renomeação', !T.overlay().innerHTML.includes('Teste Cancelado'));
T.clickText('Concluir'); await T.wait(100);
T.log.push(`INFO  B4 nome na rede após Concluir: ${T.tree(R).find(t => t.includes('[09:FE:31:AB]'))}`);

// B5: arrastar na árvore principal (projeto -> rede)
await T.drag(T.treeRow(P, 'KP7 Financeiro'), T.treeRow(R, '[09:FE:61:AC]'));
T.check('B5 arrastar KP7 Financeiro p/ keypad da rede associa', T.tree(R).some(t => t.startsWith('KP7 Financeiro (CR-KP7-RF) [09:FE:61:AC]') && t.endsWith('[verde]')));

// B6: Desvincular pelo projeto
T.contextMenu(T.treeRow(P, 'KP7 Financeiro')); await T.wait(50);
T.clickText('Desvincular'); await T.wait(100);
T.check('B6 Desvincular volta KP7 Financeiro livre (azul no projeto, preto na rede)', T.tree(P).some(t => t === 'KP7 Financeiro (CR-KP7-RF) [azul]') && T.tree(R).some(t => t.endsWith('[09:FE:61:AC]')));

// B7: seleção destaca o par associado
await T.drag(T.treeRow(P, 'KP7 RH'), T.treeRow(R, '[E7:55:B0:19]'));
T.treeRow(P, 'KP7 RH').click(); await T.wait(50);
T.check('B7 selecionar KP7 RH destaca o par na rede', T.treeRow(R, '[E7:55:B0:19]').style.backgroundColor === 'rgb(222, 222, 222)');

// B8: Modo Teste reflete as associações reais?
T.clickText('Modo Teste'); await T.wait(100);
T.clickText('Visualizar Rede'); await T.wait(50);
const testeNet = [...document.querySelectorAll('span')].map(s => s.textContent).filter(t => t.includes('CR-KP7-RF'));
T.check('B8 Modo Teste mostra os keypads como estão na rede', testeNet.some(t => t.includes('[09:FE:31:AB]')) && !testeNet.some(t => t.startsWith('KP7 Reunião')), testeNet.join(' | '));
T.clickText('Modo Programação'); await T.wait(100);

// B9: estado da árvore preservado ao voltar do Modo Teste
T.check('B9 associações preservadas ao voltar do Modo Teste', T.tree(R).some(t => t.startsWith('KP7 RH (CR-KP7-RF)')));

// B10: Esc fecha menu de contexto
T.contextMenu(T.treeRow(R, 'Sensor RH')); await T.wait(50);
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await T.wait(50);
T.check('B10 Esc fecha o menu de contexto', ![...document.querySelectorAll('p')].some(p => p.textContent === 'Inclusão de CR-KP7-RF'));
document.body.click(); await T.wait(50);

// B11: janela aberta + troca de modo
await T.openInclusion();
T.clickText('Modo Teste'); await T.wait(100);
T.check('B11 janela de inclusão fecha ao sair do Modo Programação', !T.overlay());

return T.log.join('\n');
