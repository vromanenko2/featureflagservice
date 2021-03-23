"use strict";

import * as versionRepo from "../repos/version.js";
import * as featureFlagRepo from "../repos/featureFlag.js";
import * as featureFlagValueRepo from "../repos/featureFlagValue.js";

async function get(verId) {
    return await versionRepo.get(verId).catch(e => { 
        console.log("repos/version.get error:");
        console.log(e);
    })
}

async function getFull(verId) {
    return await versionRepo.get(verId).catch(e => { 
        console.log("repos/version.get error:");
        console.log(e);
    })
}

async function getAll(prjId) {
    return await versionRepo.getAll(prjId);
}

async function save(version) {
    var result = null;
    if (version) {
        if(version.projectId && version.id && version.id > 0) {
            result = await versionRepo.update(version).catch(e => { 
                console.log("repos/version.update error:"); 
                console.log(e); 
            })
        } else if (version.projectId > 0) {
            result = await versionRepo.create(version).catch(e => { 
                console.log("repos/version.create error:"); 
                console.log(e); 
            });
            if (result && result.id > 0) {
                const projectFeatureFlags = await featureFlagRepo.getProjectFlags(result.projectId);
                for(let i = 0; i < projectFeatureFlags.length; i++){
                    const featureFlag = projectFeatureFlags[i];
                    const versionFlag = {
                        "projectId": featureFlag.projectId,
                        "versionId": result.id,
                        "flagId": featureFlag.id,
                        "value": featureFlag.defaultValue
                    }
                    await featureFlagValueRepo.create(versionFlag);
                }
            }
        } else {
            //project id is requires
        }
    }

    return result;
}

async function deleteItem(verId) {
    return await versionRepo.delete(verId);
}

export { get, getAll, save, deleteItem as delete };
