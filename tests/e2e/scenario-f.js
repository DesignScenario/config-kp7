const P = 'Dispositivos do Projeto', R = 'Dispositivos da Rede';
const menu = () => document.querySelector('[role=menu]');
const geo = () => { const m = menu(); const r = m.getBoundingClientRect(); const cs = getComputedStyle(m.querySelector('button')); return `${Math.round(r.width*10)/10}x${Math.round(r.height*10)/10} font=${cs.fontFamily} ${cs.fontSize} w${cs.fontWeight}`; };
T.contextMenu(T.treeRow(R, 'Sensor RH')); await T.wait(50);
T.log.push('INFO sensor menu ' + geo() + ' text=' + menu().textContent);
T.clickText('Inclusão de CR-KP7-RF'); await T.wait(200);
T.check('F1 item do menu de sensor abre a janela', !!T.overlay());
return T.log.join('\n');
