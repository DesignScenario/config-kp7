const P = 'Dispositivos do Projeto', R = 'Dispositivos da Rede';

// 1) Inclusão inicial: associar KP7 Reunião ao keypad [A0:C3:9E:44] pela janela
await T.openInclusion();
T.check('janela lista 6 keypads após a busca', T.overlayKpCells().length === 6);
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(0));
T.check('arrastar KP7 Reunião p/ janela associa a linha', T.overlay().textContent.includes('KP7 Reunião'));
T.clickText('Concluir'); await T.wait(100);
T.check('após Concluir, KP7 Reunião aparece verde na rede', T.tree(R).some(t => t.startsWith('KP7 Reunião (CR-KP7-RF) [A0:C3:9E:44]') && t.endsWith('[verde]')), T.tree(R).filter(t => t.includes('CR-KP7-RF')).join(' | '));

// 2) Desassociar na árvore da rede
T.contextMenu(T.treeRow(R, '[A0:C3:9E:44]')); await T.wait(50);
T.clickText('Desassociar'); await T.wait(100);
T.check('Desassociar libera KP7 Reunião no projeto (azul)', T.tree(P).some(t => t === 'KP7 Reunião (CR-KP7-RF) [azul]'));
const goneAfterUnpair = !T.tree(R).some(t => t.includes('[A0:C3:9E:44]'));
T.log.push(`INFO  keypad [A0:C3:9E:44] some da rede após Desassociar: ${goneAfterUnpair}`);

// 3) Incluir de novo o mesmo keypad (bug relatado)
await T.openInclusion();
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(0));
T.clickText('Concluir'); await T.wait(100);
const projGreen = T.tree(P).some(t => t === 'KP7 Reunião (CR-KP7-RF) [verde]');
const netBack = T.tree(R).some(t => t.includes('[A0:C3:9E:44]'));
T.check('reincluir: KP7 Reunião volta a aparecer na rede', netBack, `projeto verde=${projGreen}, rede tem A0=${netBack}`);

// 4) Incluir outro keypad depois de um Desassociar
T.contextMenu(T.treeRow(R, '[7F:2A:C9:10]')); await T.wait(50);
T.clickText('Desassociar'); await T.wait(100);
await T.openInclusion();
await T.drag(T.treeRow(P, 'KP7 Conferência'), T.overlayKpCell(1));
T.clickText('Concluir'); await T.wait(100);
T.check('incluir KP7 Conferência após Desassociar seu keypad', T.tree(R).some(t => t.startsWith('KP7 Conferência (CR-KP7-RF) [7F:2A:C9:10]')), T.tree(R).filter(t => t.includes('CR-KP7-RF')).join(' | '));

return T.log.join('\n');
