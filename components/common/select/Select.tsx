export interface SelectProps {
  label?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: React.PropsWithChildren<SelectProps>) => {
  return (
    <>
      {props.label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {props.label}
        </label>
      )}
      <select
        id={props.id}
        onChange={props.onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5 w-max"
      >
        {props.children}
      </select>
    </>
  );
};

export default Select;
