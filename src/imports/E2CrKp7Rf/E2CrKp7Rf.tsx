import { useState, useEffect } from 'react';
import svgPaths from "./svg-35qzwd4y2m";
import imgCabecalho from "./eb441b9611f526caca21479f7b3886a23918780f.png";
import Checkbox from "../../app/components/Checkbox";

interface Device {
  id: string;
  name: string;
  type: string;
  isAssociated: boolean;
  children?: Device[];
}

interface SensorData {
  name: string;
  signal: string;
}

const KEYPAD_DATA: Record<number, { mac: string; networkId: string }> = {
  1: { mac: "A0:C3:9E:44", networkId: "kp7-reuniao-net" },
  2: { mac: "7F:2A:C9:10", networkId: "kp7-conferencia-net" },
  3: { mac: "B4:88:3D:E1", networkId: "kp7-desenvolvimento-net" },
  4: { mac: "09:FE:61:AC", networkId: "kp7-financeiro-net" },
  5: { mac: "E7:55:B0:19", networkId: "kp7-rh-net" },
};

const KEYPAD_NETWORK_IDS = Object.values(KEYPAD_DATA).map(kp => kp.networkId);

const KEYPAD_GENERIC_NAMES: Record<number, string> = {
  1: "Keypad RF 1",
  2: "Keypad RF 2",
  3: "Keypad RF 3",
  4: "Keypad RF 4",
  5: "Keypad RF 5",
};

const getOverlayAssociationsFromBase = (baseAssociations?: Record<string, string>): Record<string, string> => {
  if (!baseAssociations) return {};

  const filteredEntries = Object.entries(baseAssociations).filter(([networkId]) => KEYPAD_NETWORK_IDS.includes(networkId));
  return Object.fromEntries(filteredEntries);
};

const KEYPAD_SENSORS: Record<number, { standard: SensorData; advanced: SensorData[] }> = {
  1: {
    standard: { name: "Sensor Reunião 1", signal: "87%" },
    advanced: [
      { name: "Sensor Reunião 1", signal: "87%" },
      { name: "Sensor Reunião 2", signal: "79%" },
    ],
  },
  2: {
    standard: { name: "Sensor Conferência 1", signal: "94%" },
    advanced: [
      { name: "Sensor Conferência 1", signal: "94%" },
      { name: "Sensor Conferência 2", signal: "88%" },
    ],
  },
  3: {
    standard: { name: "Sensor Desenvolvimento", signal: "90%" },
    advanced: [
      { name: "Sensor Desenvolvimento", signal: "90%" },
      { name: "Sensor RH", signal: "78%" },
      { name: "Sensor Financeiro", signal: "62%" },
    ],
  },
  4: {
    standard: { name: "Sensor Financeiro", signal: "86%" },
    advanced: [
      { name: "Sensor Financeiro", signal: "86%" },
      { name: "Sensor Desenvolvimento", signal: "75%" },
      { name: "Sensor RH", signal: "65%" },
    ],
  },
  5: {
    standard: { name: "Sensor RH", signal: "90%" },
    advanced: [
      { name: "Sensor RH", signal: "90%" },
      { name: "Sensor Financeiro", signal: "72%" },
      { name: "Sensor Desenvolvimento", signal: "57%" },
    ],
  },
};

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

