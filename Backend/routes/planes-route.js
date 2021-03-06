'use strict';
let express = require('express');
let router = express.Router();
let Plan = require('../models/planes-model');
// Obtener todos los planes
router.get('/', (req, res) => {
    Plan.find().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

//Obtener un plan
router.get('/:id', (req, res) => {
    let _id = req.params.id;
    Plan.findById(_id).exec((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

// Guardar un nuevo plan
router.post('/', (req, res) => {
    let body = req.body;
    body.restricciones = {
        limiteFilas: body.limiteFilas,
        limiteColumnas: body.limiteColumnas,
        limitePaginas: body.limitePaginas,
        limiteAlmacenamiento: body.limiteAlmacenamiento
    }
    const planDB = new Plan(body);
    planDB.save((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

// Actualizar un plan
router.put('/:id', (req, res) => {
    let _id = req.params.id;
    let body = req.body;
    body.restricciones = {
        limiteFilas: body.limiteFilas,
        limiteColumnas: body.limiteColumnas,
        limitePaginas: body.limitePaginas,
        limiteAlmacenamiento: body.limiteAlmacenamiento
    };
    Plan.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                mensaje: "No hay un plan que actualizar",
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

// Inhabilitar un plan
router.delete('/:id', (req, res) => {
    let _id = req.params.id;
    Plan.findByIdAndUpdate(_id, { activo: false }, { new: true, runValidators: true, context: 'query', useFindAndModify: false }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Hubo un error en el servidor",
                err
            });
        };
        if (!data) {
            return res.status(400).json({
                ok: false,
                mensaje: "No hay un plan que Inhabilitar",
                err
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    });
});

module.exports = router;