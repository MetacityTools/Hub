import style from './container.module.css';

export function ItemsContainer(props: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className={style.items}>
            {props.children}
        </div>
    );
}

export function PageContainer(props: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className={style.page}>
            {props.children}
        </div>
    );
}

export function PlainContainer(props: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className={style.plain}>
            {props.children}
        </div>
    );
}