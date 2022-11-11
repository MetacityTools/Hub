import style from './topPanel.module.css';



export function TopPanel(props: { children: React.ReactNode | React.ReactNode[] }) {

    return (
        <div className={style.panel}>
            <div className={style.content}>
                {props.children}
            </div>
        </div>
    );

}