"use strict";

import { dbClient } from "./dbClient.js";

async function get(verId) {
    return await dbClient.version.findUnique({
        where: {
            id: verId
        }
    });
};

async function getFull(verId) {
    return await dbClient.version.findUnique({
        where: {
            id: verId
        },
        include: {
            featureFlagValues: {
                include: {
                    featureFlag
                }
            }
        }
    });
};

async function getAll(prjId) {
    return await dbClient.version.findMany({
        where: {
            projectId: prjId
        }
    });
}

async function create(version){
    return await dbClient.version.create({ data: version });
}

async function update(version){
    return await dbClient.version.update({ 
        where: { 
            id: version.id 
        }, 
        data: { ...version } });
}

async function delete_from_db(verId) {
    return await dbClient.version.delete({ where: { id: verId }});
}

export { get, getAll, create, update, delete_from_db as delete };
