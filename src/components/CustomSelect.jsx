import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--color-border)',
    color: 'var(--color-text)',
    border: 'none',
    boxShadow: 'none',
    minHeight: '55px',
    height: '55px',
    borderRadius: '6px',
    paddingLeft: '1rem',
    fontWeight: 600,
    fontFamily: 'var(--font-base)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-border)',
    color: 'var(--color-text)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? 'rgba(255, 255, 255, 0.1)' // or use a hover-friendly color
      : 'var(--color-border)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
};

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

export default CustomSelect;
