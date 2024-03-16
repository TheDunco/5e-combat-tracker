import React from 'react';

export const Input = React.forwardRef(
  (
    props: React.HTMLProps<HTMLInputElement> & { label: string },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const { label } = props;
    return (
      <div className="flex flex-col text-left">
        <label
          htmlFor={label}
          className="block mt-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          id={label}
          type="text"
          ref={ref}
          {...props}
          className="bg-gray-50 hover:ring hover:ring-pink-500/60 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:ring-pink-300/50 block w-full p-2.5"
          autoComplete="off"
        />
      </div>
    );
  }
);
