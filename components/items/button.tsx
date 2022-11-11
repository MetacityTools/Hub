import style from './button.module.css';


export function Button(props: { title: string, onClick: () => void }) {
    return (
        <button onClick={props.onClick}>
            {props.title}
        </button>
    );
}
