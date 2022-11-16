import { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import style from './fileView.module.css';

function formatSize(size: number) {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    } else {
        return `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
}


export function FileView(props: { files: File[], onSubmit: (files: File[]) => void, onAbort: () => void }) {
    const { files } = props;
    const [selected, setSelected] = useState<File[]>(props.files);
    const [condensed, setCondensed] = useState<boolean>(true);

    const handleRemove = (file: File) => {
        setSelected(selected.filter((f) => f.name !== file.name));
    };

    const handleSubmit = () => {
        props.onSubmit(selected);
    };

    useEffect(() => {
        if (selected.length == 0) {
            props.onAbort();
        }
    }, [selected]);

    return (
        <div className={style.view}>
            <div className={style.content}>
                <h1>Let's upload your data</h1>
                <p>You have selected {selected.length} file{selected.length > 1 ? 's' : ''} with a total size of {formatSize(selected.reduce((acc, file) => acc + file.size, 0))}.</p>
                <div className={style.list}>
                    {condensed && selected.length > 3 ? (
                        <>
                        {selected.map((file, index) => ( index < 3 &&
                            <div key={file.name} className={style.file} onClick={() => handleRemove(file)}>
                                <div className={style.name}>{file.name}</div>
                                <div className={style.size}>{formatSize(file.size)}</div>
                                <div className={style.remove}>remove</div>
                            </div> ))}
                            <div className={style.condensed}
                                onClick={() => setCondensed(!condensed)}>Show remaining {selected.length - 3} files</div>
                        </>
                    )
                    : selected.map((file) => (
                            <div key={file.name} className={style.file} onClick={() => handleRemove(file)}>
                                <div className={style.name}>{file.name}</div>
                                <div className={style.size}>{formatSize(file.size)}</div>
                                <div className={style.remove}>remove</div>
                            </div>
                        ))}
                </div>
                <div className={style.upload} onClick={handleSubmit}>Proceed to upload &#8594;</div>
            </div>
        </div>
    )
}