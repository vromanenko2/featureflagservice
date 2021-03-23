"use strict";

import * as projectRepo from "../repos/project.js";

async function get(projId) {
    return await projectRepo.get(projId).catch(e => { 
        console.log("repos/project.get error:");
        console.log(e);
    })
}

async function getAll() {
    return await projectRepo.getAll();
}

async function save(project) {
    let result = null;
    if (project) {
        if(project.id && project.id > 0) {
            result = await projectRepo.update(project).catch(e => { 
                console.log("repos/project.update error:"); 
                console.log(e); 
            })
        } else {
            result = await projectRepo.create(project).catch(e => { 
                console.log("repos/project.create error:"); 
                console.log(e); 
            })
        }
    }

    return result;
}

async function deleteItem(projId) {
    return await projectRepo.delete(projId);
}

export { 
    get, 
    getAll, 
    save, 
    deleteItem as delete 
};
