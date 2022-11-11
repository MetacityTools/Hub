import style from './breadcrumbs.module.css';
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs';

interface BreadcrumbItem {
    title: string;
    link?: string;
}

export function Breadcrumbs(props: { items: BreadcrumbItem[] }) {
    return (
        <div className={style.breadcrumbs}>
            {props.items.map((item, index) => {
                return (
                    <div key={index} className={style.breadcrumb}>
                        {item.link ? <Link href={item.link}>{item.title}</Link> : item.title}
                        {index < props.items.length - 1 && <BsChevronRight className={style.separator} />}
                    </div>
                )
            })}
        </div>
    )
}