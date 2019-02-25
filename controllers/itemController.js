const router = require('express').Router();
const Item = require('../models/index').sequelize.import('../models/item');
const validateSession = require('../middleware/validate-session');

// post
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

// get by id
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

// get all
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

// get array of ids
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

// update
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

// delete
router.delete('/:id', validateSession, (req, res) => {
    
});


module.exports = router;