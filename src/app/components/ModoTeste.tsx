import { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';

import iconProjeto from '../../imports/projeto.png';
import iconAmbientes from '../../imports/ambientes.png';
import iconInterfaceComunicacao from '../../imports/interface-de-comunicação.png';
import iconSensores from '../../imports/sensores.png';
import iconKeypad from '../../imports/keypad-wifi-2.png';
import iconPasta from '../../imports/pasta.png';
import kp7RfVistas from '../../imports/KP7-RF_vistas.png';
import kp7RfVistasBlack from '../../imports/KP7-RF_vistas-black.png';

type DeviceType = 'project' | 'room' | 'interface' | 'sensor' | 'keypad' | 'folder';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isAssociated: boolean;
  mac?: string;
  signal?: number;
  children?: Device[];
}

interface TestEntry {
  id: string;
  horario: string;
  dispositivo: string;
  receptor: string;
  botao: string;
  acao: string;
  sinal: string;
}

const projectDevices: Device[] = [
  {
    id: 'novo-projeto',
    name: 'Novo Projeto',
    type: 'project',
    isAssociated: false,
    children: [
      {
        id: 'sala-reuniao',
        name: 'Sala de Reunião',
        type: 'room',
        isAssociated: false,
        children: [
          { id: 'eb-ntl1-proj', name: 'EB-NTL1', type: 'interface', isAssociated: true },
          { id: 'sensor-reuniao-1', name: 'Sensor Reunião 1 (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'sensor-reuniao-2', name: 'Sensor Reunião 2 (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'kp7-reuniao', name: 'KP7 Reunião (CR-KP7-RF)', type: 'keypad', isAssociated: true, mac: 'A0:C3:9E:44', signal: 89 },
        ],
      },
      {
        id: 'sala-conferencia',
        name: 'Sala de Conferência',
        type: 'room',
        isAssociated: false,
        children: [
          { id: 'sensor-conferencia-1', name: 'Sensor Conferência 1 (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'sensor-conferencia-2', name: 'Sensor Conferência 2 (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'kp7-conferencia', name: 'KP7 Conferência (CR-KP7-RF)', type: 'keypad', isAssociated: true, mac: '7F:2A:C9:10', signal: 81 },
        ],
      },
      {
        id: 'escritorio',
        name: 'Escritório',
        type: 'room',
        isAssociated: false,
        children: [
          { id: 'sensor-desenvolvimento', name: 'Sensor Desenvolvimento (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'sensor-financeiro', name: 'Sensor Financeiro (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'sensor-rh', name: 'Sensor RH (CR-LUMI-RF)', type: 'sensor', isAssociated: true },
          { id: 'kp7-desenvolvimento', name: 'KP7 Desenvolvimento (CR-KP7-RF)', type: 'keypad', isAssociated: true, mac: 'B4:88:3D:E1', signal: 63 },
          { id: 'kp7-rh', name: 'KP7 RH (CR-KP7-RF)', type: 'keypad', isAssociated: true, mac: 'E7:55:B0:19', signal: 78 },
          { id: 'kp7-financeiro', name: 'KP7 Financeiro (CR-KP7-RF)', type: 'keypad', isAssociated: true, mac: '09:FE:61:AC', signal: 32 },
        ],
      },
    ],
  },
];

const networkDevices: Device[] = [
  {
    id: 'e-net',
    name: 'E-NET',
    type: 'folder',
    isAssociated: false,
    children: [
      {
        id: 'lan',
        name: 'LAN',
        type: 'folder',
        isAssociated: false,
        children: [
          {
            id: 'eb-ntl1-net',
            name: 'EB-NTL1',
            type: 'interface',
            isAssociated: true,
            children: [
              { id: 'sensor-reuniao-1-net', name: 'Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião', type: 'sensor', isAssociated: true },
              { id: 'sensor-reuniao-2-net', name: 'Sensor Reunião 2 (CR-LUMI-RF) [B5:15:A1:65] - Sala de Reunião', type: 'sensor', isAssociated: true },
              { id: 'sensor-conferencia-1-net', name: 'Sensor Conferência 1 (CR-LUMI-RF) [C2:81:5D:9A] - Sala de Conferência', type: 'sensor', isAssociated: true },
              { id: 'sensor-conferencia-2-net', name: 'Sensor Conferência 2 (CR-LUMI-RF) [1D:42:0A:33] - Sala de Conferência', type: 'sensor', isAssociated: true },
              { id: 'sensor-desenvolvimento-net', name: 'Sensor Desenvolvimento (CR-LUMI-RF) [C1:04:EE:38] - Escritório', type: 'sensor', isAssociated: true },
              { id: 'sensor-financeiro-net', name: 'Sensor Financeiro (CR-LUMI-RF) [8D:6B:A0:F2] - Escritório', type: 'sensor', isAssociated: true },
              { id: 'sensor-rh-net', name: 'Sensor RH (CR-LUMI-RF) [D2:14:7B:5F] - Escritório', type: 'sensor', isAssociated: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'controles-rf',
    name: 'Controles CR-KP7-RF',
    type: 'folder',
    isAssociated: false,
    children: [
      { id: 'kp7-reuniao-net', name: 'KP7 Reunião (CR-KP7-RF) [A0:C3:9E:44]', type: 'keypad', isAssociated: true, mac: 'A0:C3:9E:44', signal: 89 },
      { id: 'kp7-conferencia-net', name: 'KP7 Conferência (CR-KP7-RF) [7F:2A:C9:10]', type: 'keypad', isAssociated: true, mac: '7F:2A:C9:10', signal: 81 },
      { id: 'kp7-desenvolvimento-net', name: 'KP7 Desenvolvimento (CR-KP7-RF) [B4:88:3D:E1]', type: 'keypad', isAssociated: true, mac: 'B4:88:3D:E1', signal: 63 },
      { id: 'kp7-financeiro-net', name: 'KP7 Financeiro (CR-KP7-RF) [09:FE:61:AC]', type: 'keypad', isAssociated: true, mac: '09:FE:61:AC', signal: 32 },
      { id: 'kp7-rh-net', name: 'KP7 RH (CR-KP7-RF) [E7:55:B0:19]', type: 'keypad', isAssociated: true, mac: 'E7:55:B0:19', signal: 78 },
    ],
  },
];

function findDeviceById(devices: Device[], id: string): Device | null {
  for (const d of devices) {
    if (d.id === id) return d;
    if (d.children) {
      const found = findDeviceById(d.children, id);
      if (found) return found;
    }
  }
  return null;
}

const INITIAL_HISTORY: TestEntry[] = [
  { id: '1',  horario: '11:50:22', dispositivo: 'KP7 Reunião',     receptor: 'Sensor Reunião',     botao: 'Botão 1', acao: 'Press',   sinal: '89%' },
  { id: '2',  horario: '11:50:22', dispositivo: 'KP7 Reunião',     receptor: 'Sensor Reunião',     botao: 'Botão 1', acao: 'Release', sinal: '92%' },
  { id: '3',  horario: '11:50:23', dispositivo: 'KP7 Reunião',     receptor: 'Sensor RH',          botao: 'Botão 2', acao: 'Press',   sinal: '87%' },
  { id: '4',  horario: '11:50:23', dispositivo: 'KP7 Reunião',     receptor: 'Sensor RH',          botao: 'Botão 2', acao: 'Release', sinal: '90%' },
  { id: '5',  horario: '11:50:33', dispositivo: 'KP7 Conferência', receptor: 'Sensor Conferência', botao: 'Botão 1', acao: 'Press',   sinal: '81%' },
  { id: '6',  horario: '11:50:33', dispositivo: 'KP7 Conferência', receptor: 'Sensor Conferência', botao: 'Botão 1', acao: 'Release', sinal: '79%' },
  { id: '7',  horario: '11:50:34', dispositivo: 'KP7 Conferência', receptor: 'Sensor Conferência', botao: 'Botão 2', acao: 'Press',   sinal: '93%' },
  { id: '8',  horario: '11:50:34', dispositivo: 'KP7 Conferência', receptor: 'Sensor Conferência', botao: 'Botão 2', acao: 'Release', sinal: '84%' },
  { id: '9',  horario: '11:50:56', dispositivo: 'KP7 Desenvolvimento', receptor: 'Sensor Desenvolvimento', botao: 'Botão 1', acao: 'Press',   sinal: '63%' },
  { id: '10', horario: '11:50:56', dispositivo: 'KP7 Desenvolvimento', receptor: 'Sensor Desenvolvimento', botao: 'Botão 1', acao: 'Release', sinal: '54%' },
  { id: '11', horario: '11:50:57', dispositivo: 'KP7 Desenvolvimento', receptor: 'Sensor Desenvolvimento', botao: 'Botão 2', acao: 'Press',   sinal: '52%' },
  { id: '12', horario: '11:50:57', dispositivo: 'KP7 Desenvolvimento', receptor: 'Sensor Desenvolvimento', botao: 'Botão 2', acao: 'Release', sinal: '61%' },
  { id: '13', horario: '11:51:08', dispositivo: 'KP7 Financeiro',  receptor: 'Sensor Financeiro',  botao: 'Botão 1', acao: 'Press',   sinal: '32%' },
  { id: '14', horario: '11:51:08', dispositivo: 'KP7 Financeiro',  receptor: 'Sensor Financeiro',  botao: 'Botão 1', acao: 'Release', sinal: '25%' },
  { id: '15', horario: '11:51:09', dispositivo: 'KP7 Financeiro',  receptor: 'Sensor Financeiro',  botao: 'Botão 2', acao: 'Press',   sinal: '12%' },
  { id: '16', horario: '11:51:09', dispositivo: 'KP7 Financeiro',  receptor: 'Sensor Financeiro',  botao: 'Botão 2', acao: 'Release', sinal: '30%' },
];

export default function ModoTeste() {
  const [viewingNetwork, setViewingNetwork] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Set<string>>(
    new Set(['novo-projeto', 'sala-reuniao', 'sala-conferencia', 'escritorio'])
  );
  const [expandedNetwork, setExpandedNetwork] = useState<Set<string>>(
    new Set(['e-net', 'lan', 'eb-ntl1-net', 'controles-rf'])
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [testHistory, setTestHistory] = useState<TestEntry[]>(INITIAL_HISTORY);
  const [selectionSource, setSelectionSource] = useState<'project' | 'network' | null>(null);

  const currentDevices = viewingNetwork ? networkDevices : projectDevices;
  const currentExpanded = viewingNetwork ? expandedNetwork : expandedProject;
  const setCurrentExpanded = viewingNetwork ? setExpandedNetwork : setExpandedProject;

  const selectedDevice = selectedId
    ? (findDeviceById(projectDevices, selectedId) ?? findDeviceById(networkDevices, selectedId))
    : null;
  const selectedKeypad = selectedDevice?.type === 'keypad' ? selectedDevice : null;

  const toggleExpanded = (id: string) => {
    setCurrentExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Left Panel - Device Tree */}
      <div className="w-[500px] flex flex-col border-r border-[#c8c8c8] shrink-0">
        <div className="bg-[#38404d] h-[31px] px-4 flex items-center overflow-hidden shrink-0">
          <h3 className="text-white text-[15px] font-['Segoe_UI',sans-serif] font-bold uppercase flex-1 min-w-0 overflow-hidden">
            {viewingNetwork ? 'Dispositivos da Rede' : 'Dispositivos do Projeto'}
          </h3>
          <button
            className="border border-[#ce923f] rounded-[6px] px-[9px] py-[4px] h-[25px] flex items-center text-[12px] font-['Segoe_UI',sans-serif] font-bold text-white shrink-0 cursor-pointer"
            onClick={() => setViewingNetwork(v => !v)}
          >
            {viewingNetwork ? 'Visualizar Projeto' : 'Visualizar Rede'}
          </button>
        </div>
        <div className="flex-1 bg-white overflow-auto">
          {currentDevices.map(device => (
            <TreeNode
              key={device.id}
              device={device}
              level={0}
              expanded={currentExpanded}
              onToggle={toggleExpanded}
              onSelect={(d) => { setSelectedId(d.id); setSelectionSource(viewingNetwork ? 'network' : 'project'); }}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>

      {/* Splitter */}
      <div className="w-[4px] bg-[#c8c8c8] shrink-0" />

      {/* Right Panel - Teste de Dispositivo */}
      <div className="flex-1 flex flex-col border border-[#c8c8c8] overflow-hidden min-w-0">
        {/* Sub-header */}
        <div className="bg-[#38404d] h-[31px] px-4 flex items-center shrink-0">
          <h3 className="text-white text-[15px] font-['Segoe_UI',sans-serif] font-bold uppercase">CR-KP7-RF</h3>
        </div>

        {/* Content row */}
        <div className="flex-1 flex items-start overflow-hidden">
          {/* Left: Informações do dispositivo + mockup image */}
          <div className="bg-white flex flex-col gap-[20px] h-full items-center overflow-y-auto px-[20px] py-[35px] shrink-0">
            {/* Informações do dispositivo */}
            <div className="flex flex-col gap-[12px] items-start w-full">
              <p className="text-[#2d9afd] text-[18px] font-['Segoe_UI',sans-serif] leading-normal w-full">
                Informações do dispositivo
              </p>
              <div className="border border-[#cfcfcf] rounded-[6px] flex flex-col gap-[12px] p-[6px] w-full text-[12px] text-black">
                <div className="flex gap-[5px] items-center">
                  <span className="font-['Segoe_UI',sans-serif] font-bold">Nome:</span>
                  <span className="font-['Segoe_UI',sans-serif]">{selectedKeypad ? selectedKeypad.name : '—'}</span>
                </div>
                <div className="flex gap-[5px] items-center h-[16px]">
                  <span className="font-['Segoe_UI',sans-serif] font-bold whitespace-nowrap">Número de série:</span>
                  <span className="font-['Segoe_UI',sans-serif]">{selectedKeypad?.mac ?? '—'}</span>
                </div>
                <div className="flex gap-[5px] items-center">
                  <span className="font-['Segoe_UI',sans-serif] font-bold whitespace-nowrap">Intensidade do sinal:</span>
                  <span className="font-['Segoe_UI',sans-serif]">{selectedKeypad != null ? `${selectedKeypad.signal}%` : '—'}</span>
                </div>
              </div>
            </div>

            {/* Device mockup */}
            <div className="border border-[#707070] rounded-[20px] h-[414px] w-[242px] shrink-0 relative overflow-hidden">
              <img
                src={selectionSource === 'network' && selectedKeypad ? kp7RfVistasBlack : kp7RfVistas}
                alt="CR-KP7-RF"
                className="absolute inset-0 w-full h-full object-cover object-bottom rounded-[20px]"
              />
            </div>
          </div>

          {/* Right: Output / Test history */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-white min-w-0">
            {/* Clear button */}
            <div className="flex items-center justify-end px-[16px] py-[10px] shrink-0">
              <button
                className="bg-gradient-to-b from-[#eee] to-[#d9d9d9] border border-[#b5b5b5] rounded-[2px] h-[25px] px-[12px] flex items-center text-[12px] font-['Segoe_UI',sans-serif] text-[#323232] cursor-pointer"
                onClick={() => setTestHistory([])}
              >
                Limpar histórico
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 border border-[#cfcfcf] rounded-[2px] overflow-hidden mx-[8px] mb-[4px] flex flex-col min-h-0">
              {/* Header row */}
              <div className="flex items-center border-b border-[#ededed] shrink-0 bg-[#c3c3c3]">
                <div className="w-[64px] h-[24px] flex items-center justify-center px-[6px] border-r border-[#ededed] shrink-0">
                  <span className="text-[12px] font-['Segoe_UI',sans-serif] font-bold text-black whitespace-nowrap">Horário</span>
                </div>
                <div className="flex-1 h-[24px] flex items-center px-[6px] border-r border-[#ededed] min-w-0">
                  <span className="text-[12px] font-['Segoe_UI',sans-serif] font-bold text-black whitespace-nowrap">Dispositivo</span>
                </div>
                <div className="flex-1 h-[24px] flex items-center px-[6px] border-r border-[#ededed] min-w-0">
                  <span className="text-[12px] font-['Segoe_UI',sans-serif] font-bold text-black whitespace-nowrap">Receptor</span>
                </div>
                <div className="w-[120px] h-[24px] flex items-center px-[6px] border-r border-[#ededed] shrink-0">
                  <span className="text-[12px] font-['Segoe_UI',sans-serif] font-bold text-black whitespace-nowrap">Ação</span>
                </div>
                <div className="w-[64px] h-[24px] flex items-center justify-center px-[8px] shrink-0">
                  <span className="text-[12px] font-['Segoe_UI',sans-serif] font-bold text-black whitespace-nowrap">Sinal</span>
                </div>
              </div>

              {/* Data rows */}
              <div className="overflow-y-auto flex-1">
                {testHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center border-b border-[#ededed]">
                    <div className="w-[64px] h-[24px] flex items-center justify-center px-[6px] border-r border-[#ededed] shrink-0">
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.horario}</span>
                    </div>
                    <div className="flex-1 h-[24px] flex items-center px-[6px] border-r border-[#ededed] min-w-0">
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.dispositivo}</span>
                    </div>
                    <div className="flex-1 h-[24px] flex items-center px-[6px] border-r border-[#ededed] min-w-0">
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.receptor}</span>
                    </div>
                    <div className="w-[120px] h-[24px] flex items-center gap-[4px] px-[6px] border-r border-[#ededed] shrink-0">
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.botao}</span>
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black">-</span>
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.acao}</span>
                    </div>
                    <div className="w-[64px] h-[24px] flex items-center justify-center px-[8px] shrink-0">
                      <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">{entry.sinal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Tree Components ──────────────────────────────────────────────────────────

interface TreeNodeProps {
  device: Device;
  level: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (device: Device) => void;
  selectedId: string | null;
}

function TreeNode({ device, level, expanded, onToggle, onSelect, selectedId }: TreeNodeProps) {
  const hasChildren = !!(device.children && device.children.length > 0);
  const isExpanded = expanded.has(device.id);
  const isSelected = device.id === selectedId;

  const getTextColor = () => {
    if (device.type === 'project' || device.type === 'room' || device.type === 'folder') {
      return '#000000';
    }
    if (device.isAssociated) return '#007F00';
    return '#000000';
  };

  const backgroundStyle = isSelected
    ? { backgroundColor: '#F5D59D', boxShadow: 'inset 0 0 0 2px #F8E1B9' } // inset: no layout shift
    : {};

  return (
    <div>
      <div
        className="h-[23px] flex items-center gap-1 hover:bg-blue-50 cursor-pointer"
        style={{ paddingLeft: `${6 + level * 12}px`, ...backgroundStyle }}
        onClick={() => onSelect(device)}
      >
        {hasChildren ? (
          <button
            className="w-4 h-4 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onToggle(device.id); }}
          >
            {isExpanded ? (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 1L4 4.5L7 1" stroke="#333" strokeLinecap="round" strokeLinejoin="round" fill="#333" />
              </svg>
            ) : (
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M1 1L5 4L1 7" stroke="#333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ) : (
          <div className="w-4" />
        )}
        <DeviceIcon type={device.type} />
        <span className="text-[12px] font-['Segoe_UI',sans-serif]" style={{ color: getTextColor() }}>
          {device.name}
        </span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {device.children!.map(child => (
            <TreeNode
              key={child.id}
              device={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DeviceIcon({ type }: { type: DeviceType }) {
  const iconMap: Record<DeviceType, string> = {
    project: iconProjeto,
    room: iconAmbientes,
    folder: iconPasta,
    interface: iconInterfaceComunicacao,
    sensor: iconSensores,
    keypad: iconKeypad,
  };

  const src = iconMap[type];
  if (!src) return <div className="w-4 h-4" />;

  return (
    <ImageWithFallback
      src={src}
      alt=""
      className="w-4 h-4 object-contain shrink-0"
    />
  );
}
