import { useState } from 'react';

export default function E2TelaEquipamentoEquipamentosScenario() {
  const [expandedProject, setExpandedProject] = useState(true);
  const [expandedSalaReuniao, setExpandedSalaReuniao] = useState(true);
  const [expandedSalaConferencia, setExpandedSalaConferencia] = useState(true);
  const [expandedEscritorio, setExpandedEscritorio] = useState(true);
  const [expandedENet, setExpandedENet] = useState(true);
  const [expandedLAN, setExpandedLAN] = useState(true);
  const [expandedEBNT1, setExpandedEBNT1] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-white font-['Segoe_UI',sans-serif]">
      {/* Top Bar */}
      <div className="bg-[#f3f3f3] h-[23px] px-2 flex items-center justify-between border-b border-[#cfcfcf]">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-gradient-to-br from-white to-[#c5c5c4] rounded-[3.5px] border border-[#b8b6b6] flex items-center justify-center">
            <span className="text-[#d9992c] text-[6px] font-bold">E2</span>
          </div>
          <span className="text-xs text-black">Scenario Config Embrace</span>
        </div>
        <button className="w-4 h-4 flex items-center justify-center hover:bg-gray-200">
          <span className="text-[#9b9b9b] text-xs">×</span>
        </button>
      </div>

      {/* Menu Bar */}
      <div className="bg-white border-b border-gray-300 px-2 py-1 flex items-center justify-between h-[25px]">
        <div className="flex gap-0.5">
          <button className="px-2 py-1 text-xs hover:bg-gray-100">Arquivo</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100">Preferências</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100">Sistema</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs">Login designscenario1@gmail.com:design01@scenario.ind.br</span>
        </div>
      </div>

      {/* Task Bar */}
      <div className="bg-[#ececec] border-b border-[#cfcfcf] px-1 h-[70px] flex items-center justify-between">
        <div className="flex gap-0.5 h-full items-center">
          <TaskButton icon="🔧" label="Informações do Projeto" iconColor="#24AAD7" />
          <TaskButton icon="🏠" label="Estrutura" iconColor="#FFBF36" />
          <TaskButton icon="💻" label="Equipamentos" iconColor="#88DFFC" />
          <TaskButton icon="⚙️" label="Programação" iconColor="#24AAD7" />
          <TaskButton icon="🔨" label="Instalação" active iconColor="#FFBF36" />
          <TaskButton icon="🚗" label="Gerenciamento de Drivers" iconColor="#D9982C" />
          <TaskButton icon="📤" label="Enviar Projeto" iconColor="#FFBF36" />
        </div>
        <div className="flex items-center gap-3 pr-8">
          <span className="text-xs font-bold uppercase">Embrace Assistant</span>
          <div className="flex items-center gap-2">
            <div className="w-[43px] h-6 bg-[#eee5c9] border border-[#acaba8] rounded-full relative">
              <div className="absolute w-6 h-6 bg-white border border-[#aaa] rounded-full left-0 top-0"></div>
            </div>
            <span className="text-[11px]">OFF</span>
          </div>
        </div>
      </div>

      {/* Installation Header */}
      <div className="bg-[#1d242c] h-10 px-4 flex items-center">
        <h1 className="text-white text-[18px] font-bold uppercase">Instalação</h1>
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
        <ActionButton icon="📘" label="Modo Programação" active />
        <ActionButton icon="⚠️" label="Modo Teste" iconBg="#ffcc00" />
        <ActionButton icon="Z" label="Zigbee" iconBg="#d9982c" />
        <div className="w-px h-10 bg-[#cfcfcf]"></div>
        <ActionButton icon="🔍" label="Procurar Redes" iconBg="#24aad7" />
        <ActionButton icon="🔍" label="Procurar dispositivos" iconBg="black" />
        <ActionButton icon="🔄" label="Atualizar Firmwares" iconBg="#24aad7" />
      </div>

      {/* Mode Header */}
      <div className="bg-[#1d242c] h-8 px-4 flex items-center">
        <h2 className="text-white text-[15px] font-bold uppercase">Modo Programação</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden border-t border-[#c8c8c8]">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col border-r border-[#c8c8c8]">
          <div className="bg-[#38404d] h-[31px] px-4 flex items-center">
            <h3 className="text-white text-[15px] font-bold uppercase">Dispositivos do Projeto</h3>
          </div>
          <div className="flex-1 bg-white overflow-auto">
            <TreeItem
              label="Novo Projeto"
              icon="project"
              expanded={expandedProject}
              onToggle={() => setExpandedProject(!expandedProject)}
              level={0}
            >
              {expandedProject && (
                <>
                  <TreeItem
                    label="Sala de Reunião"
                    icon="room"
                    expanded={expandedSalaReuniao}
                    onToggle={() => setExpandedSalaReuniao(!expandedSalaReuniao)}
                    level={1}
                  >
                    {expandedSalaReuniao && (
                      <>
                        <TreeItem label="EB-NTL1" icon="interface" level={2} color="#007f00" />
                        <TreeItem label="Sensor Reunião 1 (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="Sensor Reunião 2 (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="KP7 Reunião (CR-KP7-RF)" icon="keypad" level={2} color="#3939ff" />
                      </>
                    )}
                  </TreeItem>

                  <TreeItem
                    label="Sala de Conferência"
                    icon="room"
                    expanded={expandedSalaConferencia}
                    onToggle={() => setExpandedSalaConferencia(!expandedSalaConferencia)}
                    level={1}
                  >
                    {expandedSalaConferencia && (
                      <>
                        <TreeItem label="Sensor Conferência 1 (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="Sensor Conferência 2 (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="KP7 Conferência (CR-KP7-RF)" icon="keypad" level={2} color="#3939ff" />
                      </>
                    )}
                  </TreeItem>

                  <TreeItem
                    label="Escritório"
                    icon="room"
                    expanded={expandedEscritorio}
                    onToggle={() => setExpandedEscritorio(!expandedEscritorio)}
                    level={1}
                  >
                    {expandedEscritorio && (
                      <>
                        <TreeItem label="Sensor Desenvolvimento (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="Sensor Financeiro (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="Sensor RH (CR-LUMI-RF)" icon="sensor" level={2} color="#007f00" />
                        <TreeItem label="KP7 Desenvolvimento (CR-KP7-RF)" icon="keypad" level={2} color="#3939ff" />
                        <TreeItem label="KP7 RH (CR-KP7-RF)" icon="keypad" level={2} color="#3939ff" />
                        <TreeItem label="KP7 Financeiro (CR-KP7-RF)" icon="keypad" level={2} color="#3939ff" />
                      </>
                    )}
                  </TreeItem>
                </>
              )}
            </TreeItem>
          </div>
        </div>

        {/* Splitter */}
        <div className="w-1 bg-[#c8c8c8]"></div>

        {/* Right Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="bg-[#38404d] h-[31px] px-4 flex items-center">
            <h3 className="text-white text-[15px] font-bold uppercase">Dispositivos da Rede</h3>
          </div>
          <div className="flex-1 bg-white overflow-auto">
            <TreeItem
              label="E-NET"
              icon="folder"
              expanded={expandedENet}
              onToggle={() => setExpandedENet(!expandedENet)}
              level={0}
              color="#000"
            >
              {expandedENet && (
                <TreeItem
                  label="LAN"
                  icon="folder"
                  expanded={expandedLAN}
                  onToggle={() => setExpandedLAN(!expandedLAN)}
                  level={1}
                >
                  {expandedLAN && (
                    <TreeItem
                      label="EB-NTL1"
                      icon="interface"
                      expanded={expandedEBNT1}
                      onToggle={() => setExpandedEBNT1(!expandedEBNT1)}
                      level={2}
                      color="#007f00"
                    >
                      {expandedEBNT1 && (
                        <>
                          <TreeItem label="Sensor Reunião 1 (CR-LUMI-RF) [5A:9C:2F:B7] - Sala de Reunião" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor Reunião 2 (CR-LUMI-RF) [B5:15:A1:65]  - Sala de Reunião" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor Conferência 1 (CR-LUMI-RF) [C2:81:5D:9A] - Sala de Conferência" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor Conferência 2 (CR-LUMI-RF) [1D:42:0A:33] - Sala de Conferência" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor Desenvolvimento (CR-LUMI-RF) [C1:04:EE:38] - Escritório" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor Financeiro (CR-LUMI-RF) [8D:6B:A0:F2] - Escritório" icon="sensor" level={3} color="#007f00" />
                          <TreeItem label="Sensor RH (CR-LUMI-RF) [D2:14:7B:5F] - Escritório" icon="sensor" level={3} color="#007f00" />
                        </>
                      )}
                    </TreeItem>
                  )}
                </TreeItem>
              )}
            </TreeItem>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#cfcfcf] px-2 py-0.5 flex justify-between text-xs h-6">
        <div className="flex gap-4">
          <span className="border-r border-[#cfcfcf] pr-4">Versão: 2.15.5 Build(6)</span>
          <span className="border-r border-[#cfcfcf] pr-4">Status conexão: Local</span>
          <span className="border-r border-[#cfcfcf] pr-4">Instalação: Nome do projeto</span>
        </div>
        <span>Nenhuma notificação</span>
      </div>
    </div>
  );
}

interface TaskButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  iconColor?: string;
}

function TaskButton({ icon, label, active, iconColor }: TaskButtonProps) {
  return (
    <div className={`w-[120px] h-full flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
      active ? 'bg-gradient-to-b from-[#f5ad7d] to-[#f5d59d] border border-[#d8973e]' : 'hover:bg-gray-100'
    }`}>
      <div className="text-2xl">{icon}</div>
      <span className="text-xs text-center text-black px-1">{label}</span>
    </div>
  );
}

interface TabProps {
  label: string;
  active?: boolean;
}

function Tab({ label, active }: TabProps) {
  return (
    <div className={`px-1.5 py-1 text-xs rounded-t-sm border border-[#b5b5b5] ${
      active
        ? 'bg-[#f4f4f4] border-b-0'
        : 'bg-gradient-to-b from-[#eee] to-[#d9d9d9]'
    }`}>
      <span className="text-[#323232]">{label}</span>
    </div>
  );
}

interface ActionButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  iconBg?: string;
}

function ActionButton({ icon, label, active, iconBg }: ActionButtonProps) {
  return (
    <div className={`h-[42px] w-[120px] flex items-center gap-1 px-2 cursor-pointer ${
      active
        ? 'bg-gradient-to-b from-[#f5ad7d] to-[#f5d59d] border border-[#d8973e] shadow-[0px_1px_1px_0px_rgba(216,151,62,0.5)]'
        : 'border border-transparent hover:bg-gray-100'
    }`}>
      <div className={`w-7 h-7 flex items-center justify-center text-sm rounded`} style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <span className="text-[11px] text-black flex-1">{label}</span>
    </div>
  );
}

interface TreeItemProps {
  label: string;
  icon?: string;
  level: number;
  children?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
  color?: string;
}

function TreeItem({ label, icon, level, children, expanded, onToggle, color = '#000' }: TreeItemProps) {
  const hasChildren = !!children;

  return (
    <div>
      <div
        className="h-[23px] flex items-center gap-1 hover:bg-blue-50 cursor-pointer"
        style={{ paddingLeft: `${6 + level * 12}px` }}
        onClick={onToggle}
      >
        {hasChildren ? (
          <button className="w-4 h-4 flex items-center justify-center">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 1L4 4.5L7 1" stroke="#333" strokeLinecap="round" strokeLinejoin="round" fill="#333" />
            </svg>
          </button>
        ) : (
          <div className="w-4" />
        )}
        <Icon type={icon} />
        <span className="text-xs" style={{ color }}>{label}</span>
      </div>
      {expanded && children}
    </div>
  );
}

function Icon({ type }: { type?: string }) {
  if (!type) return <div className="w-4 h-4" />;

  switch (type) {
    case 'project':
      return <div className="w-4 h-4 bg-[#24AAD7] rounded-sm border border-[#38404D]" />;
    case 'room':
      return <div className="w-4 h-4 bg-[#D8973E] rounded-sm border border-[#3B424E]" />;
    case 'folder':
      return <div className="w-4 h-4 bg-[#FFCC00] rounded border border-[#38404D]" />;
    case 'interface':
      return <div className="w-4 h-4 bg-[#FFBF36] rounded border border-[#38404D]" />;
    case 'sensor':
      return <div className="w-3 h-3 bg-[#24AAD7] rounded-full border border-[#38404D]" />;
    case 'keypad':
      return <div className="w-3 h-3 bg-white border border-[#38404D]" />;
    default:
      return <div className="w-4 h-4" />;
  }
}
