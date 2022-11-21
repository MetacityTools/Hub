import style from './submit.module.css';

interface SubmitProps {
    value?: string;
}


export function Submit(props: SubmitProps) {
    return (<input type="submit" value={props.value ?? "Submit"} className={style.submit}/>);
}