import { ReactNode } from "react";
import styles from "./page.module.css";
import { Header } from "./header";


export function PageLayout(props: { children: ReactNode | ReactNode[] }) {
    const { children } = props;
    return (
        <div className={styles.page}>
            <Header/>
            {children}
        </div>
    )
}