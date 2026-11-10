import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './components/ImageWithFallback';
import ProgressiveKp7Discovery from './components/ProgressiveKp7Discovery';
import ModoTeste from './components/ModoTeste';
import ContextMenu from './components/ContextMenu';

// Window chrome (SVGs exported from Figma — Embrace Desktop)
import iconLogoMercado from '../imports/icons/logo-mercado.svg';
import iconFechar from '../imports/icons/fechar-16.svg';
import iconToggleOn from '../imports/icons/toggle-on.svg';
import iconColapsarExpandir from '../imports/icons/colapsar-expandir.svg';
import iconCheckboxOff from '../imports/icons/checkbox-off.svg';
import iconSetaMenuSuspenso from '../imports/icons/seta-menu-suspenso.svg';

// Taskbar icons (32px)
import iconInformacoesDoProjeto from '../imports/icons/tarefa-informacoes-do-projeto.svg';
import iconEstrutura from '../imports/icons/tarefa-estrutura.svg';
import iconEquipamentos from '../imports/icons/tarefa-equipamentos.svg';
import iconProgramacao from '../imports/icons/tarefa-programacao.svg';
import iconInstalacao from '../imports/icons/tarefa-instalacao.svg';
import iconGerenciamentoDrivers from '../imports/icons/tarefa-gerenciamento-de-drivers.svg';
import iconEnviarProjeto from '../imports/icons/tarefa-enviar-projeto.svg';

// Action menu icons (28px)
import iconModoProgramacao from '../imports/icons/acao-modo-programacao.svg';
import iconModoTeste from '../imports/icons/acao-modo-teste.svg';
import iconZigbee from '../imports/icons/acao-zigbee.svg';
import iconProcurarRedes from '../imports/icons/acao-procurar-redes.svg';
import iconProcurarDispositivos from '../imports/icons/acao-procurar-dispositivos.svg';
import iconAtualizarFirmwares from '../imports/icons/acao-atualizar-firmwares.svg';

