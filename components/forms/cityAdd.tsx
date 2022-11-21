import React from "react";
import { Error } from "../elements/error";
import { Input } from "../elements/input";
import { Submit } from "../elements/submit";
import style from "./cityAdd.module.css";



export function CityAdd(props: { value?: string, onSubmit: (value: string) => void, error?: string }) {
    const ref = React.useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if(ref.current) {
            props.onSubmit(ref.current.value);
        }
    };

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit();
    };

    return (
        <div>
            <div className={style.form}>
                <form onSubmit={formSubmit}>
                    <Input id="city" label="City" type="text" className={style.input} inputRef={ref} />
                    {props.error ? <Error message={props.error} /> : null}
                    <Submit value={"Add City"}/>
                </form>
            </div>
        </div>
    )
}