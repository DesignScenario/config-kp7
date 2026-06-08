import svgPaths from "./svg-lkwgd7iywe";
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

function Group() {
  return (
    <div className="absolute inset-[-0.01%_0_0.01%_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="Group">
          <g id="Vector" />
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p1f61aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            <path d={svgPaths.p3a40a100} fill="var(--fill-0, #38404D)" id="Vector_3" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p38345f00} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Camada() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group />
    </div>
  );
}

function ItemDaLista() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="app/ícone/seta-menu-suspenso-16px">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5px] left-1/2 top-1/2 w-[7px]">
              <div className="absolute inset-[-10%_-5.84%_-8.51%_-5.84%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.81796 5.92562">
                  <path d={svgPaths.pdbea00} fill="var(--fill-0, #333333)" id="Vector 11" stroke="var(--stroke-0, #333333)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/keypad-wifi-2">
            <Camada />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">CR-KP7-RF [A0:C3:9E:44]</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PrimeiraLinha() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="primeira linha">
      <ItemDaLista />
      <ItemDaLista1 />
      <ItemDaLista2 />
    </div>
  );
}

function Camada1() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista3() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="opacity-25 overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada1 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Reunião 1</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">87%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] opacity-25 relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PrimeiraLinha1() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="primeira linha">
      <ItemDaLista3 />
      <ItemDaLista4 />
      <ItemDaLista5 />
    </div>
  );
}

function Camada2() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista6() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="opacity-25 overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada2 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Reunião 2</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">79%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] opacity-25 relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PrimeiraLinha2() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="primeira linha">
      <ItemDaLista6 />
      <ItemDaLista7 />
      <ItemDaLista8 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[-0.01%_0_0.01%_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="Group">
          <g id="Vector" />
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p1f61aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            <path d={svgPaths.p3a40a100} fill="var(--fill-0, #38404D)" id="Vector_3" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p38345f00} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Camada3() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group1 />
    </div>
  );
}

function ItemDaLista9() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="app/ícone/seta-menu-suspenso-16px">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5px] left-1/2 top-1/2 w-[7px]">
              <div className="absolute inset-[-10%_-5.84%_-8.51%_-5.84%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.81796 5.92562">
                  <path d={svgPaths.pdbea00} fill="var(--fill-0, #333333)" id="Vector 11" stroke="var(--stroke-0, #333333)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/keypad-wifi-2">
            <Camada3 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">{`CR-KP7-RF [7F:2A:C9:10] `}</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SegundaLinha() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="segunda linha">
      <ItemDaLista9 />
      <ItemDaLista10 />
      <ItemDaLista11 />
    </div>
  );
}

function Camada4() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista12() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="opacity-25 overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada4 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Conferência 1</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">94%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] opacity-25 relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SegundaLinha1() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="segunda linha">
      <ItemDaLista12 />
      <ItemDaLista13 />
      <ItemDaLista14 />
    </div>
  );
}

function Camada5() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista15() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="opacity-25 overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada5 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Conferência 2</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic opacity-25 relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">81%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] opacity-25 relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SegundaLinha2() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="segunda linha">
      <ItemDaLista15 />
      <ItemDaLista16 />
      <ItemDaLista17 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[-0.01%_0_0.01%_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="Group">
          <g id="Vector" />
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p1f61aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            <path d={svgPaths.p3a40a100} fill="var(--fill-0, #38404D)" id="Vector_3" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p38345f00} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Camada6() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group2 />
    </div>
  );
}

function ItemDaLista18() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="app/ícone/seta-menu-suspenso-16px">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5px] left-1/2 top-1/2 w-[7px]">
              <div className="absolute inset-[-10%_-5.84%_-8.51%_-5.84%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.81796 5.92562">
                  <path d={svgPaths.pdbea00} fill="var(--fill-0, #333333)" id="Vector 11" stroke="var(--stroke-0, #333333)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/keypad-wifi-2">
            <Camada6 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">{`CR-KP7-RF [B4:88:3D:E1] `}</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="terceira linha">
      <ItemDaLista18 />
      <ItemDaLista19 />
      <ItemDaLista20 />
    </div>
  );
}

function Camada7() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista21() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada7 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Desenvolvimento</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">90%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista23() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha1() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="terceira linha">
      <ItemDaLista21 />
      <ItemDaLista22 />
      <ItemDaLista23 />
    </div>
  );
}

function Camada8() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista24() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada8 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor RH</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">78%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha2() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="terceira linha">
      <ItemDaLista24 />
      <ItemDaLista25 />
      <ItemDaLista26 />
    </div>
  );
}

function Camada9() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista27() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada9 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Financeiro</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">62%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista29() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha3() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="terceira linha">
      <ItemDaLista27 />
      <ItemDaLista28 />
      <ItemDaLista29 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[-0.01%_0_0.01%_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="Group">
          <g id="Vector" />
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p1f61aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            <path d={svgPaths.p3a40a100} fill="var(--fill-0, #38404D)" id="Vector_3" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p38345f00} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Camada10() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group3 />
    </div>
  );
}

