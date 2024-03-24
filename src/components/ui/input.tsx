import React from "react";

const Input = ({
  name,
  label,
  placeholder,
  type,
  value,
  register,
  errors,
  constrains,
  ...props
}: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...props}
        className={`outline-none border-[1px] ${
          errors === "required" ||
          errors === "maxLength" ||
          errors === "minLength"
            ? "border-[#dc3545]"
            : "border-[#CCCCCC]"
        } rounded-lg w-[90vw] h-[40px] pl-2`}
        // required
        placeholder={placeholder}
        value={value}
        name={name}
        {...register(name, { ...constrains })}
      />
      {errors === "required" && (
        <span className="text-[#dc3545] text-sm mt-1">
          This field is required
        </span>
      )}
    </div>
  );
};

export default Input;
