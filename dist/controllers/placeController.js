"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/places/service");
class PlaceController {
    constructor() {
        this.place_service = new service_2.default();
    }
    create_place(req, res) {
        if (req.body.place_data && req.body.place_data.title && req.body.place_data.pic_url
            && req.body.place_data.place_location && req.body.place_data.description
            && req.body.created_by) {
            const place_params = {
                place_data: {
                    title: req.body.place_data.title,
                    pic_url: req.body.place_data.pic_url,
                    place_location: req.body.place_data.place_location,
                    description: req.body.place_data.description,
                },
                created_by: req.body.created_by,
                is_deleted: false,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New place created'
                    }],
            };
            this.place_service.createPlace(place_params, (err, place_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('place created successfully', place_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_places(req, res) {
        const place_filter = { is_deleted: false };
        const place_data = this.place_service.getAllPlaces(place_filter, (err, place_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('get places list successful', place_data, res);
            }
        });
    }
    get_place(req, res) {
        if (req.params.id) {
            const place_filter = { _id: req.params.id, is_deleted: false };
            this.place_service.filterPlace(place_filter, (err, place_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    if (place_data == null) {
                        service_1.successResponse('Place is no longer available', null, res);
                    }
                    else {
                        service_1.successResponse('get place successful', place_data, res);
                    }
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_place(req, res) {
        if (req.params.id &&
            req.body.place_data && req.body.place_data.title && req.body.place_data.pic_url
            && req.body.place_data.place_location && req.body.place_data.description
            && req.body.created_by) {
            const place_filter = { _id: req.params.id };
            this.place_service.filterPlace(place_filter, (err, place_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (place_data) {
                    place_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: req.body.created_by,
                        modification_note: 'Place data updated successfully'
                    });
                    const place_params = {
                        _id: req.params.id,
                        place_data: req.body.place_data ? {
                            title: req.body.place_data.title ? req.body.place_data.title : place_data.place_data.title,
                            pic_url: req.body.place_data.pic_url ? req.body.place_data.pic_url : place_data.place_data.pic_url,
                            place_location: req.body.place_data.place_location ? req.body.place_data.place_location : place_data.place_data.place_location,
                            description: req.body.place_data.description ? req.body.place_data.description : place_data.place_data.description,
                        } : place_data.place_data,
                        created_by: req.body.created_by ? req.body.created_by : place_data.created_by,
                        is_deleted: false,
                        modification_notes: place_data.modification_notes,
                    };
                    this.place_service.updatePlace(place_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update place successful', place_params, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_place(req, res) {
        if (req.params.id) {
            const placeFilter = { _id: req.params.id };
            this.place_service.filterPlace(placeFilter, (err, place_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (place_data && place_data.is_deleted !== true) {
                    this.place_service.deletePlace(req.params.id, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('place deleted sucessfully', null, res);
                        }
                    });
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.PlaceController = PlaceController;
