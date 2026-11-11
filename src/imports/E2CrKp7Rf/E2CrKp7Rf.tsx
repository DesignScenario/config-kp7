import { useState, useEffect, useRef } from 'react';
import Checkbox from '../../app/components/Checkbox';

// Assets exported from Figma — Embrace Desktop › "E2 - CR-KP7-RF" (node 14348:159567)
import imgCabecalhoTabela from '../icons/cabecalho-tabela.png';
import iconSetaMenuSuspenso from '../icons/seta-menu-suspenso.svg';
import iconKeypad from '../icons/arvore-keypad.svg';
import iconSensores from '../icons/arvore-sensores.svg';
import iconFecharJanela from '../icons/fechar-janela.svg';

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

interface KeypadData {
  mac: string;
  networkId: string;
  sensors: { standard: SensorData; advanced: SensorData[] };
}

export const KEYPADS: KeypadData[] = [
  {
    mac: 'A0:C3:9E:44',
    networkId: 'kp7-reuniao-net',
    sensors: {
      standard: { name: 'Sensor Reunião 1', signal: '87%' },
      advanced: [
        { name: 'Sensor Reunião 1', signal: '87%' },
        { name: 'Sensor Reunião 2', signal: '79%' },
      ],
    },
  },
  {
    mac: '7F:2A:C9:10',
    networkId: 'kp7-conferencia-net',
    sensors: {
      standard: { name: 'Sensor Conferência 1', signal: '94%' },
      advanced: [
        { name: 'Sensor Conferência 1', signal: '94%' },
        { name: 'Sensor Conferência 2', signal: '81%' },
      ],
    },
  },
  {
    mac: 'B4:88:3D:E1',
    networkId: 'kp7-desenvolvimento-net',
    sensors: {
      standard: { name: 'Sensor Desenvolvimento', signal: '90%' },
      advanced: [
        { name: 'Sensor Desenvolvimento', signal: '90%' },
        { name: 'Sensor RH', signal: '78%' },
        { name: 'Sensor Financeiro', signal: '62%' },
      ],
    },
  },
  {
    mac: '09:FE:61:AC',
    networkId: 'kp7-financeiro-net',
    sensors: {
      standard: { name: 'Sensor Financeiro', signal: '86%' },
      advanced: [
        { name: 'Sensor Financeiro', signal: '86%' },
        { name: 'Sensor Desenvolvimento', signal: '75%' },
        { name: 'Sensor RH', signal: '65%' },
      ],
    },
  },
  {
    mac: 'E7:55:B0:19',
    networkId: 'kp7-rh-net',
    sensors: {
      standard: { name: 'Sensor RH', signal: '90%' },
      advanced: [
        { name: 'Sensor RH', signal: '90%' },
        { name: 'Sensor Financeiro', signal: '72%' },
        { name: 'Sensor Desenvolvimento', signal: '57%' },
      ],
    },
  },
  {
    mac: '09:FE:31:AB',
    networkId: 'kp7-extra-net',
    sensors: {
      standard: { name: 'Sensor Financeiro', signal: '86%' },
      advanced: [
        { name: 'Sensor Financeiro', signal: '86%' },
        { name: 'Sensor Desenvolvimento', signal: '75%' },
        { name: 'Sensor RH', signal: '65%' },
      ],
    },
  },
];

const KEYPAD_NETWORK_IDS = KEYPADS.map(kp => kp.networkId);

// Default name shown for a discovered keypad (before rename / association)
const KEYPAD_GENERIC_NAME = 'CR-KP7-RF';

const FONT = "font-['Segoe_UI',sans-serif]";

