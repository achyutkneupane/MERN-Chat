const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const User = require('../models/user');
const Logins = require('../models/logins');

const middlewares = require('../utils/middlewares');

const firstNameChain = body('firstName').notEmpty();
const middleNameChain = body('middleName').optional();
const lastNameChain = body('lastName').isLength({min: 1});
const emailChain = body('email').isEmail();
const usernameChain = body('username').isLength({min: 1});
const passwordChain = body('password').isLength({min: 8});

router.post(
    '/register',
    firstNameChain,
    middleNameChain,
    lastNameChain,
    emailChain,
    usernameChain,
    passwordChain,
    async (req, res) => {
        const {firstName, middleName, lastName, email, username, password} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        await bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) throw err;
            const user = new User({firstName, middleName, lastName, email, username, password: hashedPassword});
            try {
                await user.save();
                res.status(200).json({message: 'User created'});
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        });
    });

router.post(
    '/login',
    usernameChain,
    passwordChain,
    async (req, res) => {
        const {username, password} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            const user = await User.findOne({username});
            if (user) {
                await bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result) {
                        const logins = new Logins({
                            user: user._id,
                            userAgent: req.headers['user-agent'],
                            ipAddress: req.ip
                        });
                        logins.save();
                        const token = jwt.sign(
                            {
                                id: user._id,
                                username: user.username,
                                email: user.email
                            }, process.env.JWT_SECRET);
                        res.status(200).json({message: 'Authentication successful', token: token});
                    } else {
                        res.status(401).json({message: 'Authentication failed'});
                    }
                });
            } else {
                res.status(401).json({message: 'Authentication failed'});
            }
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    });

router.get('/get-user',
    middlewares.authenticated,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.decoded.id});
            res.status(200).json({user: user});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    });

module.exports = router;