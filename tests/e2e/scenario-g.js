const P='Dispositivos do Projeto', R='Dispositivos da Rede';
const BLUE='rgb(57, 57, 255)', GREEN='rgb(0, 127, 0)';
const rowColor = (n) => getComputedStyle(T.overlayKpCell(n).querySelector('input')).color;
const rowInput = (n) => T.overlayKpCell(n).querySelector('input').value;
const roomText = (n) => T.overlayKpCell(n).querySelector('input').parentElement.nextElementSibling.textContent.trim();
const dt = new DataTransfer();
const ev = (el, type) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));

await T.openInclusion();
T.clickText('Concluir'); await T.wait(100);

// Árvore principal: cores durante o arraste
const src = T.treeRow(P, 'KP7 Reunião');
ev(src, 'dragstart'); await T.wait(80);
const netKps = T.tree(R).filter(t => t.includes('(CR-KP7-RF) ['));
T.check('G1 durante o arraste, keypads livres da rede ficam azuis', netKps.length === 6 && netKps.every(t => t.endsWith('[azul]')), netKps.join(' | '));
T.check('G1b sensores (vinculados) continuam verdes', T.tree(R).filter(t => t.includes('CR-LUMI-RF')).every(t => t.endsWith('[verde]')));
ev(T.treeRow(R, '[A0:C3:9E:44]'), 'dragover');
ev(T.treeRow(R, '[A0:C3:9E:44]'), 'drop');
ev(src, 'dragend'); await T.wait(80);
T.check('G2 após soltar, nada azul e o vinculado fica verde', !T.tree(R).some(t => t.endsWith('[azul]')) && T.tree(R).includes('KP7 Reunião (CR-KP7-RF) [A0:C3:9E:44] [verde]'));

// Pop-up
await T.openInclusion();
T.check('G3 pop-up sem arraste: livres pretos, vinculado verde', rowColor(1) === 'rgb(0, 0, 0)' && rowColor(0) === GREEN, `${rowColor(0)} ${rowColor(1)}`);
T.check('G4 linha vinculada: input com nome do KP7 + (ambiente)', rowInput(0) === 'KP7 Reunião' && roomText(0) === '(Sala de Reunião)', `${rowInput(0)} ${roomText(0)}`);
const src2 = T.treeRow(P, 'KP7 RH');
ev(src2, 'dragstart'); await T.wait(80);
T.check('G5 arrastando: linhas livres da pop-up azuis, vinculada verde', [1,2,3,4,5].every(n => rowColor(n) === BLUE) && rowColor(0) === GREEN, [0,1,2,3,4,5].map(rowColor).join(' '));
ev(T.overlayKpCell(4), 'dragover');
ev(T.overlayKpCell(4), 'drop');
ev(src2, 'dragend'); await T.wait(80);
T.check('G6 após soltar na pop-up: sem azul; "KP7 RH (Escritório)"', [0,1,2,3,4,5].every(n => rowColor(n) !== BLUE) && rowInput(4) === 'KP7 RH' && roomText(4) === '(Escritório)', `${rowInput(4)} ${roomText(4)}`);

// Renomear vinculado
const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
const type = async (n, v) => { const i = T.overlayKpCell(n).querySelector('input'); setter.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); await T.wait(50); };
await type(0, 'Sala 1');
T.check('G7 renomear vinculado na pop-up', rowInput(0) === 'Sala 1' && roomText(0) === '(Sala de Reunião)');
T.clickText('Concluir'); await T.wait(100);
T.check('G8 rede mostra o novo nome em verde', T.tree(R).includes('Sala 1 (CR-KP7-RF) [A0:C3:9E:44] [verde]'), T.tree(R).filter(t => t.includes('CR-KP7-RF) [')).join(' | '));
T.check('G8b projeto também passa a "Sala 1"', T.tree(P).includes('Sala 1 (CR-KP7-RF) [verde]') && !T.tree(P).some(t => t.startsWith('KP7 Reunião')), T.tree(P).filter(t => t.includes('CR-KP7-RF')).join(' | '));
T.check('G8c KP7 RH vinculado pela pop-up', T.tree(R).includes('KP7 RH (CR-KP7-RF) [E7:55:B0:19] [verde]'));

// Reabrir: a pop-up mostra o novo nome; cancelar no X mantém "Sala 1"
await T.openInclusion();
T.check('G8d pop-up reaberta mostra "Sala 1 (Sala de Reunião)"', rowInput(0) === 'Sala 1' && roomText(0) === '(Sala de Reunião)', `${rowInput(0)} ${roomText(0)}`);
await type(0, 'Descartado');
T.overlay().querySelector('button.absolute').click(); await T.wait(100);
T.check('G9 fechar no X descarta o nome (projeto e rede)', T.tree(R).includes('Sala 1 (CR-KP7-RF) [A0:C3:9E:44] [verde]') && T.tree(P).includes('Sala 1 (CR-KP7-RF) [verde]'));

// Desvincular depois de renomear: o KP7 do projeto mantém o nome; a rede volta ao genérico
T.contextMenu(T.treeRow(P, 'Sala 1')); await T.wait(50);
T.clickText('Desvincular'); await T.wait(100);
T.check('G8e após Desvincular: projeto "Sala 1" azul, rede "Keypad RF 1"', T.tree(P).includes('Sala 1 (CR-KP7-RF) [azul]') && T.tree(R).includes('Keypad RF 1 (CR-KP7-RF) [A0:C3:9E:44]'), T.tree(R).filter(t => t.includes('[A0:')).join(''));

// Menus: tamanhos e hover
const size = () => { const r = document.querySelector('[role=menu]').getBoundingClientRect(); return `${Math.round(r.width)}x${r.height}`; };
const sizes = [];
T.contextMenu(T.treeRow(P, 'KP7 RH')); await T.wait(50); sizes.push('Desvincular ' + size()); document.body.click(); await T.wait(30);
T.contextMenu(T.treeRow(R, '[A0:C3:9E:44]')); await T.wait(50); sizes.push('Desassociar ' + size()); document.body.click(); await T.wait(30);
T.contextMenu(T.treeRow(R, 'Sensor RH')); await T.wait(50); sizes.push('Inclusão ' + size());
T.check('G10 menus com 33px de altura', sizes.every(s => s.endsWith('x33')), sizes.join(', '));
const item = document.querySelector('[role=menuitem]'); const r = item.getBoundingClientRect();
T.log.push(`INFO  item sem hover: ${getComputedStyle(item).backgroundColor} ${getComputedStyle(item).color}`);
window.__hover = { x: r.left + 20, y: r.top + 10, check: `(() => { const cs = getComputedStyle(document.querySelector('[role=menuitem]')); return (cs.backgroundColor === 'rgb(0, 150, 201)' && cs.color === 'rgb(255, 255, 255)' ? 'PASS' : 'FAIL') + '  G11 hover do item: fundo #0096c9, texto branco  — ' + cs.backgroundColor + ' ' + cs.color; })()` };
return T.log.join('\n');
