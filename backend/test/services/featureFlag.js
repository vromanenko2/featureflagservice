"use strict";

import assert from "assert";
import * as featureFlagService from "../../app/services/featureFlag.js";
import * as projectService from "../../app/services/project.js";

describe("featureFlagService", async() => {

    let project = null;
    let savedFeatureFlagId = -1;

    before(async() => {
        project = await projectService.save({ "name": "test-flag-project"});
    });

    after(async() => {
        await projectService.delete(project.id);
    });

    describe("saveProjectFlag create", function() {
        it("should return created feature flag object with new feature flag id", async() => {
            const featureFlag = { "name": "unit_test_prj", "projectId": project.id, "defaultValue": true };
            const savedFeatureFlag = await featureFlagService.saveProjectFlag(featureFlag);
            savedFeatureFlagId = savedFeatureFlag.id;

            assert.strictEqual(savedFeatureFlag.id > 0, true);
        })
    });

    describe("getProjectFlag", function() {
        it("get project feature flag successfully", async() => {
            if (savedFeatureFlagId > 0) {
                const featureFlag = await featureFlagService.getProjectFlag(savedFeatureFlagId);

                assert.strictEqual(featureFlag !== null, true);
                assert.strictEqual(featureFlag.id === savedFeatureFlagId, true);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("feature flag not found", async() => {
            const featureFlag = await featureFlagService.getProjectFlag(-1);
            assert.strictEqual(featureFlag == null, true);
        })
    });

    describe("getProjectFlags", function() {
        it("get all project feature flags successfully", async() => {
            if (project.id > 0 && savedFeatureFlagId > 0) {
                const featureFlags = await featureFlagService.getProjectFlags(project.id);

                assert.strictEqual(featureFlags !== null, true);
                assert.strictEqual(featureFlags.length === 1, true);
                assert.strictEqual(featureFlags[0].id === savedFeatureFlagId, true);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("feature flags not found", async() => {
            const featureFlags = await featureFlagService.getProjectFlags(-1);
            assert.strictEqual(featureFlags !== null, true);
            assert.strictEqual(Array.isArray(featureFlags), true);
            assert.strictEqual(featureFlags.length == 0, true);
        });
    });

    describe("saveProjectFlag update", function() {
        it("should return update feature flag object", async() => {
            if (project.id > 0 && savedFeatureFlagId > 0) {
                const featureFlag = await featureFlagService.getProjectFlag(savedFeatureFlagId);
                const newName = featureFlag.name + featureFlag.id;
                featureFlag.name = newName;
                const updatedFeatureFlag = await featureFlagService.saveProjectFlag(featureFlag);
                console.log(updatedFeatureFlag);

                assert.strictEqual(updatedFeatureFlag !== null, true);
                assert.strictEqual(updatedFeatureFlag.id === savedFeatureFlagId, true);
                assert.strictEqual(updatedFeatureFlag.name === newName, true);
                assert.strictEqual(updatedFeatureFlag.projectId === project.id, true);
            } else {
                assert.fail("wrong test condition");
            }
        });
    });

    describe("delete", function() {
        it("feature flag removed successfully", async() => {
            if(savedFeatureFlagId > 0) {
                const removeResult = await featureFlagService.delete(savedFeatureFlagId);
                assert.strictEqual(removeResult.id, savedFeatureFlagId);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("try to remove non existent feature flag", async() => {
            await featureFlagService.delete(-1).catch((e) => {
                const errorMessage = "" + e.meta.cause;
                assert.ok(errorMessage);
            })
        });
    });
});