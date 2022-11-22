import { User } from "@prisma/client";
import style from "./cardUser.module.css";

export function CardUserHeading() {
    return (
        <div className={style.cardHeading}>
            <div className={style.name}>Name</div>
            <div className={style.role}>Role</div>
            <div className={style.email}>Email</div>
            <div className={style.actions}>Actions</div>
        </div>
    );
}

export function CardUser(props: { user: User }) {
    const { user } = props;
    return (
        <div className={style.card}>
            <div className={style.name}>{user.name}</div>
            <div className={style.role}>{user.role ?? "on waiting list"}</div>
            <div className={style.email}>{user.email}</div>
            <div className={style.actions}>
                <div className={style.actionsContainer}>
                    {user.role !== "admin" && <button >Promote to Admin</button>}
                    {user.role !== "member" && <button >Promote to Member</button>}
                    <button className={style.delete}>Remove</button>
                </div>
            </div>
        </div>
    );
}