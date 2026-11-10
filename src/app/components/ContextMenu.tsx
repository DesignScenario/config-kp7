// Menu de contexto no padrão e2 do Figma ("Menu de Contexto - Inclusão de CR-KP7-RF",
// nodes 14480:184584 normal / 14480:184602 hover): borda #a5a5a5 (interna), sombra-externa,
// padding vertical 4px e itens "e2/menu-de-contexto" (25px, px 12px, texto 12px).
// Hover do item: fundo #0096c9 e texto branco.

interface ContextMenuProps {
  x: number;
  y: number;
  items: { label: string; onClick: () => void }[];
}

export default function ContextMenu({ x, y, items }: ContextMenuProps) {
  return (
    <div
      role="menu"
      className="fixed z-50 bg-white py-1 flex flex-col w-max shadow-[0px_3px_14px_0px_rgba(0,0,0,0.25)]"
      style={{ left: x, top: y }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          role="menuitem"
          type="button"
          onClick={item.onClick}
          className="h-[25px] px-3 py-1 flex items-center cursor-pointer text-left font-['Segoe_UI',sans-serif] font-normal text-[12px] leading-[normal] text-black whitespace-nowrap hover:bg-[#0096c9] hover:text-white"
        >
          {item.label}
        </button>
      ))}
      {/* Borda desenhada por dentro (como no Figma), sem somar ao tamanho do menu */}
      <div aria-hidden="true" className="absolute inset-0 border border-[#a5a5a5] pointer-events-none" />
    </div>
  );
}
