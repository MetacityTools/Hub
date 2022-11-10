import { ReactNode } from "react";
import styles from "./dialog.module.css";
import { Header } from "./header";


export function DialogLayout(props: { email: string, children: ReactNode | ReactNode[] }) {
    const { children, email } = props;
    return (
        <div className={styles.dialog}>
            <Header email={email}/>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}