function ItemDaLista30() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="app/ícone/seta-menu-suspenso-16px">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5px] left-1/2 top-1/2 w-[7px]">
              <div className="absolute inset-[-10%_-5.84%_-8.51%_-5.84%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.81796 5.92562">
                  <path d={svgPaths.pdbea00} fill="var(--fill-0, #333333)" id="Vector 11" stroke="var(--stroke-0, #333333)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/keypad-wifi-2">
            <Camada10 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">CR-KP7-RF [09:FE:61:AC]</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista31() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quarta linha">
      <ItemDaLista30 />
      <ItemDaLista31 />
      <ItemDaLista32 />
    </div>
  );
}

function Camada11() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista33() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada11 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Financeiro</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista34() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">86%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista35() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha1() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quarta linha">
      <ItemDaLista33 />
      <ItemDaLista34 />
      <ItemDaLista35 />
    </div>
  );
}

function Camada12() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista36() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada12 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Desenvolvimento</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista37() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">75%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista38() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha2() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quarta linha">
      <ItemDaLista36 />
      <ItemDaLista37 />
      <ItemDaLista38 />
    </div>
  );
}

function Camada13() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista39() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada13 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor RH</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista40() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">65%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista41() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha3() {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quarta linha">
      <ItemDaLista39 />
      <ItemDaLista40 />
      <ItemDaLista41 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[-0.01%_0_0.01%_0]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="Group">
          <g id="Vector" />
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p1f61aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            <path d={svgPaths.p3a40a100} fill="var(--fill-0, #38404D)" id="Vector_3" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p38345f00} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Camada14() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group4 />
    </div>
  );
}

function ItemDaLista42() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="app/ícone/seta-menu-suspenso-16px">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5px] left-1/2 top-1/2 w-[7px]">
              <div className="absolute inset-[-10%_-5.84%_-8.51%_-5.84%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.81796 5.92562">
                  <path d={svgPaths.pdbea00} fill="var(--fill-0, #333333)" id="Vector 11" stroke="var(--stroke-0, #333333)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/keypad-wifi-2">
            <Camada14 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">CR-KP7-RF [E7:55:B0:19]</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista43() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista44() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quinta linha">
      <ItemDaLista42 />
      <ItemDaLista43 />
      <ItemDaLista44 />
    </div>
  );
}

function Camada15() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista45() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada15 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor RH</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista46() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">90%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista47() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]" data-name="Vector">
              <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                  <path d={svgPaths.pc079200} fill="var(--stroke-0, #575757)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha1() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quinta linha">
      <ItemDaLista45 />
      <ItemDaLista46 />
      <ItemDaLista47 />
    </div>
  );
}

function Camada16() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista48() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada16 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Financeiro</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista49() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">72%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista50() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha2() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quinta linha">
      <ItemDaLista48 />
      <ItemDaLista49 />
      <ItemDaLista50 />
    </div>
  );
}

function Camada17() {
  return (
    <div className="absolute contents inset-0" data-name="Camada_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p5465000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2eaa66c0} fill="var(--fill-0, #24AAD7)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1fa31840} fill="var(--fill-0, #38404D)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ItemDaLista51() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada17 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Desenvolvimento</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista52() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">57%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista53() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <div className="bg-[#ececec] relative rounded-[2px] shrink-0 size-[16px]" data-name="e2/checkbox">
          <div className="overflow-clip relative rounded-[inherit] size-full" />
          <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha3() {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quinta linha">
      <ItemDaLista51 />
      <ItemDaLista52 />
      <ItemDaLista53 />
    </div>
  );
}

function Conteudo() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="conteúdo">
      <Cabecalho1 />
      <PrimeiraLinha />
      <PrimeiraLinha1 />
      <PrimeiraLinha2 />
      <SegundaLinha />
      <SegundaLinha1 />
      <SegundaLinha2 />
      <TerceiraLinha />
      <TerceiraLinha1 />
      <TerceiraLinha2 />
      <TerceiraLinha3 />
      <QuartaLinha />
      <QuartaLinha1 />
      <QuartaLinha2 />
      <QuartaLinha3 />
      <QuintaLinha />
      <QuintaLinha1 />
      <QuintaLinha2 />
      <QuintaLinha3 />
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

export default function E2CrKp7Rf() {
  return (
    <div className="bg-[#f4f4f4] relative rounded-[8px] size-full" data-name="E2 - CR-KP7-RF">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#1d242c] h-[40px] relative shrink-0 w-full" data-name="e2/cabeçalho-da-janela">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
              <AreaDoTexto />
            </div>
          </div>
        </div>
        <ControlesRf />
        <button className="absolute block cursor-pointer right-0 size-[32px] top-[4px]" data-name="e2/ícone/16px/fechar">
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