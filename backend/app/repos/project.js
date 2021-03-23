"use strict";

import { dbClient } from "./dbClient.js";

async function get(prjId) {
    return await dbClient.project.findUnique({
        where: {
            id: prjId
        }
    });
};

async function getAll() {
    return await dbClient.project.findMany();
}

async function create(project){
    return await dbClient.project.create({ data: project });
}

async function update(project){
    return await dbClient.project.update({ 
        where: { 
            id: project.id 
        }, 
        data: { ...project } });
}

async function delete_from_db(prjId) {
    return await dbClient.project.delete({ where: { id: prjId }});
}

export { 
    get, 
    getAll, 
    create, 
    update, 
    delete_from_db as delete 
};
