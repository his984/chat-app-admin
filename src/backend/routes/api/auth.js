const express = require('express');
const authRouter = express.Router();
const {body, validationResult} = require('express-validator');
const {signup, login, getProfile, updateProfile} = require("../../controllers/auth_controller");
const db = require("../../database/models");

// login
authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 12}),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        login(req, res).catch((reason) => {
            console.log(reason)
        })
    });

// register
authRouter.post('/register',
    body('firstName').isString().isLength({min: 4, max: 255}),
    body('lastName').isString().isLength({min: 4, max: 255}),
    body('phone').isString().custom((phone) => {
        if (!/^[0-9]{9}$/.test(phone)) {
            throw new Error('Phone is not correct');
        }
        return true
    }),
    body('email').isEmail().isLength({max: 255}).custom(value => {
        return db.User.findOne({where: {email: value}}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    }),
    body('password')
        .custom((value) => {

            if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
                return Promise.reject('Password must be at least 8 characters long and contain at least one capital letter and special character');
            }
            return true;

        }),
    body('confirm_password').custom((confirm_password, {req}) => {
        if (confirm_password !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        signup(req, res).catch((reason) => {
            res.status(400)
        })
    });


authRouter.post('/profile',
    body('firstName').isString().isLength({min: 4, max: 255}).optional(),
    body('lastName').isString().isLength({min: 4, max: 255}).optional(),
    body('phone').isString().custom((phone) => {
        if (!/^[0-9]{9}$/.test(phone)) {
            throw new Error('Phone is not correct');
        }
        return true
    }).optional(),
    body('email').isEmail().isLength({max: 255}).custom((value, {req}) => {
        return db.User.findOne({where: {email: value, id: {$not: req.auth.userId}}}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    }).optional(),
    body('password')
        .custom((value) => {

            if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
                return Promise.reject('Password must be at least 8 characters long and contain at least one capital letter and special character');
            }
            return true;

        })
        .optional(),
    body('confirm_password').custom((confirm_password, {req}) => {
        if (confirm_password !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        updateProfile(req, res).catch((reason) => {
            res.status(400)
        })
    })
authRouter.get('/profile',
    (req, res) => {
        getProfile(req, res).catch((reason) => {
            res.status(400)
        })
    })


module.exports = authRouter;