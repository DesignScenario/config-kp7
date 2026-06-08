import svgPaths from '../../imports/E2Checkbox/svg-ktw2tw7d0h';

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  opacity?: number;
}

export default function Checkbox({ checked, disabled = false, onChange, opacity = 1 }: CheckboxProps) {
  return (
    <button
      className="bg-[#ececec] border border-[#b5b5b5] border-solid relative rounded-[2px] shrink-0 size-[16px]"
      onClick={onChange}
      disabled={disabled}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
      }}
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        {checked && (
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9px] top-[calc(50%-1px)]">
            <div className="absolute inset-[-3.87%_-3.93%_-10.63%_-3.92%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70609 10.3042">
                <path d={svgPaths.pc079200} fill="#575757" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
