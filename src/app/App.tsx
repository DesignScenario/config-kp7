import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './components/ImageWithFallback';
import MenuDeContextoCrLumiRf from '../imports/MenuDeContextoCrLumiRf/MenuDeContextoCrLumiRf';
import MenuDeContextoDesvincular from '../imports/MenuDeContextoDesvincular/MenuDeContextoDesvincular';
import MenuDeContextoDesassociar from '../imports/MenuDeContextoDesassociar/MenuDeContextoDesassociar';
import ProgressiveKp7Discovery from './components/ProgressiveKp7Discovery';
import ModoTeste from './components/ModoTeste';

// Import PNG icons - Taskbar
import iconInformacoesDoProjeto from '../imports/informa__es-do-projeto.png';
import iconEstrutura from '../imports/estrutura.png';
import iconEquipamentos from '../imports/equipamentos.png';
import iconProgramacao from '../imports/programa__o.png';
import iconInstalacao from '../imports/instala__o.png';
import iconGerenciamentoDrivers from '../imports/gerenciamento-de-drivers.png';
import iconEnviarProjeto from '../imports/enviar-projeto.png';

// Import PNG icons - Action Menu
import iconModoProgramacao from '../imports/modo-programação.png';
import iconModoTeste from '../imports/modo-teste.png';
import iconZigbee from '../imports/zigbee.png';
import iconProcurarRedes from '../imports/procurar-redes.png';
import iconProcurarDispositivos from '../imports/procurar-dispositivos.png';
import iconAtualizarFirmwares from '../imports/atualizar-firmwares.png';

// Import PNG icons - Tree Devices
import iconProjeto from '../imports/projeto.png';
import iconAmbientes from '../imports/ambientes.png';
import iconInterfaceComunicacao from '../imports/interface-de-comunicação.png';
import iconSensores from '../imports/sensores.png';
import iconKeypad from '../imports/keypad-wifi-2.png';
import iconPasta from '../imports/pasta.png';

type DeviceType = 'project' | 'room' | 'interface' | 'sensor' | 'keypad' | 'folder';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  associatedId?: string;
  mac?: string;
  location?: string;
  isAssociated: boolean;
  children?: Device[];
}

