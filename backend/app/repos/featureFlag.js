"use strict";

import { dbClient } from "./dbClient.js";

async function get(flagId) {
    return await dbClient.featureFlag.findUnique({
        where: {
            id: flagId
        }
    });
};

async function getProjectFlags(prjId) {
    return await dbClient.featureFlag.findMany({
        where: {
            projectId: prjId
        }
    });
}

async function getVersionFlags(verId) {
    return await dbClient.featureFlag.findMany({
        where: {
            projectId: verId
        }
    });
}

async function create(flag){
    return await dbClient.featureFlag.create({ data: flag });
}

async function update(flag){
    return await dbClient.featureFlag.update({ 
        where: { 
            id: flag.id 
        }, 
        data: { ...flag } });
}

async function delete_from_db(flagId) {
    return await dbClient.featureFlag.delete({ where: { id: flagId }});
}

export { 
    get, 
    getProjectFlags, 
    create, 
    update, 
    delete_from_db as delete 
};
