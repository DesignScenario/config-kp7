function Grupo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="grupo 1">
      <button className="cursor-pointer h-[25px] relative shrink-0 w-full" data-name="e2/menu-de-contexto">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[12px] py-[4px] relative size-full">
            <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-left whitespace-nowrap">
              <p className="leading-[normal]">Desvincular</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function MenuDeContextoDesvincular() {
  return (
    <div className="bg-white relative size-full" data-name="Menu de Contexto -Desvincular">
      <div className="content-stretch flex flex-col items-start py-[4px] relative size-full">
        <Grupo />
      </div>
      <div aria-hidden="true" className="absolute border border-[#a5a5a5] border-solid inset-0 pointer-events-none shadow-[0px_3px_14px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}