export default function App() {
  const [currentMode, setCurrentMode] = useState<'programacao' | 'teste'>('programacao');
  const [expandedProject, setExpandedProject] = useState<Set<string>>(new Set(['novo-projeto', 'sala-reuniao', 'sala-conferencia', 'escritorio']));
  const [expandedNetwork, setExpandedNetwork] = useState<Set<string>>(new Set(['e-net', 'lan', 'eb-ntl1-net']));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; deviceId: string; type: 'sensor' | 'project' | 'keypad-network' } | null>(null);
  const [removedNetworkKeypads, setRemovedNetworkKeypads] = useState<Set<string>>(new Set());
  const [showOverlay, setShowOverlay] = useState(false);
  const [rfIncluded, setRfIncluded] = useState(false);
  const [associations, setAssociations] = useState<Record<string, string>>({});
  const [keypadCustomNames, setKeypadCustomNames] = useState<Record<string, string>>({});
  const [draggedDevice, setDraggedDevice] = useState<Device | null>(null);
  const [overlayPos, setOverlayPos] = useState({ x: 100, y: 100 });
  const overlayDragRef = useRef<{ mouseX: number; mouseY: number; overlayX: number; overlayY: number } | null>(null);
  const [pendingOverlayAssociations, setPendingOverlayAssociations] = useState<Record<string, string>>({});

  // Close context menu on outside click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  const findDeviceById = (devices: Device[], id: string): Device | null => {
    for (const device of devices) {
      if (device.id === id) return device;
      if (device.children) {
        const found = findDeviceById(device.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentRoom = (devices: Device[], targetId: string): Device | null => {
    for (const device of devices) {
      if (device.type === 'room' && device.children) {
        const found = device.children.find(child => child.id === targetId);
        if (found) return device;
        const nestedFound = findParentRoom(device.children, targetId);
        if (nestedFound) return nestedFound;
      }
      if (device.children) {
        const found = findParentRoom(device.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const isProjectDeviceAssociated = (projectDeviceId: string): boolean => {
    return Object.values(associations).includes(projectDeviceId) ||
           Object.values(pendingOverlayAssociations).includes(projectDeviceId);
  };

  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    overlayDragRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      overlayX: overlayPos.x,
      overlayY: overlayPos.y
    };
    const handleMouseMove = (ev: MouseEvent) => {
      if (overlayDragRef.current) {
        setOverlayPos({
          x: overlayDragRef.current.overlayX + ev.clientX - overlayDragRef.current.mouseX,
          y: overlayDragRef.current.overlayY + ev.clientY - overlayDragRef.current.mouseY
        });
      }
    };
    const handleMouseUp = () => {
      overlayDragRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const getNetworkDeviceIdForProject = (projectDeviceId: string): string | undefined => {
    return Object.keys(associations).find(key => associations[key] === projectDeviceId);
  };

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
            { id: 'eb-ntl1-proj', name: 'EB-NTL1', type: 'interface', isAssociated: true, associatedId: 'eb-ntl1-net' },
            { id: 'sensor-reuniao-1', name: 'Sensor Reunião 1 (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-reuniao-1-net' },
            { id: 'sensor-reuniao-2', name: 'Sensor Reunião 2 (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-reuniao-2-net' },
            { id: 'kp7-reuniao', name: 'KP7 Reunião (CR-KP7-RF)', type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-reuniao'), associatedId: getNetworkDeviceIdForProject('kp7-reuniao') }
          ]
        },
        {
          id: 'sala-conferencia',
          name: 'Sala de Conferência',
          type: 'room',
          isAssociated: false,
          children: [
            { id: 'sensor-conferencia-1', name: 'Sensor Conferência 1 (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-conferencia-1-net' },
            { id: 'sensor-conferencia-2', name: 'Sensor Conferência 2 (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-conferencia-2-net' },
            { id: 'kp7-conferencia', name: 'KP7 Conferência (CR-KP7-RF)', type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-conferencia'), associatedId: getNetworkDeviceIdForProject('kp7-conferencia') }
          ]
        },
        {
          id: 'escritorio',
          name: 'Escritório',
          type: 'room',
          isAssociated: false,
          children: [
            { id: 'sensor-desenvolvimento', name: 'Sensor Desenvolvimento (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-desenvolvimento-net' },
            { id: 'sensor-financeiro', name: 'Sensor Financeiro (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-financeiro-net' },
            { id: 'sensor-rh', name: 'Sensor RH (CR-LUMI-RF)', type: 'sensor', isAssociated: true, associatedId: 'sensor-rh-net' },
            { id: 'kp7-desenvolvimento', name: 'KP7 Desenvolvimento (CR-KP7-RF)', type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-desenvolvimento'), associatedId: getNetworkDeviceIdForProject('kp7-desenvolvimento') },
            { id: 'kp7-rh', name: 'KP7 RH (CR-KP7-RF)', type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-rh'), associatedId: getNetworkDeviceIdForProject('kp7-rh') },
            { id: 'kp7-financeiro', name: 'KP7 Financeiro (CR-KP7-RF)', type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-financeiro'), associatedId: getNetworkDeviceIdForProject('kp7-financeiro') }
          ]
        }
      ]
    }
  ];

  const NETWORK_KEYPAD_GENERIC_NAMES: Record<string, string> = {
    'kp7-reuniao-net': 'Keypad RF 1',
    'kp7-conferencia-net': 'Keypad RF 2',
    'kp7-desenvolvimento-net': 'Keypad RF 3',
    'kp7-financeiro-net': 'Keypad RF 4',
    'kp7-rh-net': 'Keypad RF 5',
  };

  const getDeviceName = (netDeviceId: string, mac: string, baseType: string): string => {
    const customName = keypadCustomNames[netDeviceId]?.trim();
    const genericName = customName || NETWORK_KEYPAD_GENERIC_NAMES[netDeviceId] || baseType;

    const projectDeviceId = associations[netDeviceId];
    if (projectDeviceId) {
      const projectDevice = findDeviceById(projectDevices, projectDeviceId);
      if (projectDevice) {
        const baseName = projectDevice.name.replace(/\s*\(CR-KP7-RF\)\s*$/, '');
        return `${baseName} (${baseType}) [${mac}]`;
      }
    }

    return `${genericName} (${baseType}) [${mac}]`;
  };

  const getNetworkDevices = (): Device[] => {
    const baseDevices: Device[] = [
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
                associatedId: 'eb-ntl1-proj',
                children: [
                  { id: 'sensor-reuniao-1-net', name: 'Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião', type: 'sensor', mac: '5A:9C:2F:B7', location: 'Sala de Reunião', isAssociated: true, associatedId: 'sensor-reuniao-1' },
                  { id: 'sensor-reuniao-2-net', name: 'Sensor Reunião 2 (CR-LUMI-RF) [B5:15:A1:65] - Sala de Reunião', type: 'sensor', mac: 'B5:15:A1:65', location: 'Sala de Reunião', isAssociated: true, associatedId: 'sensor-reuniao-2' },
                  { id: 'sensor-conferencia-1-net', name: 'Sensor Conferência 1 (CR-LUMI-RF) [C2:81:5D:9A] - Sala de Conferência', type: 'sensor', mac: 'C2:81:5D:9A', location: 'Sala de Conferência', isAssociated: true, associatedId: 'sensor-conferencia-1' },
                  { id: 'sensor-conferencia-2-net', name: 'Sensor Conferência 2 (CR-LUMI-RF) [1D:42:0A:33] - Sala de Conferência', type: 'sensor', mac: '1D:42:0A:33', location: 'Sala de Conferência', isAssociated: true, associatedId: 'sensor-conferencia-2' },
                  { id: 'sensor-desenvolvimento-net', name: 'Sensor Desenvolvimento (CR-LUMI-RF) [C1:04:EE:38] - Escritório', type: 'sensor', mac: 'C1:04:EE:38', location: 'Escritório', isAssociated: true, associatedId: 'sensor-desenvolvimento' },
                  { id: 'sensor-financeiro-net', name: 'Sensor Financeiro (CR-LUMI-RF) [8D:6B:A0:F2] - Escritório', type: 'sensor', mac: '8D:6B:A0:F2', location: 'Escritório', isAssociated: true, associatedId: 'sensor-financeiro' },
                  { id: 'sensor-rh-net', name: 'Sensor RH (CR-LUMI-RF) [D2:14:7B:5F] - Escritório', type: 'sensor', mac: 'D2:14:7B:5F', location: 'Escritório', isAssociated: true, associatedId: 'sensor-rh' }
                ]
              }
            ]
          }
        ]
      }
    ];

    if (rfIncluded) {
      baseDevices.push({
        id: 'controles-rf',
        name: 'CONTROLES RF',
        type: 'folder',
        isAssociated: false,
        children: [
          ...([
            {
              id: 'kp7-reuniao-net',
              name: getDeviceName('kp7-reuniao-net', 'A0:C3:9E:44', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: 'A0:C3:9E:44',
              isAssociated: !!associations['kp7-reuniao-net'],
              associatedId: associations['kp7-reuniao-net']
            },
            {
              id: 'kp7-conferencia-net',
              name: getDeviceName('kp7-conferencia-net', '7F:2A:C9:10', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: '7F:2A:C9:10',
              isAssociated: !!associations['kp7-conferencia-net'],
              associatedId: associations['kp7-conferencia-net']
            },
            {
              id: 'kp7-desenvolvimento-net',
              name: getDeviceName('kp7-desenvolvimento-net', 'B4:88:3D:E1', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: 'B4:88:3D:E1',
              isAssociated: !!associations['kp7-desenvolvimento-net'],
              associatedId: associations['kp7-desenvolvimento-net']
            },
            {
              id: 'kp7-financeiro-net',
              name: getDeviceName('kp7-financeiro-net', '09:FE:61:AC', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: '09:FE:61:AC',
              isAssociated: !!associations['kp7-financeiro-net'],
              associatedId: associations['kp7-financeiro-net']
            },
            {
              id: 'kp7-rh-net',
              name: getDeviceName('kp7-rh-net', 'E7:55:B0:19', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: 'E7:55:B0:19',
              isAssociated: !!associations['kp7-rh-net'],
              associatedId: associations['kp7-rh-net']
            }
          ] as Device[]).filter(kp => !removedNetworkKeypads.has(kp.id))
        ]
      });
    }

    return baseDevices;
  };

  const networkDevices = getNetworkDevices();

  const getContextMenuPosition = (x: number, y: number, width: number, height: number) => {
    const padding = 4;
    const maxX = Math.max(padding, window.innerWidth - width - padding);
    const maxY = Math.max(padding, window.innerHeight - height - padding);

    return {
      x: Math.min(Math.max(x, padding), maxX),
      y: Math.min(Math.max(y, padding), maxY)
    };
  };

  const toggleExpanded = (id: string, isProject: boolean) => {
    if (isProject) {
      setExpandedProject(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    } else {
      setExpandedNetwork(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  const handleSelect = (device: Device) => {
    setSelectedId(device.id);
  };

  const getAssociatedId = (id: string): string | null => {
    const findDevice = (devices: Device[]): Device | null => {
      for (const device of devices) {
        if (device.id === id) return device;
        if (device.children) {
          const found = findDevice(device.children);
          if (found) return found;
        }
      }
      return null;
    };

    const device = findDevice([...projectDevices, ...networkDevices]);
    return device?.associatedId || null;
  };

  const isSelected = (id: string): 'primary' | 'secondary' | null => {
    if (id === selectedId) return 'primary';
    const associatedId = getAssociatedId(selectedId || '');
    if (associatedId === id) return 'secondary';
    return null;
  };

  const handleContextMenu = (e: React.MouseEvent, device: Device, isProjectTree: boolean) => {
    e.preventDefault();
    setSelectedId(device.id);

    if (device.type === 'sensor' && !isProjectTree) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 149, 30);
      setContextMenu({ x: position.x, y: position.y, deviceId: device.id, type: 'sensor' });
    } else if (device.type === 'keypad' && isProjectTree && device.isAssociated) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 200, 25);
      setContextMenu({ x: position.x, y: position.y, deviceId: device.id, type: 'project' });
    } else if (device.type === 'keypad' && !isProjectTree) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 78, 30);
      setContextMenu({ x: position.x, y: position.y, deviceId: device.id, type: 'keypad-network' });
    }
  };

  const handleDesassociar = () => {
    if (contextMenu?.type === 'keypad-network') {
      const networkDeviceId = contextMenu.deviceId;
      setAssociations(prev => {
        const next = { ...prev };
        delete next[networkDeviceId];
        return next;
      });
      setRemovedNetworkKeypads(prev => new Set([...prev, networkDeviceId]));
    }
    setContextMenu(null);
  };

  const handleContextMenuClick = () => {
    if (contextMenu?.type === 'sensor') {
      setContextMenu(null);
      setOverlayPos({
        x: Math.max(0, window.innerWidth / 2 - 325),
        y: Math.max(0, window.innerHeight / 2 - 300)
      });
      setPendingOverlayAssociations({});
      setShowOverlay(true);
    }
  };

  const handleUnlink = () => {
    if (contextMenu?.type === 'project') {
      const projectDeviceId = contextMenu.deviceId;
      const networkDeviceId = getNetworkDeviceIdForProject(projectDeviceId);

      if (networkDeviceId) {
        setAssociations(prev => {
          const newAssociations = { ...prev };
          delete newAssociations[networkDeviceId];
          return newAssociations;
        });
      }
    }
    setContextMenu(null);
  };

  const handleConcluir = (overlayAssociations: Record<string, string>) => {
    // Merge overlay associations into main associations
    setAssociations(prev => ({
      ...prev,
      ...overlayAssociations
    }));
    setPendingOverlayAssociations({});
    setRfIncluded(true);
    setShowOverlay(false);
    setExpandedNetwork(prev => {
      const next = new Set(prev);
      next.add('controles-rf');
      return next;
    });
  };

  const handleDragStart = (device: Device) => {
    if (!device.isAssociated) {
      setDraggedDevice(device);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetDevice: Device) => {
    if (draggedDevice && !targetDevice.isAssociated && draggedDevice.type === targetDevice.type) {
      setAssociations(prev => ({
        ...prev,
        [targetDevice.id]: draggedDevice.id
      }));
    }
    setDraggedDevice(null);
  };

  return (
    <div className="h-screen flex flex-col bg-white font-['Segoe_UI',sans-serif]">
      {/* Top Bar */}
      <div className="bg-[#f3f3f3] h-[23px] px-2 flex items-center justify-between border-b border-[#cfcfcf]">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-gradient-to-br from-white to-[#c5c5c4] rounded-[3.5px] border border-[#b8b6b6] flex items-center justify-center">
            <span className="text-[#d9992c] text-[6px] font-bold">E2</span>
          </div>
          <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black">Scenario Config Embrace</span>
        </div>
        <button className="w-4 h-4 flex items-center justify-center hover:bg-gray-200">
          <span className="text-[#9b9b9b] text-xs">×</span>
        </button>
      </div>

      {/* Menu Bar */}
      <div className="bg-white border-b border-gray-300 px-2 py-1 flex items-center justify-between h-[25px]">
        <div className="flex gap-0.5">
          <button className="px-2 py-1 text-[12px] font-['Segoe_UI',sans-serif] hover:bg-gray-100">Arquivo</button>
          <button className="px-2 py-1 text-[12px] font-['Segoe_UI',sans-serif] hover:bg-gray-100">Preferências</button>
          <button className="px-2 py-1 text-[12px] font-['Segoe_UI',sans-serif] hover:bg-gray-100">Sistema</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-['Segoe_UI',sans-serif]">Login designscenario1@gmail.com:design01@scenario.ind.br</span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-['Segoe_UI:Bold',sans-serif] uppercase">Embrace Assistant</span>
            <div className="w-[43px] h-6 bg-[#eee5c9] border border-[#acaba8] rounded-full relative">
              <div className="absolute w-6 h-6 bg-white border border-[#aaa] rounded-full left-0 top-0"></div>
            </div>
            <span className="text-[11px] font-['Segoe_UI',sans-serif]">OFF</span>
          </div>
        </div>
      </div>

      {/* Task Bar */}
      <div className="bg-[#ececec] border-b border-[#cfcfcf] h-[70px] flex items-center justify-between">
        <div className="flex gap-[2px] h-full">
          <TaskButton icon="info" label="Informações do Projeto" />
          <TaskButton icon="structure" label="Estrutura" />
          <TaskButton icon="equipment" label="Equipamentos" />
          <TaskButton icon="programming" label="Programação" />
          <TaskButton icon="installation" label="Instalação" active />
          <TaskButton icon="drivers" label="Gerenciamento de Drivers" />
          <TaskButton icon="send" label="Enviar Projeto" />
        </div>
        <div className="flex items-center gap-[10px] pr-[33px] h-full">
          <span className="text-[12px] font-['Segoe_UI:Bold',sans-serif] text-right uppercase">Embrace Assistant</span>
          <div className="relative h-[40px] w-[43px]">
            <div className="absolute top-[25px] text-center w-full">
              <p className="text-[11px] font-['Segoe_UI',sans-serif]">OFF</p>
            </div>
            <button className="absolute top-0 left-0 w-full h-[25px]">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 25">
                <rect fill="#EEE5C9" height="22" rx="11" stroke="#ACABA8" width="42" x="0.5" y="1.5" />
                <circle cx="12.5" cy="12.5" fill="white" r="12" stroke="#AAAAAA" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Installation Header */}
      <div className="bg-[#1d242c] h-10 px-4 flex items-center">
        <h1 className="text-white text-[18px] font-['Segoe_UI:Bold',sans-serif] uppercase">Instalação</h1>
      </div>

      {/* Tabs */}
      <div className="bg-[#ddd] border-b border-[#b5b5b5] px-1 pt-1 flex gap-px">
        <Tab label="Informações" />
        <Tab label="Configurações" />
        <Tab label="Rede" active />
        <Tab label="Licença" />
      </div>

      {/* Action Buttons */}
      <div className="bg-[#f4f4f4] px-1 py-1 flex gap-1 h-[51px] items-center border-b border-gray-300">
        <ActionButton icon="modo-programacao" label="Modo Programação" active={currentMode === 'programacao'} onClick={() => setCurrentMode('programacao')} />
        <ActionButton icon="modo-teste" label="Modo Teste" active={currentMode === 'teste'} onClick={() => setCurrentMode('teste')} />
        <ActionButton icon="zigbee" label="Zigbee" />
        <div className="w-px h-10 bg-[#cfcfcf]"></div>
        <ActionButton icon="procurar-redes" label="Procurar Redes" />
        <ActionButton icon="procurar-dispositivos" label="Procurar dispositivos" />
        <ActionButton icon="atualizar-firmwares" label="Atualizar Firmwares" />
      </div>

      {/* Mode Header */}
      <div className="bg-[#1d242c] h-8 px-4 flex items-center">
        <h2 className="text-white text-[15px] font-['Segoe_UI:Bold',sans-serif] uppercase">
          {currentMode === 'programacao' ? 'Modo Programação' : 'Modo Teste'}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden border-t border-[#c8c8c8]">
        {currentMode === 'teste' && <ModoTeste />}
        {currentMode === 'programacao' && /* Left Panel - Dispositivos do Projeto */ true && <>
        <div className="w-1/2 flex flex-col border-r border-[#c8c8c8]">
          <div className="bg-[#38404d] h-[31px] px-4 flex items-center">
            <h3 className="text-white text-[15px] font-['Segoe_UI:Bold',sans-serif] uppercase">Dispositivos do Projeto</h3>
          </div>
          <div className="flex-1 bg-white overflow-auto">
            {projectDevices.map(device => (
              <TreeNode
                key={device.id}
                device={device}
                level={0}
                expanded={expandedProject}
                onToggle={(id) => toggleExpanded(id, true)}
                onSelect={handleSelect}
                selectionState={isSelected(device.id)}
                isSelected={isSelected}
                onDragStart={handleDragStart}
                isDraggable={true}
                onContextMenu={(e, dev) => handleContextMenu(e, dev, true)}
                isProjectTree={true}
              />
            ))}
          </div>
        </div>

        {/* Splitter */}
        <div className="w-1 bg-[#c8c8c8]"></div>

        {/* Right Panel - Dispositivos da Rede */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-[#38404d] h-[31px] px-4 flex items-center">
            <h3 className="text-white text-[15px] font-['Segoe_UI:Bold',sans-serif] uppercase">Dispositivos da Rede</h3>
          </div>
          <div className="flex-1 bg-white overflow-auto">
            {networkDevices.map(device => (
              <TreeNode
                key={device.id}
                device={device}
                level={0}
                expanded={expandedNetwork}
                onToggle={(id) => toggleExpanded(id, false)}
                onSelect={handleSelect}
                selectionState={isSelected(device.id)}
                isSelected={isSelected}
                onContextMenu={(e, dev) => handleContextMenu(e, dev, false)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDropTarget={true}
                isProjectTree={false}
              />
            ))}
          </div>
        </div>
        </>}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#cfcfcf] px-2 py-0.5 flex justify-between text-[12px] font-['Segoe_UI',sans-serif] h-6">
        <div className="flex gap-4">
          <span className="border-r border-[#cfcfcf] pr-4">Versão 2.15.5 Build(6)</span>
          <span className="border-r border-[#cfcfcf] pr-4">Status conexão: Local</span>
          <span className="border-r border-[#cfcfcf] pr-4">Instalação: Nome do projeto</span>
        </div>
        <span>Nenhuma notificação</span>
      </div>

      {/* Context Menu */}
      {contextMenu && contextMenu.type === 'sensor' && (
        <div
          className="fixed z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={handleContextMenuClick}
        >
          <MenuDeContextoCrLumiRf />
        </div>
      )}

      {contextMenu && contextMenu.type === 'project' && (
        <div
          className="fixed z-50 w-[200px] h-[25px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={handleUnlink}
        >
          <MenuDeContextoDesvincular />
        </div>
      )}

      {contextMenu && contextMenu.type === 'keypad-network' && (
        <div
          className="fixed z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={handleDesassociar}
        >
          <MenuDeContextoDesassociar />
        </div>
      )}

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed z-50"
          style={{ left: overlayPos.x, top: overlayPos.y, width: 650, height: 600, pointerEvents: 'auto' }}
        >
          {/* Drag handle covers the header area, leaving the close button accessible */}
          <div
            className="absolute top-0 left-0 h-[40px] cursor-move z-10"
            style={{ width: 'calc(100% - 40px)' }}
            onMouseDown={handleOverlayMouseDown}
          />
          <ProgressiveKp7Discovery
            onClose={() => { setShowOverlay(false); setPendingOverlayAssociations({}); }}
            onConcluir={handleConcluir}
            projectDevices={projectDevices}
            baseAssociations={associations}
            keypadNames={keypadCustomNames}
            onKeypadNamesChange={setKeypadCustomNames}
            draggedDevice={draggedDevice}
            onDragOver={handleDragOver}
            onOverlayAssociationsChange={setPendingOverlayAssociations}
          />
        </div>
      )}
    </div>
  );
}

interface TreeNodeProps {
  device: Device;
  level: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (device: Device) => void;
  selectionState: 'primary' | 'secondary' | null;
  isSelected: (id: string) => 'primary' | 'secondary' | null;
  onContextMenu?: (e: React.MouseEvent, device: Device) => void;
  onDragStart?: (device: Device) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (device: Device) => void;
  isDraggable?: boolean;
  isDropTarget?: boolean;
  isProjectTree?: boolean;
}

function TreeNode({ device, level, expanded, onToggle, onSelect, selectionState, isSelected, onContextMenu, onDragStart, onDragOver, onDrop, isDraggable, isDropTarget, isProjectTree }: TreeNodeProps) {
  const hasChildren = device.children && device.children.length > 0;
  const isExpanded = expanded.has(device.id);

  const getTextColor = () => {
    if (device.type === 'project' || device.type === 'room' || device.type === 'folder') {
      return '#000000';
    }
    if (device.isAssociated) {
      return '#007F00';
    }
    return '#3939FF';
  };

  const getBackgroundStyle = () => {
    if (selectionState === 'primary') {
      return {
        backgroundColor: '#F5D59D',
        border: '2px solid #F8E1B9',
        margin: '-2px'
      };
    }
    if (selectionState === 'secondary') {
      return {
        backgroundColor: '#DEDEDE'
      };
    }
    return {};
  };

  const canDrag = isDraggable && !device.isAssociated && device.type !== 'project' && device.type !== 'room' && device.type !== 'folder';
  const canDrop = isDropTarget && !device.isAssociated && device.type !== 'project' && device.type !== 'room' && device.type !== 'folder';

  return (
    <div>
      <div
        className="h-[23px] flex items-center gap-1 hover:bg-blue-50 cursor-pointer"
        style={{
          paddingLeft: `${6 + level * 12}px`,
          ...getBackgroundStyle()
        }}
        onClick={() => onSelect(device)}
        onContextMenu={(e) => onContextMenu?.(e, device)}
        draggable={canDrag}
        onDragStart={(e) => {
          if (canDrag && onDragStart) {
            onDragStart(device);
          }
        }}
        onDragOver={(e) => {
          if (canDrop && onDragOver) {
            onDragOver(e);
          }
        }}
        onDrop={(e) => {
          if (canDrop && onDrop) {
            e.preventDefault();
            onDrop(device);
          }
        }}
      >
        {hasChildren ? (
          <button
            className="w-4 h-4 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(device.id);
            }}
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
              selectionState={isSelected(child.id)}
              isSelected={isSelected}
              onContextMenu={onContextMenu}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              isDraggable={isDraggable}
              isDropTarget={isDropTarget}
              isProjectTree={isProjectTree}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DeviceIcon({ type }: { type: DeviceType }) {
  const getIconSrc = () => {
    switch (type) {
      case 'project':
        return iconProjeto;
      case 'room':
        return iconAmbientes;
      case 'folder':
        return iconPasta;
      case 'interface':
        return iconInterfaceComunicacao;
      case 'sensor':
        return iconSensores;
      case 'keypad':
        return iconKeypad;
      default:
        return null;
    }
  };

  const iconSrc = getIconSrc();
  if (!iconSrc) return <div className="w-4 h-4" />;

  return (
    <ImageWithFallback
      src={iconSrc}
      alt=""
      className="w-4 h-4 object-contain"
    />
  );
}

interface TaskButtonProps {
  icon: string;
  label: string;
  active?: boolean;
}

function TaskButton({ icon, label, active }: TaskButtonProps) {
  return (
    <div className={`w-[120px] h-full relative overflow-clip ${
      active ? 'bg-gradient-to-b from-[#f5ad7d] to-[#f5d59d]' : ''
    }`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[2px] w-[94px]">
        <div className="relative shrink-0 size-[32px]">
          <TaskIcon type={icon} />
        </div>
        <p className="font-['Segoe_UI',sans-serif] text-[12px] text-black text-center leading-normal min-w-full">{label}</p>
      </div>
      {active && (
        <div className="absolute inset-0 border border-[#d8973e] pointer-events-none" />
      )}
    </div>
  );
}

function TaskIcon({ type }: { type: string }) {
  const getIconSrc = () => {
    switch (type) {
      case 'info':
        return iconInformacoesDoProjeto;
      case 'structure':
        return iconEstrutura;
      case 'equipment':
        return iconEquipamentos;
      case 'programming':
        return iconProgramacao;
      case 'installation':
        return iconInstalacao;
      case 'drivers':
        return iconGerenciamentoDrivers;
      case 'send':
        return iconEnviarProjeto;
      default:
        return null;
    }
  };

  const iconSrc = getIconSrc();

  if (!iconSrc) return null;

  return (
    <ImageWithFallback
      src={iconSrc}
      alt=""
      className="absolute inset-0 size-full object-contain"
    />
  );
}

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={`px-1.5 py-1 text-[12px] font-['Segoe_UI',sans-serif] rounded-t-sm border border-[#b5b5b5] ${
      active ? 'bg-[#f4f4f4] border-b-0' : 'bg-gradient-to-b from-[#eee] to-[#d9d9d9]'
    }`}>
      <span className="text-[#323232]">{label}</span>
    </div>
  );
}

function ActionButton({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`h-[42px] w-[120px] px-2 flex items-center gap-1 cursor-pointer ${
        active
          ? 'bg-gradient-to-b from-[#f5ad7d] to-[#f5d59d] border border-[#d8973e] shadow-[0px_1px_1px_0px_rgba(216,151,62,0.5)]'
          : 'border border-transparent shadow-[0px_1px_0.5px_rgba(201,207,210,0.5)]'
      }`}
      onClick={onClick}
    >
      <div className="w-7 h-7 relative shrink-0">
        <ActionIcon type={icon} />
      </div>
      <span className="text-[11px] font-['Segoe_UI',sans-serif] text-black leading-[16px] flex-1">{label}</span>
    </div>
  );
}

function ActionIcon({ type }: { type: string }) {
  const getIconSrc = () => {
    switch (type) {
      case 'modo-programacao':
        return iconModoProgramacao;
      case 'modo-teste':
        return iconModoTeste;
      case 'zigbee':
        return iconZigbee;
      case 'procurar-redes':
        return iconProcurarRedes;
      case 'procurar-dispositivos':
        return iconProcurarDispositivos;
      case 'atualizar-firmwares':
        return iconAtualizarFirmwares;
      default:
        return null;
    }
  };

  const iconSrc = getIconSrc();
  if (!iconSrc) return null;

  return (
    <ImageWithFallback
      src={iconSrc}
      alt=""
      className="absolute inset-0 size-full object-contain"
    />
  );
}
