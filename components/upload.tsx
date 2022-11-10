import { useEffect, useState } from "react";
import { FileSelect } from "./form/fileSelect";
import { FileView } from "./form/fileView";
import { DialogLayout } from "./layout/dialog";




export function Upload(props: { email: string }) {
    const { email } = props
    const [files, setFiles] = useState<File[]>([]);
    const [selected, setSelected] = useState<File[]>([]);
    const [stage, setStage] = useState<number>(0);


    useEffect(() => {
        if (files.length > 0) {
            setStage(1);
        }
    }, [files]);

    useEffect(() => {
        if (selected.length > 0) {
            setStage(2);
        }
    }, [selected]);

    return (
        <DialogLayout email={email}>
            { stage == 0 && <FileSelect onSelect={(files: File[]) => setFiles(files)}/>}
            { stage == 1 && <FileView 
                                files={files} 
                                onSubmit={(files: File[]) => setSelected(files)}
                                onAbort={() => setStage(0)}
                            />}
            { stage == 2 && <div>Upload</div>}
        </DialogLayout>
    );

}