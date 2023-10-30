const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const db = require('../models/db');
const User = db.User;
const Logins = db.Login;

const middlewares = require('../utils/middlewares');

const firstNameChain = body('firstName').isLength({min: 1}).withMessage('First name is required');
const middleNameChain = body('middleName').optional();
const lastNameChain = body('lastName').isLength({min: 1}).withMessage('Last name is required');
const emailChain = body('email').isLength({min: 1}).withMessage('Email is required').isEmail().withMessage('Invalid email address');
const usernameChain = body('username').isLength({min: 1}).withMessage('Username is required');
const passwordChain = body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long');

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
            return res.status(422).json({errors: errors.array().map(error => error.msg)});
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
            return res.status(422).json({errors: errors.array().map(error => error.msg)});
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
                        res.status(401).json({message: 'Wrong Password'});
                    }
                });
            } else {
                res.status(401).json({message: 'User not found'});
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
            res.status(200).json({user: user, message: 'User found'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    });

module.exports = router;