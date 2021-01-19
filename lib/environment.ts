enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod',
    qa_environment = 'qa',
    db_connection = 'mongodb+srv://illUser:34353435@cluster0.ndvh5.mongodb.net/db_test_project_places_dev?retryWrites=true&w=majority'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        } else if (this.environment === Environments.dev_environment) {
            return 8082;
        } else if (this.environment === Environments.qa_environment) {
            return 8083;
        } else {
            return 3000;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod_environment) {
            return 'db_test_project_prod';
        } else if (this.environment === Environments.dev_environment) {
            return 'db_test_project_places_dev';
        } else if (this.environment === Environments.qa_environment) {
            return 'db_test_project_qa';
        } else {
            return 'db_test_project_local';
        }
    }
    dbConnection(): String {
        return Environments.db_connection;
    }
}

export default new Environment(Environments.local_environment);