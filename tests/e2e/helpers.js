window.T = (() => {
  const log = [];
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const panel = (title) => {
    const h = [...document.querySelectorAll('h3')].find(h => h.textContent.trim().toLowerCase() === title.toLowerCase());
    if (!h) throw new Error('panel not found: ' + title);
    return h.parentElement.parentElement;
  };
  const treeRow = (title, text) => {
    const span = [...panel(title).querySelectorAll('span')].find(s => s.textContent.includes(text));
    return span ? span.parentElement : null;
  };
  const tree = (title) => [...panel(title).querySelectorAll('span')].map(s => `${s.textContent}${s.style.color === 'rgb(0, 127, 0)' ? ' [verde]' : s.style.color === 'rgb(57, 57, 255)' ? ' [azul]' : ''}`);
  const overlay = () => document.querySelector('[data-name="E2 - CR-KP7-RF"]');
  // Cell with onDrop for the N-th keypad row of the overlay (0-based)
  // KeypadRow name cell = the only cell with both gap-1 and pl-[6px]
  const overlayKpCells = () => [...overlay().querySelectorAll('div.gap-1')].filter(d => d.classList.contains('pl-[6px]'));
  const overlayKpCell = (n) => {
    return overlayKpCells()[n];
  };
  const contextMenu = (el) => el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 300, clientY: 300 }));
  const clickText = (text) => {
    const el = [...document.querySelectorAll('p,span,button,div')].reverse().find(e => e.children.length === 0 && e.textContent.trim() === text);
    if (!el) throw new Error('text not found: ' + text);
    el.click();
  };
  const drag = async (src, dst) => {
    const dt = new DataTransfer();
    src.dispatchEvent(new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer: dt }));
    await wait(50);
    dst.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer: dt }));
    dst.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: dt }));
    await wait(20);
    dst.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt }));
    src.dispatchEvent(new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer: dt }));
    await wait(50);
  };
  const openInclusion = async (sensorText = 'Sensor Reunião 1 (CR-LUMI-RF) [') => {
    contextMenu(treeRow('Dispositivos da Rede', sensorText));
    await wait(50);
    clickText('Inclusão de CR-KP7-RF');
    await wait(9800); // discovery: 1 keypad / 1.5s
  };
  const check = (name, cond, extra = '') => log.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`);
  return { wait, panel, treeRow, tree, overlay, overlayKpCell, overlayKpCells, contextMenu, clickText, drag, openInclusion, check, log };
})();
