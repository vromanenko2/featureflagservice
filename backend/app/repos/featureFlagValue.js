"use strict";

import { dbClient } from "./dbClient.js";

async function get(prjId, verId, flagId) {
    return await dbClient.featureFlagValue.findUnique({
        where: {
            projectId: prjId,
            versionId: verId,
            flagId: flagId
        }
    });
};

async function getFlags(prjId, verId) {
    return await dbClient.featureFlagValue.findMany({
        where: {
            projectId: prjId,
            versionId: verId
        }
    });
}

async function create(flagValue){
    return await dbClient.featureFlagValue.create({ data: flagValue });
}

async function update(flagValue){
    return await dbClient.featureFlagValue.update({ 
        where: { 
            projectId: flagValue.projectId,
            versionId: flagValue.versionId,
            flagId: flagValue.flagId 
        }, 
        data: { ...flag } });
}

export { 
    get, 
    getFlags,
    create, 
    update, 
};
