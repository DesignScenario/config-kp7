import { useState, useEffect } from 'react';
import E2CrKp7Rf, { KEYPADS } from '../../imports/E2CrKp7Rf/E2CrKp7Rf';

interface Device {
  id: string;
  name: string;
  type: string;
  isAssociated: boolean;
  children?: Device[];
}

interface ProgressiveKp7DiscoveryProps {
  onClose?: () => void;
  onConcluir?: (associations: Record<string, string>, keypadNames: Record<string, string>) => void;
  projectDevices?: Device[];
  baseAssociations?: Record<string, string>;
  keypadNames?: Record<string, string>;
  draggedDevice?: Device | null;
  onDragOver?: (e: React.DragEvent) => void;
  onOverlayAssociationsChange?: (associations: Record<string, string>) => void;
}

export default function ProgressiveKp7Discovery({ onClose, onConcluir, projectDevices, baseAssociations, keypadNames, draggedDevice, onDragOver, onOverlayAssociationsChange }: ProgressiveKp7DiscoveryProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= KEYPADS.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-full">
      <E2CrKp7Rf
        visibleDevices={visibleCount}
        onClose={onClose}
        onConcluir={onConcluir}
        draggedDevice={draggedDevice}
        onDragOver={onDragOver}
        projectDevices={projectDevices}
        baseAssociations={baseAssociations}
        baseKeypadNames={keypadNames}
        onOverlayAssociationsChange={onOverlayAssociationsChange}
      />
    </div>
  );
}
