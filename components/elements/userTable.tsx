import { User } from "@prisma/client";
import { CardUser, CardUserHeading } from "./cardUser";
import style from "./userTable.module.css";


export function UserTable(props: { users: User[] }) {
    const { users } = props;

    return (
        <div className={style.table}>
            <CardUserHeading />
            {users.map((user) => <CardUser key={user.id} user={user} />)}
        </div>
    );
}