import style from './card.module.css';
import Link from 'next/link'

export function Card(props: { title: string }) {
    return (
        <div className={style.card}>
            {props.title}
        </div>
    );
}

export function CardLink(props: { annotation?: string, title: string, link?: string }) {
    return (
        props.link ? (<Link href={props.link} className={style.cardLink}>
            {props.annotation && <div className={style.annotation}>{props.annotation}</div>}
            <div>{props.title}</div>
        </Link>) : (
            <div className={style.card}>
                {props.annotation && <div className={style.annotation}>{props.annotation}</div>}
                <div>{props.title}</div>
            </div>
        )
    );
}

export function CardIcon(props: { title: string, icon: React.ReactNode, onClick: () => void }) {
    return (
        <div className={style.cardIcon} onClick={props.onClick}>
            <div className={style.icon}>{props.icon}</div>
            <div>{props.title}</div>
        </div>
    );
}

export function CardIconLink(props: { title: string, icon: React.ReactNode, link: string}) {
    return (
        <Link href={props.link} className={style.cardIconLink}>
            <div className={style.icon}>{props.icon}</div>
            <div>{props.title}</div>
        </Link>
    );
}