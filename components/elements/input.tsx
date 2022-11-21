import React from 'react';
import { ChangeEventHandler } from 'react';
import { BsFilesAlt } from 'react-icons/bs';
import style from './input.module.css';


interface InputProps {
    value?: string;
    label: string;
    className: string; 
    id: string;
}

interface TextInputProps extends InputProps {
    inputRef: React.RefObject<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}


export function TextInput(props: TextInputProps) {
    const { value, className, id, label, onChange } = props;
    const [inputValue, setInputValue] = React.useState(value ?? "");
    const [active, setActive] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className={(className ?? "") + " " + style.container}>
            <label htmlFor={id} className={style.label + " " + ((inputValue !== "" || active) && style.filled)}>{label}</label>
            <input id={id} type="text" value={value} className={style.input} onChange={handleChange} onFocus={() => setActive(true)} onBlur={() => setActive(false)} ref={props.inputRef} />
        </div>
    );
}

function formatSize(size: number) {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    } else {
        return `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
}


interface FileInputProps extends InputProps {
    onSelect: (files: File[]) => void;
}

export function FileInput(props: FileInputProps) {
    const { value, className, id, label, onSelect } = props;
    const [files, setFiles] = React.useState<File[]>([]);

    const computeSize = () => {
        return formatSize(files.reduce((acc, file) => acc + file.size, 0));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleRemove = (file: File) => {
        setFiles(files.filter((f) => f.name !== file.name));
    };

    React.useEffect(() => {
        onSelect(files);
    }, [files]);

    return (
        <>
        <label htmlFor="file" className={style.files + " " + (files.length > 0 && style.buttonDim)}>
            <div className={style.filesPrompt}><BsFilesAlt/> {files.length == 0 ? label : "Selected " + files.length + " files with size " + computeSize()}</div>
            <input type="file" id="file" name="file" multiple onChange={handleChange}/>
        </label>
        <div className={style.fileList}>
            { files.length > 0 ? <div className={style.filesList}>{files.map((file) => 
                <div key={file.name} className={style.file} onClick={() => handleRemove(file)}>
                    <div className={style.name}>{file.name}</div>
                    <div className={style.size}>{formatSize(file.size)}</div>
                    <div className={style.remove}>remove</div>
                </div>
            )}</div> : null }
        </div>
        </>
    );
}