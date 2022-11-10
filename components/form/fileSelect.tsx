import style from './fileSelect.module.css';
import { BiUpload } from 'react-icons/bi';

export function FileSelect(props : { onSelect: (files: File[]) => void }) {
    const { onSelect } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onSelect(Array.from(event.target.files));
        }
    };

    return (
            <label htmlFor="file" className={style.upload}>
                <div className={style.content}>
                    <BiUpload className={style.icon}/>
                    <h1>Let's upload your data</h1>
                    <p>Click to upload SHP, OBJ, GeoJSON or ZIP.</p>
                    <input type="file" id="file" name="file" multiple onChange={handleChange} />
                </div>
            </label>
    );
}