// Tree icons (16px)
import iconProjeto from '../imports/icons/arvore-projeto.svg';
import iconAmbientes from '../imports/icons/arvore-ambientes.svg';
import iconInterfaceComunicacao from '../imports/icons/arvore-interface-de-comunicacao.svg';
import iconSensores from '../imports/icons/arvore-sensores.svg';
import iconKeypad from '../imports/icons/arvore-keypad.svg';
import iconPasta from '../imports/icons/arvore-pasta.svg';

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
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; deviceId: string; type: 'inclusion' | 'project' | 'keypad-network' } | null>(null);
  const [removedNetworkKeypads, setRemovedNetworkKeypads] = useState<Set<string>>(new Set());
  const [showOverlay, setShowOverlay] = useState(false);
  const [rfIncluded, setRfIncluded] = useState(false);
  const [associations, setAssociations] = useState<Record<string, string>>({});
  const [keypadCustomNames, setKeypadCustomNames] = useState<Record<string, string>>({});
  // Names given to project KP7s by renaming their linked keypad in the CR-KP7-RF window
  const [projectKp7Names, setProjectKp7Names] = useState<Record<string, string>>({});
  const [draggedDevice, setDraggedDevice] = useState<Device | null>(null);
  const [overlayPos, setOverlayPos] = useState({ x: 100, y: 100 });
  const overlayDragRef = useRef<{ mouseX: number; mouseY: number; overlayX: number; overlayY: number } | null>(null);
  const [pendingOverlayAssociations, setPendingOverlayAssociations] = useState<Record<string, string>>({});

  // Esc closes the context menu, or cancels the inclusion window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (contextMenu) setContextMenu(null);
      else if (showOverlay) closeOverlay();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [contextMenu, showOverlay]);

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

  const kp7Name = (id: string, defaultName: string) => `${projectKp7Names[id] ?? defaultName} (CR-KP7-RF)`;

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
            { id: 'kp7-reuniao', name: kp7Name('kp7-reuniao', 'KP7 Reunião'), type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-reuniao'), associatedId: getNetworkDeviceIdForProject('kp7-reuniao') }
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
            { id: 'kp7-conferencia', name: kp7Name('kp7-conferencia', 'KP7 Conferência'), type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-conferencia'), associatedId: getNetworkDeviceIdForProject('kp7-conferencia') }
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
            { id: 'kp7-desenvolvimento', name: kp7Name('kp7-desenvolvimento', 'KP7 Desenvolvimento'), type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-desenvolvimento'), associatedId: getNetworkDeviceIdForProject('kp7-desenvolvimento') },
            { id: 'kp7-rh', name: kp7Name('kp7-rh', 'KP7 RH'), type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-rh'), associatedId: getNetworkDeviceIdForProject('kp7-rh') },
            { id: 'kp7-financeiro', name: kp7Name('kp7-financeiro', 'KP7 Financeiro'), type: 'keypad', isAssociated: isProjectDeviceAssociated('kp7-financeiro'), associatedId: getNetworkDeviceIdForProject('kp7-financeiro') }
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
    'kp7-extra-net': 'Keypad RF 6',
  };

  const getDeviceName = (netDeviceId: string, mac: string, baseType: string): string => {
    // Priority: name typed in the CR-KP7-RF window (also allowed after the link),
    // then the linked project KP7 name, then the generic "Keypad RF N"
    const customName = keypadCustomNames[netDeviceId]?.trim();
    if (customName) return `${customName} (${baseType}) [${mac}]`;
    const genericName = NETWORK_KEYPAD_GENERIC_NAMES[netDeviceId] || baseType;

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

  const hasProjectKeypad = (devices: Device[]): boolean =>
    devices.some(d => d.type === 'keypad' || (!!d.children && hasProjectKeypad(d.children)));

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

    // The "Controles CR-KP7-RF" folder is shown whenever the project has at least one KP7;
    // its keypads only appear after an inclusion ("Concluir" in the CR-KP7-RF window)
    if (hasProjectKeypad(projectDevices)) {
      baseDevices.push({
        id: 'controles-rf',
        name: 'Controles CR-KP7-RF',
        type: 'folder',
        isAssociated: false,
        children: !rfIncluded ? [] : [
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
            },
            {
              id: 'kp7-extra-net',
              name: getDeviceName('kp7-extra-net', '09:FE:31:AB', 'CR-KP7-RF'),
              type: 'keypad' as const,
              mac: '09:FE:31:AB',
              isAssociated: !!associations['kp7-extra-net'],
              associatedId: associations['kp7-extra-net']
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

    // Menu sizes (Figma): 25px item + 4px top/bottom padding; width follows the label
    if (!isProjectTree && (device.type === 'sensor' || device.id === 'controles-rf')) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 145, 33);
      setContextMenu({ x: position.x, y: position.y, deviceId: device.id, type: 'inclusion' });
    } else if (device.type === 'keypad' && isProjectTree && device.isAssociated) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 90, 33);
      setContextMenu({ x: position.x, y: position.y, deviceId: device.id, type: 'project' });
    } else if (device.type === 'keypad' && !isProjectTree) {
      const position = getContextMenuPosition(e.clientX, e.clientY, 90, 33);
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
      // Removing the keypad from the network also forgets its custom name;
      // a new inclusion (discovery) brings it back as a fresh device.
      setKeypadCustomNames(prev => {
        const next = { ...prev };
        delete next[networkDeviceId];
        return next;
      });
      setRemovedNetworkKeypads(prev => new Set([...prev, networkDeviceId]));
      if (selectedId === networkDeviceId) setSelectedId(null);
    }
    setContextMenu(null);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setPendingOverlayAssociations({});
  };

  const changeMode = (mode: 'programacao' | 'teste') => {
    if (mode !== 'programacao') {
      closeOverlay();
      setContextMenu(null);
    }
    setCurrentMode(mode);
  };

  const handleContextMenuClick = () => {
    if (contextMenu?.type === 'inclusion') {
      setContextMenu(null);
      setOverlayPos({
        x: Math.max(0, window.innerWidth / 2 - 325),
        y: Math.max(0, window.innerHeight / 2 - 325)
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

  const handleConcluir = (overlayAssociations: Record<string, string>, overlayKeypadNames: Record<string, string>) => {
    // Merge overlay associations into main associations
    setAssociations(prev => ({
      ...prev,
      ...overlayAssociations
    }));
    // Renames made in the window only take effect on "Concluir" (closing with X discards them).
    // A linked keypad's name is the project KP7's name: renaming it renames the KP7 (project
    // and network). Free keypads keep the name only as their network device name.
    const merged = { ...associations, ...overlayAssociations };
    const networkNames: Record<string, string> = {};
    const kp7Renames: Record<string, string> = {};
    for (const [networkId, name] of Object.entries(overlayKeypadNames)) {
      const projectId = merged[networkId];
      if (!projectId) networkNames[networkId] = name;
      else if (name.trim()) kp7Renames[projectId] = name.trim();
    }
    setKeypadCustomNames(networkNames);
    setProjectKp7Names(prev => ({ ...prev, ...kp7Renames }));
    // Every keypad found by the discovery is (re)included in the network,
    // including ones previously removed with "Desassociar"
    setRemovedNetworkKeypads(new Set());
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

  // Drag ended anywhere (including outside a valid target): forget the dragged device
  const handleDragEnd = () => setDraggedDevice(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetDevice: Device) => {
    if (draggedDevice && !targetDevice.isAssociated && draggedDevice.type === targetDevice.type) {
      setAssociations(prev => ({
        ...prev,
        [targetDevice.id]: draggedDevice.id
      }));
      // A newly linked keypad takes the KP7 name (it can be renamed later in the CR-KP7-RF window)
      setKeypadCustomNames(prev => {
        const next = { ...prev };
        delete next[targetDevice.id];
        return next;
      });
    }
    setDraggedDevice(null);
  };

  return (
    <div className="h-screen flex flex-col bg-white font-['Segoe_UI',sans-serif]">
      {/* Top Bar — e2/barra/barra-superior */}
      <div className="bg-[#f3f3f3] h-[23px] px-2 py-[6px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-[6px]">
          <img src={iconLogoMercado} alt="" className="block size-4 shrink-0" />
          <span className="text-[12px] font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">Scenario Config Embrace</span>
        </div>
        <button className="block size-4 shrink-0 cursor-pointer">
          <img src={iconFechar} alt="Fechar" className="block size-4" />
        </button>
      </div>

      {/* Menu Bar — e2/barra/barra-de-menu */}
      <div className="bg-white px-2 flex items-center justify-between h-[25px] shrink-0">
        <div className="flex items-center gap-[2px]">
          <MenuButton label="Arquivo" />
          <MenuButton label="Preferências" />
          <MenuButton label="Sistema" />
        </div>
        <MenuButton label="Login designscenario1@gmail.com:design01@scenario.ind.br" />
      </div>

      {/* Task Bar — e2/barra/barra-de-tarefas */}
      <div className="bg-[#ececec] border-r border-[#cfcfcf] h-[70px] pr-[2px] flex items-center gap-[46px] shrink-0">
        <div className="flex gap-[2px] h-full items-center">
          <TaskButton icon="info" label="Informações do Projeto" />
          <TaskButton icon="structure" label="Estrutura" />
          <TaskButton icon="equipment" label="Equipamentos" />
          <TaskButton icon="programming" label="Programação" />
          <TaskButton icon="installation" label="Instalação" active />
          <TaskButton icon="drivers" label="Gerenciamento de Drivers" />
          <TaskButton icon="send" label="Enviar Projeto" />
        </div>
        <div className="relative flex flex-1 min-w-px h-full items-center justify-end gap-[10px] pr-[33px] overflow-clip">
          <div className="flex flex-1 min-w-px max-w-[120px] items-center justify-end gap-[12px] overflow-clip">
            <p className="flex-1 min-w-px text-right text-[9px] leading-normal font-['Segoe_UI',sans-serif] font-bold uppercase text-black">
              Embrace Assistant
            </p>
            <div className="flex flex-col items-center shrink-0">
              <button className="block h-[25px] w-[43px] cursor-pointer">
                <img src={iconToggleOn} alt="" className="block h-[25px] w-[43px]" />
              </button>
              <p className="text-[11px] leading-normal font-['Segoe_UI',sans-serif] text-black text-center">ON</p>
            </div>
          </div>
          <button className="absolute bottom-0 right-0 block size-[23px] cursor-pointer">
            <img src={iconColapsarExpandir} alt="Colapsar" className="block size-[23px]" />
          </button>
        </div>
      </div>

      {/* Installation Header — e2/cabeçalho-da-janela */}
      <div className="bg-[#1d242c] h-10 px-4 py-2 flex items-center shrink-0">
        <h1 className="text-white text-[18px] leading-normal font-['Segoe_UI',sans-serif] font-bold uppercase">Instalação</h1>
      </div>

      {/* Tabs — e2/menu-de-abas */}
      <div className="bg-[#ddd] border-b border-[#b5b5b5] h-[29px] pl-[5px] pt-1 flex items-end gap-px shrink-0">
        <Tab label="Informações" />
        <Tab label="Configurações" />
        <Tab label="Rede" active />
        <Tab label="Licença" />
      </div>

      {/* Action Buttons — menu de ações */}
      <div className="bg-[#f4f4f4] h-[51px] pl-1 pt-[5px] flex items-start shrink-0">
        <div className="flex items-center gap-[7px]">
          <div className="flex items-center gap-1">
            <ActionButton icon="modo-programacao" label="Modo Programação" active={currentMode === 'programacao'} onClick={() => changeMode('programacao')} />
            <ActionButton icon="modo-teste" label="Modo Teste" active={currentMode === 'teste'} onClick={() => changeMode('teste')} />
            <ActionButton icon="zigbee" label="Zigbee" />
          </div>
          <div className="w-px h-[42px] bg-[#cfcfcf] shrink-0" />
          <div className="flex items-center gap-1">
            <ActionButton icon="procurar-redes" label={'Procurar\nRedes'} />
            <ActionButton icon="procurar-dispositivos" label="Procurar dispositivos" />
            <ActionButton icon="atualizar-firmwares" label={'Atualizar\nFirmwares'} />
          </div>
        </div>
      </div>

      {/* Mode Header — e2/cabeçalho-da-janela */}
      <div className="bg-[#1d242c] h-8 px-4 py-2 flex items-center shrink-0">
        <h2 className="text-white text-[15px] leading-normal font-['Segoe_UI',sans-serif] font-bold uppercase">
          {currentMode === 'programacao' ? 'Modo Programação' : 'Modo Teste'}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {currentMode === 'teste' && <ModoTeste />}
        {currentMode === 'programacao' && <>
        {/* Left Panel - Dispositivos do Projeto */}
        <div className="relative flex-1 min-w-0 flex flex-col">
          <div aria-hidden="true" className="absolute inset-0 border border-[#c8c8c8] pointer-events-none z-10" />
          <div className="bg-[#38404d] h-[31px] px-4 py-2 flex items-center shrink-0 overflow-clip">
            <h3 className="text-white text-[15px] leading-normal font-['Segoe_UI',sans-serif] font-bold uppercase">Dispositivos do Projeto</h3>
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
                onDragEnd={handleDragEnd}
                isDraggable={true}
                onContextMenu={(e, dev) => handleContextMenu(e, dev, true)}
                isProjectTree={true}
              />
            ))}
          </div>
        </div>

        {/* Splitter — e2/splitter */}
        <div className="w-1 shrink-0 bg-[#c8c8c8]"></div>

        {/* Right Panel - Dispositivos da Rede */}
        <div className="relative flex-1 min-w-0 flex flex-col">
          <div aria-hidden="true" className="absolute inset-0 border border-[#c8c8c8] pointer-events-none z-10" />
          <div className="bg-[#38404d] h-[31px] px-4 py-2 flex items-center shrink-0 overflow-clip">
            <h3 className="text-white text-[15px] leading-normal font-['Segoe_UI',sans-serif] font-bold uppercase">Dispositivos da Rede</h3>
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
                draggedDevice={draggedDevice}
                isProjectTree={false}
              />
            ))}
          </div>
        </div>
        </>}
      </div>

      {/* Footer — e2/barra/barra-inferior */}
      <div className="bg-white border-t border-[#cfcfcf] h-6 flex items-center overflow-clip shrink-0 text-[12px] leading-normal font-['Segoe_UI',sans-serif] text-black whitespace-nowrap">
        <div className="w-[124px] h-6 shrink-0 flex items-center gap-[2px] pl-[5px] pr-1 border-r border-[#cfcfcf]">
          <span>Versão:</span>
          <span>2.15.5 Build(6)</span>
        </div>
        <div className="w-[156px] h-6 shrink-0 flex items-center gap-[2px] px-1 border-r border-[#cfcfcf]">
          <span>Status conexão:</span>
          <span>Local</span>
        </div>
        <div className="flex-1 min-w-px h-6 flex items-center gap-[2px] px-1 border-r border-[#cfcfcf]">
          <span>Instalação:</span>
          <span>Nome do projeto</span>
        </div>
        <div className="w-[136px] h-6 shrink-0 flex items-center justify-center pl-[13px] pr-[9px]">
          <span>Nenhuma notificação</span>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={[
            contextMenu.type === 'inclusion'
              ? { label: 'Inclusão de CR-KP7-RF', onClick: handleContextMenuClick }
              : contextMenu.type === 'project'
                ? { label: 'Desvincular', onClick: handleUnlink }
                : { label: 'Desassociar', onClick: handleDesassociar },
          ]}
        />
      )}

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed z-50"
          style={{ left: overlayPos.x, top: overlayPos.y, width: 650, height: 650, pointerEvents: 'auto' }}
        >
          {/* Drag handle covers the header area, leaving the close button accessible */}
          <div
            className="absolute top-0 left-0 h-[40px] cursor-move z-10"
            style={{ width: 'calc(100% - 40px)' }}
            onMouseDown={handleOverlayMouseDown}
          />
          <ProgressiveKp7Discovery
            onClose={closeOverlay}
            onConcluir={handleConcluir}
            projectDevices={projectDevices}
            baseAssociations={associations}
            keypadNames={keypadCustomNames}
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
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (device: Device) => void;
  isDraggable?: boolean;
  isDropTarget?: boolean;
  draggedDevice?: Device | null;
  isProjectTree?: boolean;
}

