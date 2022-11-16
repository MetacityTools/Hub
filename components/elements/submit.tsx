import style from './submit.module.css';

interface SubmitProps {
    value?: string;
    onSubmit?: () => void;
}


export function Submit(props: SubmitProps) {
    return (<input type="submit" value={props.value ?? "Submit"} className={style.submit} onClick={props.onSubmit}/>);
}