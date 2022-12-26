import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  SuffixElement?: React.ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  name,
  SuffixElement,
  className,
  ...props
}) => {
  const { register } = useFormContext();
  return (
    <div className={`input-group  ${className}`}>
      <label htmlFor={name} className="input-label">
        {name}
      </label>
      <div className="flex space-x-2 items-center">
        <input
          id={`id-${name}`}
          type="text"
          className="custom-input"
          {...props}
          {...register(name, { required: true })}
        />
        {SuffixElement && (
          <button className="bg-primary  items-center justify-center w-9 h-9 border border-primary hidden lg:flex">
            {SuffixElement}
          </button>
        )}
      </div>
    </div>
  );
};
export default InputWithLabel;
