"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class PlaceService {
    createPlace(place_params, callback) {
        const _session = new schema_1.default(place_params);
        _session.save(callback);
    }
    getAllPlaces(query, callback) {
        schema_1.default.find(query, callback);
    }
    filterPlace(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updatePlace(place_params, callback) {
        const query = { _id: place_params._id };
        schema_1.default.findOneAndUpdate(query, place_params, callback);
    }
    deletePlace(_id, callback) {
        const query = { _id: _id };
        schema_1.default.findOneAndUpdate(query, { is_deleted: true }, callback);
    }
}
exports.default = PlaceService;
