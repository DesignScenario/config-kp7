// Barra de tarefas sem "Informações do Projeto" e menu de ações do Figma (14528:157038)
const taskLabels = [...document.querySelectorAll('p')].map(p => p.textContent.trim());

// J1: o botão da barra de tarefas foi removido; a aba "Informações" continua
T.check('J1 barra de tarefas sem "Informações do Projeto"', !taskLabels.includes('Informações do Projeto') && taskLabels.includes('Estrutura'));
T.check('J1b aba "Informações" continua', [...document.querySelectorAll('span')].some(s => s.textContent === 'Informações'));

// J2: ordem do menu de ações e posição do divisor
const actionSpans = [...document.querySelectorAll('span.whitespace-pre-line')];
const actions = actionSpans.map(s => s.textContent.replace(/\n/g, ' '));
const expected = ['Modo Programação', 'Modo Teste', 'Procurar Redes', 'Procurar Dispositivos', 'Atualizar Firmwares', 'Zigbee', 'DALI'];
T.check('J2 ordem dos botões igual ao Figma', JSON.stringify(actions) === JSON.stringify(expected), actions.join(' | '));
const btn = (label) => actionSpans.find(s => s.textContent.replace(/\n/g, ' ') === label).parentElement;
const bar = btn('Modo Programação').parentElement.parentElement;
const divider = [...bar.children].find(c => c.classList.contains('w-px'));
const dr = divider.getBoundingClientRect();
T.check('J2b divisor entre "Atualizar Firmwares" e "Zigbee"', btn('Atualizar Firmwares').getBoundingClientRect().right < dr.left && dr.right < btn('Zigbee').getBoundingClientRect().left);
// Figma: botões de 120px, gap de 4px no grupo e 7px em volta do divisor
const x0 = btn('Modo Programação').getBoundingClientRect().left;
const offsets = expected.map(l => Math.round(btn(l).getBoundingClientRect().left - x0));
T.check('J2c posições iguais ao Figma (0,124,248,372,496,631,758)', JSON.stringify(offsets) === JSON.stringify([0, 124, 248, 372, 496, 631, 758]), offsets.join(','));

// J3: Zigbee desabilitado (opacidade 40%, sem clique)
const zig = btn('Zigbee');
const zs = getComputedStyle(zig);
T.check('J3 Zigbee desabilitado: opacidade 0.4, fundo #f0f0f0, cursor padrão', zs.opacity === '0.4' && zs.backgroundColor === 'rgb(240, 240, 240)' && zs.cursor === 'default', `${zs.opacity} ${zs.backgroundColor} ${zs.cursor}`);
zig.click(); await T.wait(50);
T.check('J3b clicar no Zigbee não muda o modo', [...document.querySelectorAll('h2')].some(h => h.textContent === 'Modo Programação'));

// J4: ícone DALI com as 3 camadas nas posições do Figma (10736:97982)
const daliBox = btn('DALI').querySelector('.size-7');
const bx = daliBox.getBoundingClientRect();
const layers = [...daliBox.querySelectorAll('img')].map(i => { const r = i.getBoundingClientRect(); return [r.left - bx.left, r.top - bx.top, r.width, r.height].map(v => +v.toFixed(2)); });
const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 0.1);
const exp = [[0, 18.67, 28, 9.33], [3.5, 0, 21, 21], [8.75, 7.88, 10.5, 1.31]];
T.check('J4 DALI: 3 camadas, posições e tamanhos do Figma', layers.length === 3 && layers.every((l, i) => near(l, exp[i])), JSON.stringify(layers));
T.check('J4b DALI: imagens carregadas', [...daliBox.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0));

// Captura do menu (com SHOT_PATH) para comparar com o Figma
const br = bar.getBoundingClientRect();
window.__shot = { x: br.left, y: br.top, width: br.width + 1, height: br.height + 2 };

return T.log.join('\n');
