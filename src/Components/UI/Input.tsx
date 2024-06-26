import React, { useId } from "react";

export const Input = React.forwardRef(
    (
        props: React.HTMLProps<HTMLInputElement> & { label: string },
        ref: React.Ref<HTMLInputElement>
    ) => {
        const { label } = props;
        const id = useId();
        return (
            <div className="flex flex-col text-left">
                <label
                    htmlFor={id}
                    className="block mt-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                    {label}
                </label>
                <input
                    id={id}
                    type="text"
                    ref={ref}
                    className="bg-gray-50 ring-none border-2 focus:border-gray-800 outline-none border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    {...props}
                    onFocus={(e) => e.target.select()}
                    autoComplete="off"
                />
            </div>
        );
    }
);
