"use strict";

import * as featureFlagRepo from "../repos/featureFlag.js";
import * as versionRepo from "../repos/version.js";

async function getProjectFlag(flagId) {
    return await featureFlagRepo.get(flagId).catch(e => { 
        console.log("repos/featureFlag.get error:");
        console.log(e);
    })
}

async function getProjectFlags(prjId) {
    return await featureFlagRepo.getProjectFlags(prjId);
}

async function saveProjectFlag(flag) {
    let result = null;
    if (flag) {
        if(flag.projectId && flag.id && flag.id > 0) {
            result = await featureFlagRepo.update(flag).catch(e => { 
                console.log("repos/featureFlag.update error:"); 
                console.log(e); 
            })
        } else if (flag.projectId > 0) {
            result = await featureFlagRepo.create(flag).catch(e => { 
                console.log("repos/featureFlag.create error:"); 
                console.log(e); 
            })
        } else {
            //project id is requires
        }
    }

    return result;
}

async function createVersionsFlag(prjId, flagId) {
    const versions = await versionRepo.getAll(prjId);
}

async function deleteItem(flagId) {
    return await featureFlagRepo.delete(flagId);
}

export { 
    getProjectFlag, 
    getProjectFlags, 
    saveProjectFlag, 
    deleteItem as delete 
};
