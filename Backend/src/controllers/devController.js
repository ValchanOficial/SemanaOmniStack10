const axios = require('axios');
const Dev = require('../model/devSchema');
const parseStringAsArray = require('../utils/parseString');
const messages = require('../utils/messages');

class DevController {

    static findAll = async (req, res) => {
        const devs = await Dev.find();
        if(devs.length === 0){
            return res.status(404).json({ message: messages.NOT_FOUND_ALL() });
        }
        return res.json(devs);
    }
    
    static findOne = async (req, res) => {
        const id = req.params.id;
        const dev = await Dev.findOne({ _id: id });
        if(!dev){
            return res.status(404).json({ message: messages.NOT_FOUND(id) })
        }
        return res.status(200).json(dev);
    }

    static create = async (req, res) => {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });
        if(!dev){
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
    
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
            return res.status(201).json({ message: messages.CREATED(dev) });
        }

        return res.status(200).json(dev);
    }

    static update = async (req, res) => {
        const id = req.params.id;
        const { github_username, techs, latitude, longitude } = req.body;

        const dev = await Dev.findOne({ _id: id });
        if(!dev){
            return res.status(404).json({ message: messages.NOT_FOUND(id) });
        }

        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const response = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = response.data;
        
        await Dev.updateOne({
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
        
        return res.status(202).json({ message: messages.ACCEPTED_UPDATE(id) });
    }

    static delete = async (req, res) => {
        const id = req.params.id;
        const dev = await Dev.findOne({ _id: id })
        if(dev !== null){
            const del = await Dev.deleteOne({ _id: id });
            if(del.deletedCount === 0){
                return res.status(500).json({ message: messages.SERVER_ERROR() });
            }
            return res.status(202).json({ message: messages.ACCEPTED_DELETE() });
        }
        return res.status(404).json({ message: messages.NOT_FOUND(id) });
    }
}

module.exports = DevController