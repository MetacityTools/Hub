import Docker from 'dockerode';

interface DatasetProcessingConfig {

}

export class MicroservicesAPI {
    docker: Docker;

    constructor() {
        this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
    }

    async processDataset() {
        const container = await this.docker.createContainer({
            Image: "ghcr.io/metacitytools/metacity:release",
            Cmd: ["python", "-m", "metacity", "--config", "/config/config.json"],
            name: 'metacity'
        });


        //await container.start({
        //    Binds: ['/tmp:/tmp']
        //});
        //const logs = await container.logs({
        //    follow: true,
        //    stdout: true,
        //    stderr: true
        //});
        //console.log(logs);
        //container.remove();
    }
}
