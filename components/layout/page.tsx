import { ReactNode } from "react";
import styles from "./page.module.css";
import { Header } from "./header";


export function PageLayout(props: { email: string, children: ReactNode | ReactNode[] }) {
    const { children, email } = props;
    return (
        <div className={styles.page}>
            <Header email={email}/>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}