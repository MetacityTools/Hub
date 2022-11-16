import React from 'react';
import { ChangeEventHandler } from 'react';
import style from './input.module.css';


interface InputPorps {
    value?: string;
    label: string;
    type: string;
    className: string; 
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export function Input(props: InputPorps) {
    const { value, type, className, id, label, onChange } = props;
    const [inputValue, setInputValue] = React.useState(value ?? "");
    const [active, setActive] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className={(className ?? " ") + " " + style.container}>
            <label htmlFor={id} className={style.label + " " + ((inputValue !== "" || active) && style.filled)}>{label}</label>
            <input id={id} type={type} value={value} className={style.input} onChange={handleChange} onFocus={() => setActive(true)} onBlur={() => setActive(false)} />
        </div>
    );
}