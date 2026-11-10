const P='Dispositivos do Projeto', R='Dispositivos da Rede';
const geo = (title, text) => { const row=T.treeRow(title,text); const span=[...row.querySelectorAll('span')].pop(); const r=span.getBoundingClientRect(), rr=row.getBoundingClientRect(); const next=row.parentElement.nextElementSibling?.getBoundingClientRect(); return [Math.round(r.left*10)/10, Math.round(r.top*10)/10, rr.height, next ? Math.round(next.top) : null].join(','); };
for (const [title, text] of [[P,'Sala de Reunião'],[P,'Sensor Reunião 1'],[R,'Sensor RH (CR-LUMI-RF)']]) {
  const before = geo(title, text);
  T.treeRow(title, text).click(); await T.wait(50);
  const after = geo(title, text);
  T.check(`${title} › ${text}: texto e linha não se movem ao selecionar`, before === after, `antes=${before} depois=${after} (x,y,altura,próx.linha)`);
}
// Modo Teste
T.clickText('Modo Teste'); await T.wait(100);
const span=[...document.querySelectorAll('span')].find(s=>s.textContent.startsWith('KP7 RH'));
const b=span.getBoundingClientRect().top; span.parentElement.click(); await T.wait(50);
const a=[...document.querySelectorAll('span')].find(s=>s.textContent.startsWith('KP7 RH')).getBoundingClientRect().top;
T.check('Modo Teste: texto não se move ao selecionar', a===b, `antes=${b} depois=${a}`);
return T.log.join('\n');
