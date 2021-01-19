"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environments;
(function (Environments) {
    Environments["local_environment"] = "local";
    Environments["dev_environment"] = "dev";
    Environments["prod_environment"] = "prod";
    Environments["qa_environment"] = "qa";
    Environments["db_connection"] = "mongodb+srv://illUser:34353435@cluster0.ndvh5.mongodb.net/db_test_project_places_dev?retryWrites=true&w=majority";
})(Environments || (Environments = {}));
class Environment {
    constructor(environment) {
        this.environment = environment;
    }
    getPort() {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        }
        else if (this.environment === Environments.dev_environment) {
            return 8082;
        }
        else if (this.environment === Environments.qa_environment) {
            return 8083;
        }
        else {
            return 3000;
        }
    }
    getDBName() {
        if (this.environment === Environments.prod_environment) {
            return 'db_test_project_prod';
        }
        else if (this.environment === Environments.dev_environment) {
            return 'db_test_project_places_dev';
        }
        else if (this.environment === Environments.qa_environment) {
            return 'db_test_project_qa';
        }
        else {
            return 'db_test_project_local';
        }
    }
    dbConnection() {
        return Environments.db_connection;
    }
}
exports.default = new Environment(Environments.local_environment);