function TreeNode({ device, level, expanded, onToggle, onSelect, selectionState, isSelected, onContextMenu, onDragStart, onDragEnd, onDragOver, onDrop, isDraggable, isDropTarget, draggedDevice, isProjectTree }: TreeNodeProps) {
  const hasChildren = device.children && device.children.length > 0;
  const isExpanded = expanded.has(device.id);

  const getTextColor = () => {
    if (device.type === 'project' || device.type === 'room' || device.type === 'folder') {
      return '#000000';
    }
    // Blue only while dragging: marks the devices that can receive the dragged item
    if (isDropTarget && draggedDevice && !device.isAssociated && device.type === draggedDevice.type) {
      return '#3939FF';
    }
    if (device.isAssociated) {
      return '#007F00';
    }
    // Project tree: devices still available for linking stay blue by default
    if (isProjectTree) {
      return '#3939FF';
    }
    return '#000000';
  };

  const getBackgroundStyle = () => {
    if (selectionState === 'primary') {
      return {
        backgroundColor: '#F5D59D',
        // Inset shadow instead of border: draws the 2px frame without changing the row size
        boxShadow: 'inset 0 0 0 2px #F8E1B9'
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
        onDragEnd={() => onDragEnd?.()}
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
            className="block size-4 shrink-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(device.id);
            }}
          >
            <img
              src={iconSetaMenuSuspenso}
              alt=""
              className={`block size-4 ${isExpanded ? '' : '-rotate-90'}`}
            />
          </button>
        ) : (
          <div className="w-4 shrink-0" />
        )}
        {!isProjectTree && device.type === 'interface' && (
          <img src={iconCheckboxOff} alt="" className="block size-4 shrink-0" />
        )}
        <DeviceIcon type={device.type} />
        <span className="text-[12px] leading-normal font-['Segoe_UI',sans-serif] whitespace-nowrap" style={{ color: getTextColor() }}>
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
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={onDrop}
              isDraggable={isDraggable}
              isDropTarget={isDropTarget}
              draggedDevice={draggedDevice}
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
      className="block size-4 shrink-0"
    />
  );
}

