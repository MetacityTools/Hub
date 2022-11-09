import { useState, useEffect } from "react";




export function FileUploader() {

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
        }
    }

    useEffect(() => {
        console.log(files);
    }, [files]);

    

    return (
        <>
            <div className="flex justify-center items-center h-full">
                <label htmlFor="dropzone-file" className="flex flex-col w-full h-full cursor-pointer bg-slate-50">
                    { files.length == 0 ? (
                        <div className="flex flex-col justify-center items-center pt-5 pb-6 w-full h-full">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-s text-gray-500 mb-4"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SHP, OBJ, GeoJSON or ZIP</p>
                        </div>
                    ) : 
                    (
                        <div className="flex flex-col pt-5 pb-6">
                        {files.map((file, index) => (
                            <div key={index} className="flex flex-row mt-4 mb-4">
                                <div className="text-sm text-gray-500">{file.name}</div>
                                <div className="text-sm text-gray-500 ml-4">{file.size} bytes</div>
                            </div>
                        ))}
                        </div>
                    )}

                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple/>
                </label>
            </div> 
        </>
    )
}