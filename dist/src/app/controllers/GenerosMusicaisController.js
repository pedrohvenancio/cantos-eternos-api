"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const GenerosMusicaisRepository_1 = require("../repositories/GenerosMusicaisRepository");
const isGeneroMusical_1 = require("../utils/validators/generosMusicais/isGeneroMusical");
const idValid_1 = require("../utils/validators/idValid");
const dotenv = require('dotenv');
dotenv.config();
class GenerosMusicaisController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield GenerosMusicaisRepository_1.default.findAll();
                return res.status(result.code).json(result.data);
            }
            catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, idValid_1.default)(req.params.id))
                    return res.status(400).json({ error: 'Invalid ID' });
                const result = yield GenerosMusicaisRepository_1.default.findById(new mongodb_1.ObjectId(req.params.id));
                return res.status(result.code).json(result.data);
            }
            catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const api_key = process.env.NEXT_PUBLIC_TOKEN_SECRET;
            if (api_key == undefined || api_key == null)
                return res.status(500).json({ error: `Internal Server Error` });
            try {
                if (token === api_key) {
                    const genero = req.body;
                    if (!(0, isGeneroMusical_1.default)(genero))
                        return res.status(400).json({ error: 'Object is not of the type: Genero Musical' });
                    const result = yield GenerosMusicaisRepository_1.default.create(genero);
                    return res.status(result.code).json(result.data);
                }
                return res.status(401).json({ error: 'Unauthorized' });
            }
            catch (error) {
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const api_key = process.env.NEXT_PUBLIC_TOKEN_SECRET;
            if (api_key == undefined || api_key == null)
                return res.status(500).json({ error: `Internal Server Error` });
            try {
                if (token === api_key) {
                    if (!(0, idValid_1.default)(req.params.id))
                        return res.status(400).json({ error: 'Invalid ID' });
                    const genero = req.body;
                    if (genero._id) {
                        delete genero._id;
                    }
                    const result = yield GenerosMusicaisRepository_1.default.update(new mongodb_1.ObjectId(req.params.id), genero);
                    return res.status(result.code).json(result.data);
                }
                return res.status(401).json({ error: 'Unauthorized' });
            }
            catch (error) {
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const api_key = process.env.NEXT_PUBLIC_TOKEN_SECRET;
            if (api_key == undefined || api_key == null)
                return res.status(500).json({ error: `Internal Server Error` });
            try {
                if (token === api_key) {
                    if (!(0, idValid_1.default)(req.params.id))
                        return res.status(400).json({ error: 'Invalid ID' });
                    const result = yield GenerosMusicaisRepository_1.default.delete(new mongodb_1.ObjectId(req.params.id));
                    return res.status(result.code).json(result.data);
                }
                return res.status(401).json({ error: 'Unauthorized' });
            }
            catch (error) {
                return res.status(500).json('Internal Server Error');
            }
        });
    }
}
exports.default = new GenerosMusicaisController();
