import { HTMLAttributes } from "react";

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  label?: string;
  value?: any;
  readOnly?: boolean;
}

const Select = ({
  children,
  className,
  label,
  ...selectProps
}: React.PropsWithChildren<SelectProps>) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <select
        {...selectProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5 w-full"
      >
        {children}
      </select>
    </div>
  );
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