const getOverlayAssociationsFromBase = (baseAssociations?: Record<string, string>): Record<string, string> => {
  if (!baseAssociations) return {};
  return Object.fromEntries(
    Object.entries(baseAssociations).filter(([networkId]) => KEYPAD_NETWORK_IDS.includes(networkId))
  );
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

// Name of the room ("ambiente") that contains the project device
const findParentRoomName = (devices: Device[], id: string, room?: string): string | undefined => {
  for (const device of devices) {
    if (device.id === id) return room;
    if (device.children) {
      const found = findParentRoomName(device.children, id, device.type === 'room' ? device.name : room);
      if (found) return found;
    }
  }
  return undefined;
};

const BLUE = '#3939FF';
const GREEN = '#007F00';

const mobileKey = (kp: number) => `kp${kp}Mobile`;
const sensorKey = (kp: number, sensor: number) => `kp${kp}Sensor${sensor}`;

// ─── Primitives ──────────────────────────────────────────────────────────────

function E2Button({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      className={`h-[25px] px-3 flex items-center justify-center shrink-0 overflow-clip rounded-[2px] border border-[#b5b5b5] bg-gradient-to-b from-[#eee] to-[#d9d9d9] cursor-pointer text-[12px] leading-normal ${FONT} font-normal text-[#323232] whitespace-nowrap`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const CELL = 'h-6 border-b border-r border-[#ededed] flex items-center overflow-clip';

// ─── Table ───────────────────────────────────────────────────────────────────

function TableHeader() {
  const cell = 'h-full px-[6px] flex items-center overflow-clip border-r border-[#d8d8d8]';
  const text = `text-[12px] leading-normal ${FONT} font-bold text-black whitespace-nowrap`;
  return (
    <div className="sticky top-0 z-10 h-6 shrink-0 flex items-center w-full border-b border-[#c8c8c8] bg-[#ececec]">
      <img alt="" className="absolute inset-0 size-full object-cover pointer-events-none" src={imgCabecalhoTabela} />
      <div className={`relative flex-1 min-w-px ${cell}`}><p className={text}>Keypad RF</p></div>
      <div className={`relative w-[90px] shrink-0 justify-center ${cell}`}><p className={text}>Intensidade</p></div>
      <div className={`relative w-[150px] shrink-0 justify-center ${cell}`}><p className={text}>Associar</p></div>
    </div>
  );
}

interface KeypadRowProps {
  mac: string;
  displayName: string;
  roomName?: string;
  isAssociated: boolean;
  isAvailable: boolean;
  mobileChecked: boolean;
  onMobileChange: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onRename: (name: string) => void;
}

function KeypadRow({ mac, displayName, roomName, isAssociated, isAvailable, mobileChecked, onMobileChange, onDragOver, onDrop, onRename }: KeypadRowProps) {
  const text = `text-[12px] leading-normal ${FONT}`;
  // Linked = green; free row that can receive the KP7 being dragged = blue; otherwise black
  const color = isAssociated ? GREEN : isAvailable ? BLUE : '#000000';
  return (
    <div className="bg-white flex items-center w-full">
      <div className={`${CELL} flex-1 min-w-px gap-1 pl-[6px] pr-[3px]`} onDragOver={onDragOver} onDrop={onDrop}>
        <img src={iconSetaMenuSuspenso} alt="" className="block size-4 shrink-0" />
        <img src={iconKeypad} alt="" className="block size-4 shrink-0" />
        {/* The name stays editable before and after the link (rename only happens in this window) */}
        <span className="flex items-center whitespace-nowrap" style={{ color }}>
          {/* Auto-width input: an invisible copy of the text sets the width and the input
              covers it, so the suffix sits exactly one space after the name */}
          <span className="relative inline-block">
            <span aria-hidden="true" className={`${text} invisible whitespace-pre`}>
              {displayName || ' '}
            </span>
            <input
              className={`${text} absolute inset-0 size-full min-w-0 bg-transparent border-0 p-0 m-0 focus:outline-none`}
              style={{ color }}
              value={displayName}
              onChange={(e) => onRename(e.target.value)}
              // Clicking to rename selects the whole name
              onFocus={(e) => e.currentTarget.select()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            />
          </span>
          <span className={`${text} whitespace-pre`}>
            {' '}{isAssociated ? (roomName ? `(${roomName})` : '') : `[${mac}]`}
          </span>
        </span>
      </div>
      <div className={`${CELL} w-[90px] shrink-0`} />
      <div className={`${CELL} w-[150px] shrink-0 gap-[6px] pl-[67px]`}>
        <Checkbox checked={mobileChecked} onChange={onMobileChange} />
        <span className={`${text} text-black whitespace-nowrap`}>(Móvel)</span>
      </div>
    </div>
  );
}

interface SensorRowProps {
  sensor: SensorData;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

function SensorRow({ sensor, checked, disabled, onChange }: SensorRowProps) {
  const text = `text-[12px] leading-normal ${FONT} text-black whitespace-nowrap`;
  const opacity = disabled ? 0.25 : 1;
  return (
    <div className="bg-white flex items-center w-full">
      <div className={`${CELL} flex-1 min-w-px gap-1 pl-[38px] pr-[3px]`}>
        <img src={iconSensores} alt="" className="block size-4 shrink-0" style={{ opacity }} />
        <span className={text} style={{ opacity }}>{sensor.name}</span>
      </div>
      <div className={`${CELL} w-[90px] shrink-0 justify-center pl-[6px] pr-[3px]`}>
        <span className={text} style={{ opacity }}>{sensor.signal}</span>
      </div>
      <div className={`${CELL} w-[150px] shrink-0 pl-[67px]`}>
        <Checkbox checked={checked} disabled={disabled} onChange={onChange} opacity={opacity} />
      </div>
    </div>
  );
}

interface ConteudoProps {
  visibleDevices: number;
  isAdvancedMode: boolean;
  draggedDevice?: Device | null;
  onDragOver?: (e: React.DragEvent) => void;
  overlayAssociations: Record<string, string>;
  setOverlayAssociations: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  projectDevices?: Device[];
  keypadNames: Record<string, string>;
  onRenameKeypad: (networkId: string, name: string) => void;
  onResetKeypadName: (networkId: string) => void;
}

function Conteudo({ visibleDevices, isAdvancedMode, draggedDevice, onDragOver, overlayAssociations, setOverlayAssociations, projectDevices, keypadNames, onRenameKeypad, onResetKeypadName }: ConteudoProps) {
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});

  const getSensors = (kp: KeypadData) => (isAdvancedMode ? kp.sensors.advanced : [kp.sensors.standard]);

  // "(Móvel)" checks every visible sensor of the keypad and locks them
  const handleMobileChange = (kpIndex: number) => {
    setCheckboxes(prev => ({ ...prev, [mobileKey(kpIndex)]: !prev[mobileKey(kpIndex)] }));
  };

  const handleSensorChange = (kpIndex: number, sensorIndex: number) => {
    if (checkboxes[mobileKey(kpIndex)]) return;
    const key = sensorKey(kpIndex, sensorIndex);
    setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // A row accepts a drop only if it is free and the dragged KP7 is not used elsewhere
  // (one-to-one, same rule as the main tree)
  const canDropOn = (kpIndex: number) =>
    !!draggedDevice &&
    draggedDevice.type === 'keypad' &&
    !overlayAssociations[KEYPADS[kpIndex].networkId] &&
    !Object.values(overlayAssociations).includes(draggedDevice.id);

  const handleDragOver = (kpIndex: number) => (e: React.DragEvent) => {
    if (!canDropOn(kpIndex)) return; // no preventDefault -> "not allowed" cursor
    e.preventDefault();
    onDragOver?.(e);
  };

  const handleDrop = (kpIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedDevice || !canDropOn(kpIndex)) return;
    const networkDeviceId = KEYPADS[kpIndex].networkId;
    setOverlayAssociations(prev => ({ ...prev, [networkDeviceId]: draggedDevice.id }));
    // The linked keypad starts with the KP7 name (it can still be renamed afterwards)
    onResetKeypadName(networkDeviceId);
  };

  const getKeypadDisplayInfo = (kp: KeypadData) => {
    const projectDeviceId = overlayAssociations[kp.networkId];
    const isAssociated = !!projectDeviceId;
    const fallback = keypadNames[kp.networkId]?.trim() || KEYPAD_GENERIC_NAME;
    if (isAssociated && projectDevices) {
      const projectDevice = findProjectDevice(projectDevices, projectDeviceId);
      if (projectDevice) {
        return {
          displayName: keypadNames[kp.networkId] ?? projectDevice.name.replace(/\s*\(CR-KP7-RF\)\s*$/, ''),
          roomName: findParentRoomName(projectDevices, projectDeviceId),
          isAssociated,
        };
      }
    }
    return { displayName: keypadNames[kp.networkId] ?? fallback, roomName: undefined, isAssociated };
  };

  return (
    <div className="flex flex-col w-full">
      <TableHeader />
      {KEYPADS.slice(0, visibleDevices).map((kp, kpIndex) => {
        const { displayName, roomName, isAssociated } = getKeypadDisplayInfo(kp);
        const mobileChecked = !!checkboxes[mobileKey(kpIndex)];
        return (
          <div key={kp.networkId} className="flex flex-col w-full">
            <KeypadRow
              mac={kp.mac}
              displayName={displayName}
              roomName={roomName}
              isAssociated={isAssociated}
              isAvailable={canDropOn(kpIndex)}
              mobileChecked={mobileChecked}
              onMobileChange={() => handleMobileChange(kpIndex)}
              onDragOver={handleDragOver(kpIndex)}
              onDrop={handleDrop(kpIndex)}
              onRename={(name) => onRenameKeypad(kp.networkId, name)}
            />
            {getSensors(kp).map((sensor, sensorIndex) => (
              <SensorRow
                key={sensorIndex}
                sensor={sensor}
                checked={mobileChecked || !!checkboxes[sensorKey(kpIndex, sensorIndex)]}
                disabled={mobileChecked}
                onChange={() => handleSensorChange(kpIndex, sensorIndex)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Window ──────────────────────────────────────────────────────────────────

interface E2CrKp7RfProps {
  visibleDevices?: number;
  onClose?: () => void;
  onConcluir?: (associations: Record<string, string>, keypadNames: Record<string, string>) => void;
  draggedDevice?: Device | null;
  onDragOver?: (e: React.DragEvent) => void;
  projectDevices?: Device[];
  baseAssociations?: Record<string, string>;
  baseKeypadNames?: Record<string, string>;
  onOverlayAssociationsChange?: (associations: Record<string, string>) => void;
}

export default function E2CrKp7Rf({ visibleDevices = KEYPADS.length, onClose, onConcluir, draggedDevice, onDragOver, projectDevices, baseAssociations, baseKeypadNames, onOverlayAssociationsChange }: E2CrKp7RfProps) {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [overlayAssociations, setOverlayAssociations] = useState<Record<string, string>>(() => getOverlayAssociationsFromBase(baseAssociations));
  const [keypadNames, setKeypadNames] = useState<Record<string, string>>(baseKeypadNames || {});
  // Last base state seen, to tell what was done in this window (pending) from what came from the tree
  const prevBaseRef = useRef({ associations: getOverlayAssociationsFromBase(baseAssociations), names: baseKeypadNames || {} });

  // The tree changed while the window is open (link, Desvincular, Desassociar): take the new base,
  // but keep the links and names pending in this window unless they now conflict with the tree
  useEffect(() => {
    const prevBase = prevBaseRef.current;
    const base = getOverlayAssociationsFromBase(baseAssociations);
    const baseNames = baseKeypadNames || {};
    prevBaseRef.current = { associations: base, names: baseNames };
    const newlyLinked = new Set(Object.keys(base).filter(id => base[id] !== prevBase.associations[id]));

    setOverlayAssociations(prev => {
      const next = { ...base };
      const usedKp7 = new Set(Object.values(base));
      for (const [networkId, projectId] of Object.entries(prev)) {
        if (prevBase.associations[networkId] === projectId) continue; // came from the tree, not pending
        if (networkId in next || usedKp7.has(projectId)) continue; // conflicts with a link made in the tree
        next[networkId] = projectId;
        usedKp7.add(projectId);
      }
      return next;
    });

    setKeypadNames(prev => {
      const next = { ...baseNames };
      // Names cleared in this window (link made here) stay cleared
      for (const networkId of Object.keys(prevBase.names)) {
        if (!(networkId in prev)) delete next[networkId];
      }
      // Names typed here survive, except on keypads the tree has just linked (they take the KP7 name)
      for (const [networkId, name] of Object.entries(prev)) {
        if (prevBase.names[networkId] === name || newlyLinked.has(networkId)) continue;
        next[networkId] = name;
      }
      return next;
    });
  }, [baseAssociations, baseKeypadNames]);

  useEffect(() => {
    onOverlayAssociationsChange?.(overlayAssociations);
  }, [overlayAssociations, onOverlayAssociationsChange]);

  return (
    <div className="relative size-full bg-[#f4f4f4] rounded-[8px] overflow-clip flex flex-col" data-name="E2 - CR-KP7-RF">
      {/* e2/cabeçalho-da-janela */}
      <div className="bg-[#1d242c] h-10 px-4 py-2 flex items-center shrink-0">
        <p className={`text-[18px] leading-normal ${FONT} font-bold text-white uppercase whitespace-nowrap`}>CR-KP7-RF</p>
      </div>

      {/* controles rf */}
      <div className="flex-1 min-h-px flex flex-col gap-3 p-3">
        <div className="h-[42px] flex items-center justify-between shrink-0">
          <div className={`flex items-center gap-1 text-[14px] leading-normal ${FONT} font-bold text-black whitespace-nowrap`}>
            <p>Inclusão de CR-KP7-RF</p>
            <p>(Buscando dispositivos...)</p>
          </div>
          <E2Button label={isAdvancedMode ? 'Modo padrão' : 'Modo avançado'} onClick={() => setIsAdvancedMode(v => !v)} />
        </div>

        <div className="relative flex-1 min-h-px flex">
        <div aria-hidden="true" className="absolute inset-0 border border-[#bebebe] pointer-events-none z-20" />
        <div className="e2-scroll flex-1 min-w-px bg-white overflow-y-scroll">
          <Conteudo
            visibleDevices={visibleDevices}
            isAdvancedMode={isAdvancedMode}
            draggedDevice={draggedDevice}
            onDragOver={onDragOver}
            overlayAssociations={overlayAssociations}
            setOverlayAssociations={setOverlayAssociations}
            projectDevices={projectDevices}
            keypadNames={keypadNames}
            onRenameKeypad={(networkId, name) => setKeypadNames(prev => ({ ...prev, [networkId]: name }))}
            onResetKeypadName={(networkId) => setKeypadNames(prev => {
              const next = { ...prev };
              delete next[networkId];
              return next;
            })}
          />
        </div>
        </div>

        <div className="flex items-center justify-end shrink-0">
          <E2Button label="Concluir" onClick={() => onConcluir?.(overlayAssociations, keypadNames)} />
        </div>
      </div>

      {/* e2/ícone/16px/fechar */}
      <button className="absolute right-0 top-1 block size-8 cursor-pointer" onClick={onClose}>
        <img src={iconFecharJanela} alt="Fechar" className="block size-8" />
      </button>

      <div aria-hidden="true" className="absolute inset-0 rounded-[8px] border border-[#bebebe] pointer-events-none" />
    </div>
  );
}
