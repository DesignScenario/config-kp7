import svgPaths from "./svg-jqomy2ehpc";
import imgCabecalho from "./eb441b9611f526caca21479f7b3886a23918780f.png";

function AreaDoTexto() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-name="área do texto">
      <p className="[word-break:break-word] font-['Segoe_UI:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-white uppercase whitespace-nowrap">CR-KP7-RF</p>
    </div>
  );
}

function Descritivo() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Segoe_UI:Bold',sans-serif] gap-[4px] items-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap" data-name="descritivo">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">Inclusão de CR-KP7-RF</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[normal]">(Buscando dispositivos...)</p>
      </div>
    </div>
  );
}

function Cabecalho() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="cabeçalho">
      <Descritivo />
      <div className="bg-gradient-to-b from-[#eee] h-[25px] relative rounded-[2px] shrink-0 to-[#d9d9d9]" data-name="e2/botão-principal">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[normal]">Modo padrão</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function ItemDoCabecalho() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item do cabeçalho">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[6px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Keypad RF</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDoCabecalho1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item do cabeçalho">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">Intensidade</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDoCabecalho2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item do cabeçalho">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">Associar</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Cabecalho1() {
  return (
    <div className="relative shrink-0 w-full" data-name="cabeçalho">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCabecalho} />
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <ItemDoCabecalho />
        <ItemDoCabecalho1 />
        <ItemDoCabecalho2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d8d8d8] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Conteudo() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="conteúdo">
      <Cabecalho1 />
    </div>
  );
}

function Tabela1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="tabela">
      <Conteudo />
    </div>
  );
}

function Tabela() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative w-full" data-name="tabela">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="content-stretch flex items-start pr-[14px] relative size-full">
          <div className="absolute bg-[#ececec] bottom-0 right-0 top-0 w-[14px]" data-name="e2/cursor">
            <div className="overflow-clip relative rounded-[inherit] size-full">
              <div className="-translate-x-1/2 absolute left-1/2 overflow-clip size-[10px] top-px" data-name="e2/ícone/10px/seta">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[3.5px] left-1/2 top-[calc(50%-0.25px)] w-[6px]">
                  <div className="absolute inset-[-14.29%_-6.33%_-9.3%_-6.33%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.75926 4.3254">
                      <path d={svgPaths.p312d3b00} id="Vector 3" stroke="var(--stroke-0, #969696)" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="-translate-x-1/2 absolute bottom-px left-1/2 overflow-clip size-[10px]" data-name="e2/ícone/10px/seta">
                <div className="absolute flex h-[3.5px] items-center justify-center left-[2px] top-[3px] w-[6px]">
                  <div className="flex-none rotate-180">
                    <div className="h-[3.5px] relative w-[6px]">
                      <div className="absolute inset-[-14.29%_-6.33%_-9.3%_-6.33%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.75926 4.3254">
                          <path d={svgPaths.p312d3b00} id="Vector 3" stroke="var(--stroke-0, #969696)" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-translate-x-1/2 absolute bg-gradient-to-r border border-[#b5b5b5] border-solid from-[#eee] h-[190px] left-1/2 rounded-[3px] to-[#dedede] top-[11px] w-[10px]" data-name="cursor" />
            </div>
            <div aria-hidden="true" className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none" />
          </div>
          <Tabela1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Botoes() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="botões">
      <div className="bg-gradient-to-b from-[#eee] h-[25px] relative rounded-[2px] shrink-0 to-[#d9d9d9] w-[71px]" data-name="e2/botão-principal">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[normal]">Concluir</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function ControlesRf() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="controles rf">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Cabecalho />
        <Tabela />
        <Botoes />
      </div>
    </div>
  );
}

export default function E2OverlayInclusaoDeCrKp7Rf({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-[#f4f4f4] relative rounded-[8px] size-full" data-name="E2 - OVERLAY - INCLUSÃO DE CR-KP7-RF">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#1d242c] h-[40px] relative shrink-0 w-full" data-name="e2/cabeçalho-da-janela">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
              <AreaDoTexto />
            </div>
          </div>
        </div>
        <ControlesRf />
        <button
          className="absolute block cursor-pointer right-0 size-[32px] top-[4px]"
          data-name="e2/ícone/16px/fechar"
          onClick={onClose}
        >
          <div className="absolute inset-[37.5%]" data-name="Vector">
            <div className="absolute inset-[-4.42%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.70711 8.70711">
                <path d={svgPaths.p35344300} id="Vector" stroke="var(--stroke-0, #9B9B9B)" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bebebe] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}