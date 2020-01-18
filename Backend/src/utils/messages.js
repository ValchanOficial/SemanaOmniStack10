class Message {
    static CREATED = (dev) => `Created - Dev created ID: ${dev._id}`;
    static ACCEPTED_DELETE = () => `Accepted - Dev deleted`;
    static ACCEPTED_UPDATE = (id) => `Accepted - Dev updated ID: ${id}`;
    static NOT_FOUND = (id) => `Not Found - Dev ID: ${id}`;
    static NOT_FOUND_ALL = () => `Not Found - Devs`;
    static SERVER_ERROR = () => `Internal Server Error - Something is wrong`;
}

module.exports = Message;