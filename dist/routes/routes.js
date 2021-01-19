"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    route(app) {
        app.get('/api/test', (req, res) => {
            res.status(200).json({ message: "Get request successfull" });
        });
        app.post('/api/test', (req, res) => {
            res.status(200).json({ message: "Post request successfull" });
        });
    }
}
exports.Routes = Routes;