function MenuButton({ label }: { label: string }) {
  return (
    <button className="h-[25px] px-2 pt-1 pb-[5px] flex items-center justify-center shrink-0 text-[12px] leading-normal font-['Segoe_UI',sans-serif] font-normal text-black whitespace-nowrap hover:bg-gray-100">
      {label}
    </button>
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
    <div className={`h-6 pl-[6px] pr-[5px] flex items-center justify-center shrink-0 overflow-clip rounded-t-[2px] border-[#b5b5b5] cursor-pointer ${
      active ? 'bg-[#f4f4f4] border-l border-r border-t' : 'border bg-gradient-to-b from-[#eee] to-[#d9d9d9]'
    }`}>
      <span className="text-[12px] leading-normal font-['Segoe_UI',sans-serif] text-[#323232] whitespace-nowrap">{label}</span>
    </div>
  );
}

function ActionButton({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`h-[42px] w-[120px] px-2 flex items-center justify-center gap-1 overflow-clip shrink-0 cursor-pointer ${
        active
          ? 'bg-gradient-to-b from-[#f5ad7d] to-[#f5d59d] border border-[#d8973e] shadow-[0px_1px_1px_0px_rgba(216,151,62,0.5)]'
          : 'drop-shadow-[0px_1px_0.5px_rgba(201,207,210,0.5)]'
      }`}
      onClick={onClick}
    >
      <div className="size-7 relative shrink-0 overflow-clip">
        <ActionIcon type={icon} />
      </div>
      <span className="flex-1 min-w-px overflow-hidden text-ellipsis text-[11px] leading-[16px] font-['Segoe_UI',sans-serif] text-black whitespace-pre-line">{label}</span>
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
