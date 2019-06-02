import { v4 as uuid } from "uuid";

let users = {
    ishan: {
        name: "Ishan Saxena",
        contacts: [{ chatId: 'a', userName: "peter" }, { chatId: 'b', userName: "brandon" }, { chatId: 'c', userName: "harry" }]
    },
    peter: {
        name: "Peter Parker",
        contacts: [{ chatId: 'a', userName: "ishan" }, { chatId: 'd', userName: "brandon" }]
    },
    harry: {
        name: "Harry Potter",
        contacts: [{ chatId: 'c', userName: "ishan" }, { chatId: 'e', userName: "brandon" }]
    },
    brandon: {
        name: "Brandon Eich",
        contacts: [{ chatId: 'b', userName: "ishan" }, { chatId: 'd', userName: "peter" }, { chatId: 'e', userName: "harry" }]
    },
    hulk: {
        name: "Bruce Banner",
        contacts: []
    }
};
let chats = { a: [], b: [{ type: "TEXT", createdOn: 1559142274000, from: "ishan", to: "brandon", data: "Sample text message" }, { type: "TEXT", createdOn: 1559142275000, from: "brandon", to: "ishan", data: "Sample text message 2" }], c: [], d: [], e: [] };
const FAILED = "FAILED";
const SUCCESS = "SUCCESS";

// Utility functions
// All the UTILITY functions assume the best case scenario all the error handling should be done in the Mock API functions.
function exists(userName) {
    return !!users[userName];
}

function areConnected(userName, contactUserName) {
    return users[userName] && users[userName].contacts && !!users[userName].contacts.find(contact => contact.userName === contactUserName);
}

function connect(userName, contactUserName) {
    if (exists(userName) && exists(contactUserName)) {
        const chatId = uuid();
        users[userName].contacts.push({ chatId, userName: contactUserName });
        users[contactUserName].contacts.push({ chatId, userName });
        chats[chatId] = [];
    }
}

function getChatId(userName, contactUserName) {
    return users[userName].contacts.find(contact => contact.userName === contactUserName).chatId;
}


// Mock API functions for USER
export function addUser(userName) {
    if (exists(userName)) {
        return Promise.reject({ status: FAILED, err: "User with this name already exists" });
    }
    users[userName] = { contacts: [] };
    return Promise.resolve({ status: SUCCESS, data: { userName, contacts: [] } });
}

export function userDoesExists(userName) {
    return Promise.resolve({ exists: exists(userName) });
}

export function addContact(userName, contactUserName) {
    if (!exists(userName))
        return Promise.reject({ status: FAILED, err: `No user exists with username : ${userName}` });
    if (!exists(contactUserName))
        return Promise.reject({ status: FAILED, err: `No user exists with username ${contactUserName}` });
    if (areConnected(userName, contactUserName))
        return Promise.reject({ status: FAILED, err: `You are already connected to ${contactUserName}` });

    connect(userName, contactUserName);
    return Promise.resolve({ status: SUCCESS, data: users[contactUserName] });
}

export function getUser(userName) {
    if (!exists(userName))
        return Promise.reject({ status: FAILED, err: `No user exists with username: ${userName}` });
    const { contacts, name } = users[userName];
    return Promise.resolve({ status: SUCCESS, data: { userName, name, contacts } });
}

// Mock API functions for CHATS
export function getMessages(chatId) {
    if (!!chats[chatId])
        return Promise.resolve({ status: SUCCESS, data: chats[chatId] });
    return Promise.reject({ status: FAILED, err: `Invalid chatid : ${chatId}` });
}

function send(type, from, to, data) {
    if (!exists(from))
        return Promise.reject({ status: FAILED, err: `Invalid username : ${from}` });
    if (!exists(to))
        return Promise.reject({ status: FAILED, err: `Invalid username : ${to}` });
    if (!areConnected(from, to))
        return Promise.reject({ status: FAILED, err: `Users ${from} and ${to} are not connected` });
    const chatId = getChatId(from, to);
    const messageBody = { type, data, createdOn: (new Date()).getTime(), from, to };
    if (chats[chatId]) {
        chats[chatId].push(messageBody);
        return Promise.resolve({ status: SUCCESS, data: messageBody });
    }
    return Promise.reject({ status: FAILED, err: `Chat id ${chatId} not exists` });
}

export function sendMessage(from, to, message) {
    return send("TEXT", from, to, message);
}

export function sendAudioMessage(from, to, url) {
    return send("AUDIO", from, to, url);
}