import { PageLayout } from "../layout/page";



export function AddCity(props: { email: string }) {
    const { email } = props;
    
    return (
        <PageLayout email={email}>
            <div>add city</div>
        </PageLayout>
    );
}