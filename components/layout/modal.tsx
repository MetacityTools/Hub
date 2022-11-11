import style from './modal.module.css';


export function Modal(props: { title: string, children?: React.ReactNode, onClose: () => void, visible: boolean }) {
    //TODO
    return (
        <div className={style.overlay} style={{ display: (props.visible ? 'flex' : 'none') }}>
            <div className={style.modal}>
                <div className={style.content}>
                    {props.title}
                </div>
            </div>
        </div>
    );
}