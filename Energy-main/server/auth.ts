import { Request, Response } from "express";
import { UserModel } from "./models";
import { compare, hash } from 'bcrypt';
const myPrivateKey = "DrIFOD55QZhK4ZeXIdtcR3NoWmdV9nr0";
import { sign, verify, decode } from 'jsonwebtoken';


export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const user = await UserModel.findOne({
                "email": email,
            })
            if (!user) {
                return res.status(404).send('No user found');
            }
            const passwordMatching = await compare(password, user.password);
            if (!passwordMatching) {
                return res.status(401).send('Invalid username or password');
            }
            
            sign({
                "id": user._id,
                "role": user.role
            }, myPrivateKey, {
                expiresIn: '1d'
            }, function (err, token) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.json({
                    "token": token,
                    "id": user._id
                });
            });
        } catch (error) {
            return res.status(401).send('Invalid username or password');
        }

    } else {
        res.sendStatus(400);
    }
}

export function signup(req, res) {
    if (req.body.email && req.body.password) {
        hash(req.body.password, 10, function (err, hash) {
            if (err) {
                return res.sendStatus(500);
            }
            var user = new UserModel({
                "email": req.body.email,
                "password": hash
            });
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving user',
                        error: err
                    });
                }
                return res.json({
                    message: 'saved',
                    _id: user._id
                });
            });
        });
    } else {
        res.sendStatus(400);
    }
}




export function authorize(req, res, next) {
    const authorization = req.headers['authorization'];
    if (!authorization || typeof authorization !== "string" || !authorization.includes(" ")) {
        return res.status(401).json({
            "message": "token is required in header"
        });
    }
    const token = authorization.split(" ")[1];
    verify(token, myPrivateKey, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                "message": err.message
            });
        } else {
            res.locals.user = decode(token, { complete: true })?.payload;
            return next();
        }
    });
}
