import style from './card.module.css';
import Link from 'next/link'

export function Card(props: { title: string }) {
    return (
        <div className={style.card}>
            {props.title}
        </div>
    );
}

export function CardLink(props: { title: string, link: string }) {
    return (
        <Link href={props.link} className={style.cardLink}>
            {props.title}
        </Link>
    );
}

export function CardIcon(props: { title: string, icon: React.ReactNode, onClick?: () => void }) {
    return (
        <div className={style.cardIcon} onClick={props.onClick}>
            {props.icon}
            {props.title}
        </div>
    );
}

export function CardIconLink(props: { title: string, icon: React.ReactNode, link: string}) {
    return (
        <Link href={props.link} className={style.cardIconLink}>
            {props.icon}
            {props.title}
        </Link>
    );
}