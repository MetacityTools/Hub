import style from './fileSelect.module.css';
import { FileInput, TextInput } from '../elements/input';
import { Error } from '../elements/error';
import { Submit } from '../elements/submit';
import React from 'react';

export function FileSelect(props : { onSubmit: (name: string, files: File[]) => void, error?: string }) {
    const { onSubmit } = props;
    const [files, setFiles] = React.useState<File[]>([]);
    const ref = React.useRef<HTMLInputElement>(null);

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (ref.current) {
            const name = ref.current.value;
            onSubmit(name, files);
        }
    };

    return (
        <div>
            <div className={style.form}>
                <form onSubmit={formSubmit}>
                    <TextInput id="dataset" label="Dataset Name" className={style.input} inputRef={ref} />
                    <FileInput id="files" label="Select OBJ, SHP or GeoJSON files" className={style.input} onSelect={setFiles} />
                    {props.error ? <Error message={props.error} /> : null}
                    <Submit value={"Add Dataset"}/>
                </form>
            </div>
        </div> 
    );
}


