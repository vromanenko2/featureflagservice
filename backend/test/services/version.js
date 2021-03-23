"use strict";

import assert from "assert";
import { dbClient } from "../../app/repos/dbClient.js";
import * as projectService from "../../app/services/project.js";
import * as featureFlagService from "../../app/services/featureFlag.js";
import * as versionService from "../../app/services/version.js";

describe("versionService", function() {

    let project = null;
    let savedVersionId = -1;

    before(async() => {
        project = await projectService.save({ "name": "test-flag-project"});
        const featureFlag1 = await featureFlagService.saveProjectFlag({ "projectId": project.id, "name": "feature-flag-1", "defaultValue": true })
        const featureFlag2 = await featureFlagService.saveProjectFlag({ "projectId": project.id, "name": "feature-flag-2", "defaultValue": false })
    });

    after(async() => {
        await dbClient.$executeRaw(`DELETE FROM Projects WHERE id = ${ project.id };`);
    });

    describe("save create", function() {
        it("should return created version object with new version id", async() => {
            const version = { "name": "unit_test_version", "projectId": project.id };
            const savedVersion = await versionService.save(version);

            assert.strictEqual(savedVersion.id > 0, true);
            savedVersionId = savedVersion.id;
        })
    });

    describe("get", function() {
        it("get version successfully", async() => {
            if (savedVersionId > 0) {
                const version = await versionService.get(savedVersionId);

                assert.strictEqual(version !== null, true);
                assert.strictEqual(version.id === savedVersionId, true);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("version not found", async() => {
            const version = await versionService.get(-1);
            assert.strictEqual(version == null, true);
        })
    });
    /*
    describe("save update", function() {
        it("should return updated project", async() => {
            if (savedProjId > 0) {
                const project = await projectService.get(savedProjId);
                const newName = project.name + project.id;
                project.name = newName;
                const updateProject = await projectService.save(project);
                assert.strictEqual(updateProject !== null, true);
                assert.strictEqual(updateProject.id === savedProjId, true);
                assert.strictEqual(updateProject.name === newName, true);
            } else {
                assert.fail("wrong test condition");
            }
        });
    });

    describe("delete", function() {
        it("project removed successfully", async() => {
            if(savedProjId > 0) {
                const removeResult = await projectService.delete(savedProjId);
                assert.strictEqual(removeResult.id, savedProjId);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("try to remove non existent project", async() => {
            await projectService.delete(-1).catch((e) => {
                const errorMessage = "" + e.meta.cause;
                assert.ok(errorMessage);
            })
        });
    });
    */
});