const P = 'Dispositivos do Projeto';
await T.openInclusion();
await T.drag(T.treeRow(P, 'KP7 Reunião'), T.overlayKpCell(0));
await T.wait(50);
// Gap between the name and the suffix must be exactly one space
const gap = (n) => {
  const inp = T.overlayKpCell(n).querySelector('input');
  const suffix = inp.parentElement.nextElementSibling;
  const range = document.createRange(); range.selectNodeContents(inp.previousElementSibling);
  const nameEnd = range.getBoundingClientRect().right;
  const inputEnd = inp.getBoundingClientRect().right;
  const r2 = document.createRange(); r2.setStart(suffix.firstChild, 1); r2.setEnd(suffix.firstChild, suffix.firstChild.length);
  const suffixStart = r2.getBoundingClientRect().left;
  return { nameEnd, inputEnd, gap: suffixStart - nameEnd, text: inp.value + suffix.textContent };
};
const sp = document.createElement('span'); sp.style.cssText = "font: 12px 'Segoe UI', sans-serif; white-space: pre"; sp.textContent = ' '; document.body.appendChild(sp);
const spaceW = sp.getBoundingClientRect().width; sp.remove();
for (const n of [0, 1]) {
  const g = gap(n);
  T.check(`H${n + 1} um espaço entre nome e sufixo ("${g.text}")`, Math.abs(g.gap - spaceW) < 0.6 && Math.abs(g.inputEnd - g.nameEnd) < 0.6, `gap=${g.gap.toFixed(2)} espaço=${spaceW.toFixed(2)} input-fim vs texto-fim=${(g.inputEnd - g.nameEnd).toFixed(2)}`);
}
// Selection on focus
const inp = T.overlayKpCell(1).querySelector('input');
inp.focus(); await T.wait(30);
T.check('H3 ao focar o campo, todo o texto fica selecionado', inp.selectionStart === 0 && inp.selectionEnd === inp.value.length, `${inp.selectionStart}-${inp.selectionEnd} de ${inp.value.length}`);
inp.blur();
// Real click check handed to the CDP runner (trusted mouse events)
const r = inp.getBoundingClientRect();
window.__click = { x: r.left + 5, y: r.top + r.height / 2, check: `(() => { const i = document.activeElement; return (i && i.tagName === 'INPUT' && i.selectionStart === 0 && i.selectionEnd === i.value.length ? 'PASS' : 'FAIL') + '  H4 clique real no nome seleciona tudo  — ' + (i && i.tagName === 'INPUT' ? i.selectionStart + '-' + i.selectionEnd + ' de ' + i.value.length : 'sem foco'); })()` };
return T.log.join('\n');
