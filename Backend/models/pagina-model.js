var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
    String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
*/
var paginaSchema = new Schema({
    tituloGeneral: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    favicon: {
        type: String,
        required: false
    },
    palabrasClave: [{
        type: String,
        required: false
    }],
    descripcion: {
        type: String,
        required: false,
        default: ""
    },
    principal: {
        type: Boolean,
        required: false,
        default: false
    },
    HTML: {
        type: String,
        required: true
    },
    CSSExtra: {
        type: String,
        required: true
    },
    JSExtra: {
        type: String,
        required: true
    },
    plantilla: {
        type: Schema.ObjectId,
        ref: "plantillas",
        required: false
    },
    productos: [{
        type: Schema.ObjectId,
        required: false,
        ref: "producto"
    }]
});

module.exports = mongoose.model('paginas', paginaSchema);