function Cabecalho({ isAdvancedMode, onToggleMode }: { isAdvancedMode: boolean; onToggleMode: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="cabeçalho">
      <Descritivo />
      <button
        className="bg-gradient-to-b from-[#eee] h-[25px] relative rounded-[2px] shrink-0 to-[#d9d9d9] cursor-pointer border border-[#b5b5b5]"
        onClick={onToggleMode}
        data-name="e2/botão-principal"
      >
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[normal]">{isAdvancedMode ? 'Modo padrão' : 'Modo avançado'}</p>
          </div>
        </div>
      </button>
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

function ItemDaLista({ mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  const textColor = isAssociated ? "#007F00" : "black";

  return (
    <div
      className="flex-[1_0_0] h-[24px] min-w-px relative"
      data-name="item da lista"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
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
          <div className="flex flex-row items-center gap-[4px] relative shrink-0 whitespace-nowrap">
            {isAssociated ? (
              <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal]" style={{ color: textColor }}>{displayName}</span>
            ) : (
              <>
                <input
                  className="bg-transparent border-0 focus:outline-none leading-[normal] p-0 m-0 font-['Segoe_UI:Regular',sans-serif] text-[12px] not-italic"
                  style={{ color: textColor, width: `${displayName.length || 1}ch` }}
                  value={displayName}
                  onChange={(e) => onRename(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal] text-black">[{mac}]</span>
              </>
            )}
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

function ItemDaLista2({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} onChange={onChange} />
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PrimeiraLinha({ mobileChecked, onMobileChange, mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mobileChecked: boolean; onMobileChange: () => void; mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="primeira linha">
      <ItemDaLista mac={mac} displayName={displayName} isAssociated={isAssociated} onDragOver={onDragOver} onDrop={onDrop} onRename={onRename} />
      <ItemDaLista1 />
      <ItemDaLista2 checked={mobileChecked} onChange={onMobileChange} />
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

function ItemDaLista3({ opacity = 1, sensorName }: { opacity?: number; sensorName: string }) {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" style={{ opacity }} data-name="e2/ícone/16px/sensores">
            <Camada1 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" style={{ opacity }}>
            <p className="leading-[normal]">{sensorName}</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista4({ opacity = 1, signal }: { opacity?: number; signal: string }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[90px]" data-name="item da lista">
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" style={{ opacity }}>
          <p className="leading-[normal]">{signal}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista5({ checked, disabled, onChange, opacity = 1 }: { checked: boolean; disabled: boolean; onChange: () => void; opacity?: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PrimeiraLinha1({ mobileChecked, sensorChecked, onSensorChange, sensorName, signal }: { mobileChecked: boolean; sensorChecked: boolean; onSensorChange: () => void; sensorName: string; signal: string }) {
  const opacity = mobileChecked ? 0.25 : 1;
  return (
    <div
      className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full"
      data-name="primeira linha"
    >
      <ItemDaLista3 opacity={opacity} sensorName={sensorName} />
      <ItemDaLista4 opacity={opacity} signal={signal} />
      <ItemDaLista5 checked={sensorChecked} disabled={mobileChecked} onChange={onSensorChange} opacity={opacity} />
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

function Camada2() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group1 />
    </div>
  );
}

function ItemDaLista6({ mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  const textColor = isAssociated ? "#007F00" : "black";

  return (
    <div
      className="flex-[1_0_0] h-[24px] min-w-px relative"
      data-name="item da lista"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
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
            <Camada2 />
          </div>
          <div className="flex flex-row items-center gap-[4px] relative shrink-0 whitespace-nowrap">
            {isAssociated ? (
              <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal]" style={{ color: textColor }}>{displayName}</span>
            ) : (
              <>
                <input
                  className="bg-transparent border-0 focus:outline-none leading-[normal] p-0 m-0 font-['Segoe_UI:Regular',sans-serif] text-[12px] not-italic"
                  style={{ color: textColor, width: `${displayName.length || 1}ch` }}
                  value={displayName}
                  onChange={(e) => onRename(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal] text-black">[{mac}]</span>
              </>
            )}
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
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista8({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} onChange={onChange} />
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SegundaLinha({ mobileChecked, onMobileChange, mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mobileChecked: boolean; onMobileChange: () => void; mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="segunda linha">
      <ItemDaLista6 mac={mac} displayName={displayName} isAssociated={isAssociated} onDragOver={onDragOver} onDrop={onDrop} onRename={onRename} />
      <ItemDaLista7 />
      <ItemDaLista8 checked={mobileChecked} onChange={onMobileChange} />
    </div>
  );
}

function Camada3() {
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

function ItemDaLista9() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative" data-name="item da lista">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[38px] pr-[3px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada3 />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
            <p className="leading-[normal]">Sensor Conferência 1</p>
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
      <div className="content-stretch flex items-center justify-center overflow-clip pl-[6px] pr-[3px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">94%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista11({ checked, disabled, onChange, opacity = 1 }: { checked: boolean; disabled: boolean; onChange: () => void; opacity?: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SegundaLinha1({ mobileChecked, sensorChecked, onSensorChange, sensorName, signal }: { mobileChecked: boolean; sensorChecked: boolean; onSensorChange: () => void; sensorName: string; signal: string }) {
  const opacity = mobileChecked ? 0.25 : 1;
  return (
    <div
      className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full"
      data-name="segunda linha"
    >
      <ItemDaLista3 opacity={opacity} sensorName={sensorName} />
      <ItemDaLista4 opacity={opacity} signal={signal} />
      <ItemDaLista11 checked={sensorChecked} disabled={mobileChecked} onChange={onSensorChange} opacity={opacity} />
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

function Camada4() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group2 />
    </div>
  );
}

function ItemDaLista12({ mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  const textColor = isAssociated ? "#007F00" : "black";

  return (
    <div
      className="flex-[1_0_0] h-[24px] min-w-px relative"
      data-name="item da lista"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
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
            <Camada4 />
          </div>
          <div className="flex flex-row items-center gap-[4px] relative shrink-0 whitespace-nowrap">
            {isAssociated ? (
              <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal]" style={{ color: textColor }}>{displayName}</span>
            ) : (
              <>
                <input
                  className="bg-transparent border-0 focus:outline-none leading-[normal] p-0 m-0 font-['Segoe_UI:Regular',sans-serif] text-[12px] not-italic"
                  style={{ color: textColor, width: `${displayName.length || 1}ch` }}
                  value={displayName}
                  onChange={(e) => onRename(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal] text-black">[{mac}]</span>
              </>
            )}
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
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista14({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} onChange={onChange} />
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha({ mobileChecked, onMobileChange, mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mobileChecked: boolean; onMobileChange: () => void; mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="terceira linha">
      <ItemDaLista12 mac={mac} displayName={displayName} isAssociated={isAssociated} onDragOver={onDragOver} onDrop={onDrop} onRename={onRename} />
      <ItemDaLista13 />
      <ItemDaLista14 checked={mobileChecked} onChange={onMobileChange} />
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
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="e2/ícone/16px/sensores">
            <Camada5 />
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

function ItemDaLista16() {
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

function ItemDaLista17({ checked, disabled, onChange, opacity = 1 }: { checked: boolean; disabled: boolean; onChange: () => void; opacity?: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TerceiraLinha1({ mobileChecked, sensorChecked, onSensorChange, sensorName, signal }: { mobileChecked: boolean; sensorChecked: boolean; onSensorChange: () => void; sensorName: string; signal: string }) {
  const opacity = mobileChecked ? 0.25 : 1;
  return (
    <div
      className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full"
      data-name="terceira linha"
    >
      <ItemDaLista3 opacity={opacity} sensorName={sensorName} />
      <ItemDaLista4 opacity={opacity} signal={signal} />
      <ItemDaLista17 checked={sensorChecked} disabled={mobileChecked} onChange={onSensorChange} opacity={opacity} />
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

function Camada6() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group3 />
    </div>
  );
}

function ItemDaLista18({ mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  const textColor = isAssociated ? "#007F00" : "black";

  return (
    <div
      className="flex-[1_0_0] h-[24px] min-w-px relative"
      data-name="item da lista"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
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
          <div className="flex flex-row items-center gap-[4px] relative shrink-0 whitespace-nowrap">
            {isAssociated ? (
              <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal]" style={{ color: textColor }}>{displayName}</span>
            ) : (
              <>
                <input
                  className="bg-transparent border-0 focus:outline-none leading-[normal] p-0 m-0 font-['Segoe_UI:Regular',sans-serif] text-[12px] not-italic"
                  style={{ color: textColor, width: `${displayName.length || 1}ch` }}
                  value={displayName}
                  onChange={(e) => onRename(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal] text-black">[{mac}]</span>
              </>
            )}
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

function ItemDaLista20({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} onChange={onChange} />
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha({ mobileChecked, onMobileChange, mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mobileChecked: boolean; onMobileChange: () => void; mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  return (
    <div className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quarta linha">
      <ItemDaLista18 mac={mac} displayName={displayName} isAssociated={isAssociated} onDragOver={onDragOver} onDrop={onDrop} onRename={onRename} />
      <ItemDaLista19 />
      <ItemDaLista20 checked={mobileChecked} onChange={onMobileChange} />
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
            <p className="leading-[normal]">Sensor Financeiro</p>
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
          <p className="leading-[normal]">86%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista23({ checked, disabled, onChange, opacity = 1 }: { checked: boolean; disabled: boolean; onChange: () => void; opacity?: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuartaLinha1({ mobileChecked, sensorChecked, onSensorChange, sensorName, signal }: { mobileChecked: boolean; sensorChecked: boolean; onSensorChange: () => void; sensorName: string; signal: string }) {
  const opacity = mobileChecked ? 0.25 : 1;
  return (
    <div
      className="bg-[#f9f9f9] content-stretch flex items-center overflow-clip relative shrink-0 w-full"
      data-name="quarta linha"
    >
      <ItemDaLista3 opacity={opacity} sensorName={sensorName} />
      <ItemDaLista4 opacity={opacity} signal={signal} />
      <ItemDaLista23 checked={sensorChecked} disabled={mobileChecked} onChange={onSensorChange} opacity={opacity} />
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

function Camada8() {
  return (
    <div className="absolute contents inset-[-0.01%_0_0_0]" data-name="Camada_1">
      <Group4 />
    </div>
  );
}

function ItemDaLista24({ mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  const textColor = isAssociated ? "#007F00" : "black";

  return (
    <div
      className="flex-[1_0_0] h-[24px] min-w-px relative"
      data-name="item da lista"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
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
            <Camada8 />
          </div>
          <div className="flex flex-row items-center gap-[4px] relative shrink-0 whitespace-nowrap">
            {isAssociated ? (
              <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal]" style={{ color: textColor }}>{displayName}</span>
            ) : (
              <>
                <input
                  className="bg-transparent border-0 focus:outline-none leading-[normal] p-0 m-0 font-['Segoe_UI:Regular',sans-serif] text-[12px] not-italic"
                  style={{ color: textColor, width: `${displayName.length || 1}ch` }}
                  value={displayName}
                  onChange={(e) => onRename(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="font-['Segoe_UI:Regular',sans-serif] not-italic text-[12px] leading-[normal] text-black">[{mac}]</span>
              </>
            )}
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
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista26({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} onChange={onChange} />
        <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">(Móvel)</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha({ mobileChecked, onMobileChange, mac, displayName, isAssociated, onDragOver, onDrop, onRename }: { mobileChecked: boolean; onMobileChange: () => void; mac: string; displayName: string; isAssociated: boolean; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void; onRename: (name: string) => void }) {
  return (
    <div className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="quinta linha">
      <ItemDaLista24 mac={mac} displayName={displayName} isAssociated={isAssociated} onDragOver={onDragOver} onDrop={onDrop} onRename={onRename} />
      <ItemDaLista25 />
      <ItemDaLista26 checked={mobileChecked} onChange={onMobileChange} />
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
            <p className="leading-[normal]">Sensor RH</p>
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
          <p className="leading-[normal]">90%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ItemDaLista29({ checked, disabled, onChange, opacity = 1 }: { checked: boolean; disabled: boolean; onChange: () => void; opacity?: number }) {
  return (
    <div className="h-[24px] relative shrink-0 w-[150px]" data-name="item da lista">
      <div className="content-stretch flex items-center overflow-clip pl-[67px] relative rounded-[inherit] size-full">
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function QuintaLinha1({ mobileChecked, sensorChecked, onSensorChange, sensorName, signal }: { mobileChecked: boolean; sensorChecked: boolean; onSensorChange: () => void; sensorName: string; signal: string }) {
  const opacity = mobileChecked ? 0.25 : 1;
  return (
    <div
      className="bg-white content-stretch flex items-center overflow-clip relative shrink-0 w-full"
      data-name="quinta linha"
    >
      <ItemDaLista3 opacity={opacity} sensorName={sensorName} />
      <ItemDaLista4 opacity={opacity} signal={signal} />
      <ItemDaLista29 checked={sensorChecked} disabled={mobileChecked} onChange={onSensorChange} opacity={opacity} />
    </div>
  );
}

function Conteudo({ visibleDevices = 5, isAdvancedMode = false, draggedDevice, onDragOver, overlayAssociations, setOverlayAssociations, projectDevices, keypadNames, onRenameKeypad }: { visibleDevices?: number; isAdvancedMode?: boolean; draggedDevice?: Device | null; onDragOver?: (e: React.DragEvent) => void; overlayAssociations: Record<string, string>; setOverlayAssociations: React.Dispatch<React.SetStateAction<Record<string, string>>>; projectDevices?: Device[]; keypadNames: Record<string, string>; onRenameKeypad: (networkId: string, name: string) => void }) {
  const [checkboxes, setCheckboxes] = useState({
    kp1Mobile: false,
    kp1Sensor: false,
    kp1Sensor2: false,
    kp2Mobile: false,
    kp2Sensor: false,
    kp2Sensor2: false,
    kp3Mobile: false,
    kp3Sensor: false,
    kp3Sensor2: false,
    kp3Sensor3: false,
    kp4Mobile: false,
    kp4Sensor: false,
    kp4Sensor2: false,
    kp4Sensor3: false,
    kp5Mobile: false,
    kp5Sensor: false,
    kp5Sensor2: false,
    kp5Sensor3: false,
  });

  const handleMobileChange = (kpIndex: number) => {
    const key = `kp${kpIndex}Mobile` as keyof typeof checkboxes;
    const sensorData = KEYPAD_SENSORS[kpIndex];
    const sensorCount = isAdvancedMode ? sensorData.advanced.length : 1;
    const sensorKeys: string[] = [];

    for (let i = 0; i < sensorCount; i++) {
      if (i === 0) {
        sensorKeys.push(`kp${kpIndex}Sensor`);
      } else {
        sensorKeys.push(`kp${kpIndex}Sensor${i + 1}`);
      }
    }

    setCheckboxes(prev => {
      const updates: any = {
        [key]: !prev[key],
      };
      if (!prev[key]) {
        sensorKeys.forEach(sKey => {
          updates[sKey] = true;
        });
      }
      return { ...prev, ...updates };
    });
  };

  const handleSensorChange = (kpIndex: number, sensorIndex: number = 0) => {
    const mobileKey = `kp${kpIndex}Mobile` as keyof typeof checkboxes;
    const sensorKey = (sensorIndex === 0 ? `kp${kpIndex}Sensor` : `kp${kpIndex}Sensor${sensorIndex + 1}`) as keyof typeof checkboxes;
    if (!checkboxes[mobileKey]) {
      setCheckboxes(prev => ({
        ...prev,
        [sensorKey]: !prev[sensorKey],
      }));
    }
  };

  const getSensors = (kpIndex: number) => {
    const sensorData = KEYPAD_SENSORS[kpIndex];
    return isAdvancedMode ? sensorData.advanced : [sensorData.standard];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDragOver) onDragOver(e);
  };

  const handleDrop = (kpIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedDevice || draggedDevice.type !== 'keypad') return;

    // One-to-one constraint: each project KP7 can only be associated with one network KP7
    if (Object.values(overlayAssociations).includes(draggedDevice.id)) return;

    const networkDeviceId = KEYPAD_DATA[kpIndex].networkId;
    setOverlayAssociations(prev => ({
      ...prev,
      [networkDeviceId]: draggedDevice.id,
    }));
  };

  const findProjectDevice = (devices: Device[], id: string): Device | null => {
    for (const device of devices) {
      if (device.id === id) return device;
      if (device.children) {
        const found = findProjectDevice(device.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleRename = (kpIndex: number, name: string) => {
    const networkDeviceId = KEYPAD_DATA[kpIndex].networkId;
    onRenameKeypad(networkDeviceId, name);
  };

  const getKeypadDisplayInfo = (kpIndex: number) => {
    const networkDeviceId = KEYPAD_DATA[kpIndex].networkId;
    const projectDeviceId = overlayAssociations[networkDeviceId];
    const isAssociated = !!projectDeviceId;
    const customName = keypadNames[networkDeviceId]?.trim();

    let displayName: string;
    if (isAssociated && projectDevices) {
      const projectDevice = findProjectDevice(projectDevices, projectDeviceId);
      displayName = projectDevice
        ? projectDevice.name.replace(/\s*\(CR-KP7-RF\)\s*$/, '')
        : customName || KEYPAD_GENERIC_NAMES[kpIndex];
    } else {
      displayName = customName || KEYPAD_GENERIC_NAMES[kpIndex];
    }

    return { displayName, isAssociated };
  };

  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="conteúdo">
      <Cabecalho1 />
      {visibleDevices >= 1 && (
        <>
          <PrimeiraLinha
            mobileChecked={checkboxes.kp1Mobile}
            onMobileChange={() => handleMobileChange(1)}
            mac={KEYPAD_DATA[1].mac}
            displayName={getKeypadDisplayInfo(1).displayName}
            isAssociated={getKeypadDisplayInfo(1).isAssociated}
            onDragOver={handleDragOver}
            onDrop={handleDrop(1)}
            onRename={(name) => handleRename(1, name)}
          />
          {getSensors(1).map((sensor, idx) => (
            <PrimeiraLinha1
              key={idx}
              mobileChecked={checkboxes.kp1Mobile}
              sensorChecked={idx === 0 ? checkboxes.kp1Sensor : checkboxes.kp1Sensor2}
              onSensorChange={() => handleSensorChange(1, idx)}
              sensorName={sensor.name}
              signal={sensor.signal}
            />
          ))}
        </>
      )}
      {visibleDevices >= 2 && (
        <>
          <SegundaLinha
            mobileChecked={checkboxes.kp2Mobile}
            onMobileChange={() => handleMobileChange(2)}
            mac={KEYPAD_DATA[2].mac}
            displayName={getKeypadDisplayInfo(2).displayName}
            isAssociated={getKeypadDisplayInfo(2).isAssociated}
            onDragOver={handleDragOver}
            onDrop={handleDrop(2)}
            onRename={(name) => handleRename(2, name)}
          />
          {getSensors(2).map((sensor, idx) => (
            <SegundaLinha1
              key={idx}
              mobileChecked={checkboxes.kp2Mobile}
              sensorChecked={idx === 0 ? checkboxes.kp2Sensor : checkboxes.kp2Sensor2}
              onSensorChange={() => handleSensorChange(2, idx)}
              sensorName={sensor.name}
              signal={sensor.signal}
            />
          ))}
        </>
      )}
      {visibleDevices >= 3 && (
        <>
          <TerceiraLinha
            mobileChecked={checkboxes.kp3Mobile}
            onMobileChange={() => handleMobileChange(3)}
            mac={KEYPAD_DATA[3].mac}
            displayName={getKeypadDisplayInfo(3).displayName}
            isAssociated={getKeypadDisplayInfo(3).isAssociated}
            onDragOver={handleDragOver}
            onDrop={handleDrop(3)}
            onRename={(name) => handleRename(3, name)}
          />
          {getSensors(3).map((sensor, idx) => {
            const sensorChecked = idx === 0 ? checkboxes.kp3Sensor : idx === 1 ? checkboxes.kp3Sensor2 : checkboxes.kp3Sensor3;
            return (
              <TerceiraLinha1
                key={idx}
                mobileChecked={checkboxes.kp3Mobile}
                sensorChecked={sensorChecked}
                onSensorChange={() => handleSensorChange(3, idx)}
                sensorName={sensor.name}
                signal={sensor.signal}
              />
            );
          })}
        </>
      )}
      {visibleDevices >= 4 && (
        <>
          <QuartaLinha
            mobileChecked={checkboxes.kp4Mobile}
            onMobileChange={() => handleMobileChange(4)}
            mac={KEYPAD_DATA[4].mac}
            displayName={getKeypadDisplayInfo(4).displayName}
            isAssociated={getKeypadDisplayInfo(4).isAssociated}
            onDragOver={handleDragOver}
            onDrop={handleDrop(4)}
            onRename={(name) => handleRename(4, name)}
          />
          {getSensors(4).map((sensor, idx) => {
            const sensorChecked = idx === 0 ? checkboxes.kp4Sensor : idx === 1 ? checkboxes.kp4Sensor2 : checkboxes.kp4Sensor3;
            return (
              <QuartaLinha1
                key={idx}
                mobileChecked={checkboxes.kp4Mobile}
                sensorChecked={sensorChecked}
                onSensorChange={() => handleSensorChange(4, idx)}
                sensorName={sensor.name}
                signal={sensor.signal}
              />
            );
          })}
        </>
      )}
      {visibleDevices >= 5 && (
        <>
          <QuintaLinha
            mobileChecked={checkboxes.kp5Mobile}
            onMobileChange={() => handleMobileChange(5)}
            mac={KEYPAD_DATA[5].mac}
            displayName={getKeypadDisplayInfo(5).displayName}
            isAssociated={getKeypadDisplayInfo(5).isAssociated}
            onDragOver={handleDragOver}
            onDrop={handleDrop(5)}
            onRename={(name) => handleRename(5, name)}
          />
          {getSensors(5).map((sensor, idx) => {
            const sensorChecked = idx === 0 ? checkboxes.kp5Sensor : idx === 1 ? checkboxes.kp5Sensor2 : checkboxes.kp5Sensor3;
            return (
              <QuintaLinha1
                key={idx}
                mobileChecked={checkboxes.kp5Mobile}
                sensorChecked={sensorChecked}
                onSensorChange={() => handleSensorChange(5, idx)}
                sensorName={sensor.name}
                signal={sensor.signal}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

function Tabela1({ visibleDevices, isAdvancedMode, draggedDevice, onDragOver, overlayAssociations, setOverlayAssociations, projectDevices, keypadNames, onRenameKeypad }: { visibleDevices?: number; isAdvancedMode?: boolean; draggedDevice?: Device | null; onDragOver?: (e: React.DragEvent) => void; overlayAssociations: Record<string, string>; setOverlayAssociations: React.Dispatch<React.SetStateAction<Record<string, string>>>; projectDevices?: Device[]; keypadNames: Record<string, string>; onRenameKeypad: (networkId: string, name: string) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="tabela">
      <Conteudo
        visibleDevices={visibleDevices}
        isAdvancedMode={isAdvancedMode}
        draggedDevice={draggedDevice}
        onDragOver={onDragOver}
        overlayAssociations={overlayAssociations}
        setOverlayAssociations={setOverlayAssociations}
        projectDevices={projectDevices}
        keypadNames={keypadNames}
        onRenameKeypad={onRenameKeypad}
      />
    </div>
  );
}

function Tabela({ visibleDevices, isAdvancedMode, draggedDevice, onDragOver, overlayAssociations, setOverlayAssociations, projectDevices, keypadNames, onRenameKeypad }: { visibleDevices?: number; isAdvancedMode?: boolean; draggedDevice?: Device | null; onDragOver?: (e: React.DragEvent) => void; overlayAssociations: Record<string, string>; setOverlayAssociations: React.Dispatch<React.SetStateAction<Record<string, string>>>; projectDevices?: Device[]; keypadNames: Record<string, string>; onRenameKeypad: (networkId: string, name: string) => void }) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative w-full border border-[#bebebe]" data-name="tabela">
      <div className="overflow-y-auto size-full">
        <Tabela1
          visibleDevices={visibleDevices}
          isAdvancedMode={isAdvancedMode}
          draggedDevice={draggedDevice}
          onDragOver={onDragOver}
          overlayAssociations={overlayAssociations}
          setOverlayAssociations={setOverlayAssociations}
          projectDevices={projectDevices}
          keypadNames={keypadNames}
          onRenameKeypad={onRenameKeypad}
        />
      </div>
    </div>
  );
}

function Botoes({ overlayAssociations, onConcluir }: { overlayAssociations: Record<string, string>; onConcluir?: (associations: Record<string, string>) => void }) {
  const handleClick = () => {
    if (onConcluir) {
      onConcluir(overlayAssociations);
    }
  };

  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-full" data-name="botões">
      <button
        className="bg-gradient-to-b from-[#eee] h-[25px] relative rounded-[2px] shrink-0 to-[#d9d9d9] w-[71px] cursor-pointer"
        data-name="e2/botão-principal"
        onClick={handleClick}
      >
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
          <div className="[word-break:break-word] flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#323232] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[normal]">Concluir</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </button>
    </div>
  );
}

function ControlesRf({ visibleDevices, isAdvancedMode, onToggleMode, draggedDevice, onDragOver, overlayAssociations, setOverlayAssociations, projectDevices, keypadNames, onRenameKeypad, onConcluir }: { visibleDevices?: number; isAdvancedMode: boolean; onToggleMode: () => void; draggedDevice?: Device | null; onDragOver?: (e: React.DragEvent) => void; overlayAssociations: Record<string, string>; setOverlayAssociations: React.Dispatch<React.SetStateAction<Record<string, string>>>; projectDevices?: Device[]; keypadNames: Record<string, string>; onRenameKeypad: (networkId: string, name: string) => void; onConcluir?: (associations: Record<string, string>) => void }) {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="controles rf">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Cabecalho isAdvancedMode={isAdvancedMode} onToggleMode={onToggleMode} />
        <Tabela
          visibleDevices={visibleDevices}
          isAdvancedMode={isAdvancedMode}
          draggedDevice={draggedDevice}
          onDragOver={onDragOver}
          overlayAssociations={overlayAssociations}
          setOverlayAssociations={setOverlayAssociations}
          projectDevices={projectDevices}
          keypadNames={keypadNames}
          onRenameKeypad={onRenameKeypad}
        />
        <Botoes overlayAssociations={overlayAssociations} onConcluir={onConcluir} />
      </div>
    </div>
  );
}

export default function E2CrKp7Rf({ visibleDevices = 5, onClose, onConcluir, draggedDevice, onDragOver, projectDevices, baseAssociations, baseKeypadNames, onKeypadNamesChange, onOverlayAssociationsChange }: { visibleDevices?: number; onClose?: () => void; onConcluir?: (associations: Record<string, string>) => void; draggedDevice?: Device | null; onDragOver?: (e: React.DragEvent) => void; projectDevices?: Device[]; baseAssociations?: Record<string, string>; baseKeypadNames?: Record<string, string>; onKeypadNamesChange?: (names: Record<string, string>) => void; onOverlayAssociationsChange?: (associations: Record<string, string>) => void }) {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [overlayAssociations, setOverlayAssociations] = useState<Record<string, string>>(() => getOverlayAssociationsFromBase(baseAssociations));
  const [keypadNames, setKeypadNames] = useState<Record<string, string>>(baseKeypadNames || {});

  useEffect(() => {
    setOverlayAssociations(getOverlayAssociationsFromBase(baseAssociations));
  }, [baseAssociations]);

  useEffect(() => {
    setKeypadNames(baseKeypadNames || {});
  }, [baseKeypadNames]);

  useEffect(() => {
    if (onKeypadNamesChange) {
      onKeypadNamesChange(keypadNames);
    }
  }, [keypadNames, onKeypadNamesChange]);

  useEffect(() => {
    if (onOverlayAssociationsChange) {
      onOverlayAssociationsChange(overlayAssociations);
    }
  }, [overlayAssociations, onOverlayAssociationsChange]);

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
        <ControlesRf
          visibleDevices={visibleDevices}
          isAdvancedMode={isAdvancedMode}
          onToggleMode={() => setIsAdvancedMode(!isAdvancedMode)}
          draggedDevice={draggedDevice}
          onDragOver={onDragOver}
          overlayAssociations={overlayAssociations}
          setOverlayAssociations={setOverlayAssociations}
          projectDevices={projectDevices}
          keypadNames={keypadNames}
          onRenameKeypad={(networkId, name) => setKeypadNames(prev => ({ ...prev, [networkId]: name }))}
          onConcluir={onConcluir}
        />
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