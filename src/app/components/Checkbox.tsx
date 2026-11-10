// e2/checkbox — SVG states exported from Figma (Embrace Desktop)
import iconCheckboxOn from '../../imports/icons/checkbox-on.svg';
import iconCheckboxOff from '../../imports/icons/checkbox-off.svg';

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  opacity?: number;
}

export default function Checkbox({ checked, disabled = false, onChange, opacity = 1 }: CheckboxProps) {
  return (
    <button
      className="block size-4 shrink-0"
      onClick={onChange}
      disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity }}
    >
      <img src={checked ? iconCheckboxOn : iconCheckboxOff} alt="" className="block size-4" />
    </button>
  );
}
