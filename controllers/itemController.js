const router = require('express').Router();
const Item = require('../models/index').sequelize.import('../models/item');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
    const item = req.body.item;
    Item.create({
        name : item.name,
        flavorText : item.flavorText,
        weight : item.weight,
        value : item.value,
        addedBy : req.user.id
    })
    .then(
        createSuccess = newItem => {
            res.status(200).json(newItem);
        },

        createFail = err => {
            console.log(err.message);
            res.status(500).send(err.message);
        })
});

router.get('/list', validateSession, (req, res) => {
    const item = req.body.item;
    
    Item.findAll({
        where: {
            id : item.ids
        }
    })
    .then(
        findSuccess = items => {
            res.status(200).json(items);
        },

        findFail = err => {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    )
});

router.get('/:id', validateSession, (req, res) => {
    Item.findOne({
        where: {
            id : req.params.id
        }
    })
    .then(
        findSuccess = item => {
            res.status(200).json(item);
        },

        findFail = err => {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    )
});

router.get('/', validateSession, (req, res) => {
    Item.findAll()
        .then(
            findSuccess = items => {
                res.status(200).json(items);
            },

            findFail = err => {
                console.log(err.message);
                res.status(500).send(err.message);
            }
        )
});

router.put('/:id', validateSession, (req, res) => {
    const item = req.body.item;

    Item.update({
        name : item.name,
        flavorText : item.flavorText,
        weight : item.weight,
        value : item.value,
    },
    {
        where : {
            id : req.params.id
        }
    })
    .then(
        updateSuccess = recordsChanged => {
            res.status(200).send(`${recordsChanged} records(s) changed.`)
        },

        updateFail = err => {
            res.status(500).send(err.message);
        }
    )
});

router.delete('/:id', validateSession, (req, res) => {
    Item.destroy({
        where : {
            id : req.params.id,
        }
    })
    .then(
        destroySuccess = recordsChanged => {
            res.status(200).send(`${recordsChanged} record(s) changed.`);
        },

        destroyFail = err => {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    )
});

module.exports = router;