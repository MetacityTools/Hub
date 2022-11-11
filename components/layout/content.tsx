import style from './content.module.css';

export function Content(props: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className={style.content}>
            {props.children}
        </div>
    );
}