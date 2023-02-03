const mockFilePath = './knack/mock_application.json';
const cleanFilePath = './clean_application.json';
const md5 = require('md5');

function duplicateFields(fields){
    const map = new Map();
    var tempid = '';
    var hash = '';
    for(const [key, field] of Object.entries(fields)){
        tempid = field._id;
        field._id = '';
        hash = md5(JSON.stringify(field));
        field._id = tempid;

        if(!map.has(hash)){
            console.log('Adding:  _id = ' + tempid);
            map.set(hash, tempid);
        }
        else{
            console.log('Removing: _id = ' + tempid);
            console.log(key);
            delete fields[key];
        }
    }
    return fields;
}

function duplicateObjects(objects){
    const map = new Map();
    var tempid = '';
    var hash = '';
    for(const [key, object] of Object.entries(objects)){
        tempid = object._id;
        object._id = '';
        hash = md5(JSON.stringify(object));
        object._id = tempid;
        if(!map.has(hash)){
            console.log('Adding:  _id = ' + tempid);
            map.set(hash, tempid);
            object.fields = duplicateFields(object.fields);
        }
        else{
            console.log('Removing: _id = ' + tempid);
            console.log(key);
            delete objects[key];
        }
    }
    return objects;
}

function duplicateViews(views){
    const map = new Map();
    var tempid = '';
    var hash = '';
    for(const [key, view] of Object.entries(views)){
        tempid = view._id;
        view._id = '';
        hash = md5(JSON.stringify(view));
        view._id = tempid;
        if(!map.has(hash)){
            console.log('Adding:  _id = ' + tempid);
            map.set(hash, tempid);
        }
        else{
            console.log('Removing: _id = ' + tempid);
            console.log(key);
            delete views[key];
        }
    }
    return views;
}

function duplicateScenes(scenes){
    const map = new Map();
    var tempid = '';
    var hash = '';
    for(const [key, scene] of Object.entries(scenes)){
        tempid = scene._id;
        scene._id = '';
        hash = md5(JSON.stringify(scene));
        scene._id = tempid;
        if(!map.has(hash)){
            console.log('Adding:  _id = ' + tempid);
            map.set(hash, tempid);
            scene.views = duplicateViews(scene.views);
        }
        else{
            console.log('Removing: _id = ' + tempid);
            console.log(key);
            delete scenes[key];
        }
    }
    return scenes;
}

function main(){
    const inputFile = require(mockFilePath);
    const jsonInput = JSON.parse(JSON.stringify(inputFile));

    jsonInput.versions[0].objects = duplicateObjects(jsonInput.versions[0].objects);

    jsonInput.versions[0].scenes = duplicateScenes(jsonInput.versions[0].scenes);

    const fs = require('fs');
    fs.writeFile(cleanFilePath, JSON.stringify(jsonInput, null, 4), err => {
        if(err){throw err;}
    })
}

main();