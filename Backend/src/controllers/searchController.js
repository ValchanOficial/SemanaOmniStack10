const Dev = require('../model/devSchema');
const parseStringAsArray = require('../utils/parseString');
const messages = require('../utils/messages');

class SearchController {

    static search = async (req, res) => {
        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000 //10km
                }
            }
        });

        if(devs.length === 0){
            return res.status(404).json({ message: messages.NOT_FOUND_ALL() });
        }

        return res.json(devs);
    }
}

module.exports = SearchController