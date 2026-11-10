const R='Dispositivos da Rede', P='Dispositivos do Projeto';
const F = 'Controles CR-KP7-RF';
const hasFolder = () => T.tree(R).includes(F);
const kps = () => T.tree(R).filter(t=>t.includes('(CR-KP7-RF) ['));
T.check('E1 pasta aparece desde o início (projeto tem KP7), vazia', hasFolder() && kps().length === 0, T.tree(R).slice(-2).join(' | '));
T.check('E1b sem arraste, nada azul na rede', !T.tree(R).some(t => t.endsWith('[azul]')));
T.check('E1c KP7 livres do projeto em azul por padrão', ['Reunião','Conferência','Desenvolvimento','RH','Financeiro'].every(n => T.tree(P).includes(`KP7 ${n} (CR-KP7-RF) [azul]`)));
// botão direito na pasta abre o menu e a pop-up
T.contextMenu(T.treeRow(R, F)); await T.wait(50);
const m = document.querySelector('[role=menu]');
T.check('E2 menu da pasta = Inclusão de CR-KP7-RF', !!m && m.textContent === 'Inclusão de CR-KP7-RF');
T.clickText('Inclusão de CR-KP7-RF'); await T.wait(9800);
T.check('E2b pop-up aberta pelo menu da pasta', !!T.overlay() && T.overlayKpCells().length === 6);
T.clickText('Concluir'); await T.wait(100);
T.check('E3 após inclusão, pasta com 6 keypads', kps().length === 6);
for (const mac of ['A0:C3:9E:44','7F:2A:C9:10','B4:88:3D:E1','09:FE:61:AC','E7:55:B0:19','09:FE:31:AB']) {
  T.contextMenu(T.treeRow(R,`[${mac}]`)); await T.wait(30); T.clickText('Desassociar'); await T.wait(50);
}
T.check('E4 sem keypads, a pasta continua visível', hasFolder() && kps().length === 0, T.tree(R).slice(-2).join(' | '));
await T.openInclusion(); T.clickText('Concluir'); await T.wait(100);
T.check('E5 nova inclusão traz os 6 keypads', kps().length === 6);
return T.log.join('\n');
