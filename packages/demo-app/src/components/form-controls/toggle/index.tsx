import React from "react"


interface IToggle {
    formValues: any,
    name: string,
    label: string,
    cyId: string,
    unCheckedLabel?: string,
    onChange: any
}


export const Toggle = ({ name, cyId, formValues, onChange, label, unCheckedLabel }: IToggle) => {

    const value = formValues[name]

    const onChangeCheckBox = (e: any) => {
        onChange({
            name,
            value: e.target.checked
        })
    }

    return (
        <label
            className="inline-flex items-center me-5 cursor-pointer">
            <input
                data-cy={cyId}
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={onChangeCheckBox}
            />
            <div
                className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}>
            </div>
            <span
                className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {value ? label : unCheckedLabel ?? label}
            </span>
        </label>
    )
}