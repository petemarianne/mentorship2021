const firebase = jest.createMockFromModule('firebase');

const docData = { data: "MOCK_DATA" };
const docResult = {
    data: () => docData
};
const where = jest.fn(() => {return {get}});
const get = jest.fn().mockResolvedValue(docResult);
const set = jest.fn();
const doc = jest.fn(() => {
    return {
        set,
    };
});
const docs = jest.fn(() => {
    return [doc]
})
//const collection = jest.fn().mockImplementation(() => {throw new Error('error')});
const collection = () => {
    return {
        get,
        where,
        doc,
        docs,
    }
}

const app = {};
const db = {collection};

module.exports = { app, db };
/*const app = firebase.initializeApp({});
const db = app.firestore();
export {app,db}*/
