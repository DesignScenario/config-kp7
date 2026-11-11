const P = 'Dispositivos do Projeto', R = 'Dispositivos da Rede';
const name = (n) => T.overlayKpCell(n).querySelector('input').value;
const rowText = (n) => T.overlayKpCell(n).textContent;
const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
const menuItems = () => [...document.querySelectorAll('p')].map(p => p.textContent).filter(t => ['Desvincular', 'Desassociar', 'Inclusão de CR-KP7-RF'].includes(t));

// Primeira inclusão, para a rede ter keypads
await T.openInclusion();
T.clickText('Concluir'); await T.wait(100);
await T.openInclusion();

// Pendentes na pop-up: KP7 Reunião na linha 1 e um nome digitado na linha 6
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(0));
const input = T.overlayKpCell(5).querySelector('input');
setter.call(input, 'Pendente'); input.dispatchEvent(new Event('input', { bubbles: true }));
await T.wait(50);

// I1: vincular pela árvore com a pop-up aberta não apaga o que está pendente nela
await T.drag(T.treeRow(P, 'KP7 Conferência'), T.treeRow(R, '[7F:2A:C9:10]'));
T.check('I1 vínculo pela árvore preserva vínculo e nome pendentes na pop-up', name(0) === 'KP7 Reunião' && name(5) === 'Pendente' && name(1) === 'KP7 Conferência', `${name(0)} | ${name(1)} | ${name(5)}`);

// I2: a árvore vincula outro KP7 ao keypad que estava pendente na pop-up: a árvore vence e o KP7 pendente fica livre
await T.drag(T.treeRow(P, 'KP7 Desenvolvimento'), T.treeRow(R, '[A0:C3:9E:44]'));
T.check('I2 conflito com a árvore: linha assume o vínculo da árvore', name(0) === 'KP7 Desenvolvimento', name(0));
T.check('I2b KP7 que estava pendente volta a ficar livre (azul)', T.tree(P).includes('KP7 Reunião (CR-KP7-RF) [azul]'), T.tree(P).find(t => t.startsWith('KP7 Reunião')));

// I3: KP7 vinculado só na pop-up (pendente) não oferece Desvincular
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(2));
T.contextMenu(T.treeRow(P, 'KP7 Reunião')); await T.wait(50);
T.check('I3 KP7 pendente não abre Desvincular', !menuItems().includes('Desvincular'), menuItems().join(',') || '(sem menu)');
document.body.click(); await T.wait(50);

// I4: Desvincular pela árvore com a pop-up aberta mantém os pendentes
T.contextMenu(T.treeRow(P, 'KP7 Conferência')); await T.wait(50);
T.clickText('Desvincular'); await T.wait(100);
T.check('I4 Desvincular libera a linha na pop-up e mantém os pendentes', rowText(1).includes('[7F:2A:C9:10]') && name(2) === 'KP7 Reunião' && name(5) === 'Pendente', `${rowText(1)} | ${name(2)} | ${name(5)}`);

// I5: a pop-up não sai da tela ao ser arrastada
const box = () => document.querySelector('div.fixed.z-50').getBoundingClientRect();
const dragWindowTo = async (x, y) => {
  const handle = document.querySelector('div.fixed.z-50 .cursor-move');
  const r = handle.getBoundingClientRect();
  handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: r.left + 10, clientY: r.top + 10 }));
  window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
  window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: x, clientY: y }));
  await T.wait(50);
};
await dragWindowTo(-5000, -5000);
const b1 = box();
T.check('I5 arrastar para cima/esquerda: cabeçalho continua visível', b1.top >= 0 && b1.right >= 80, `left=${b1.left} top=${b1.top}`);
await dragWindowTo(5000, 5000);
const b2 = box();
T.check('I5b arrastar para baixo/direita: cabeçalho continua visível', b2.left <= innerWidth - 80 && b2.top <= innerHeight - 40, `left=${b2.left} top=${b2.top} viewport=${innerWidth}x${innerHeight}`);

// I6: Concluir aplica o que ficou pendente
T.clickText('Concluir'); await T.wait(100);
const net = T.tree(R);
T.check('I6 Concluir aplica os pendentes preservados', net.includes('KP7 Reunião (CR-KP7-RF) [B4:88:3D:E1] [verde]') && net.includes('KP7 Desenvolvimento (CR-KP7-RF) [A0:C3:9E:44] [verde]') && net.includes('Pendente (CR-KP7-RF) [09:FE:31:AB]'), net.filter(t => t.includes('CR-KP7-RF)')).join(' | '));

// I7: nenhum e-mail real no rótulo de Login
T.check('I7 rótulo de Login usa placeholder', document.body.textContent.includes('Login usuario@exemplo.com'));

return T.log.join('\n');
