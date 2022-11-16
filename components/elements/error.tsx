import { BiErrorCircle } from 'react-icons/bi';
import style from './error.module.css';



export function Error(props: {message: string}) {
    return (
        <div className={style.error}>
            <BiErrorCircle className={style.icon}/>
            <div>{props.message}</div>
        </div>
    );
}
