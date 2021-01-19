"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRoutes = void 0;
const placeController_1 = require("../controllers/placeController");
class PlaceRoutes {
    constructor() {
        this.place_controller = new placeController_1.PlaceController();
    }
    route(app) {
        app.get('/api/place/getPlaces', (req, res) => {
            this.place_controller.get_all_places(req, res);
        });
        app.get('/api/place/getPlace/:id', (req, res) => {
            this.place_controller.get_place(req, res);
        });
        app.post('/api/place/createPlace', (req, res) => {
            this.place_controller.create_place(req, res);
        });
        app.put('/api/place/updatePlace/:id', (req, res) => {
            this.place_controller.update_place(req, res);
        });
        app.put('/api/place/deletePlace/:id', (req, res) => {
            this.place_controller.delete_place(req, res);
        });
    }
}
exports.PlaceRoutes = PlaceRoutes;
