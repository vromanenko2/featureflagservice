"use strict";

import assert from "assert";
import * as projectService from "../../app/services/project.js";

describe("projectService", function() {

    let savedProjId = -1;

    describe("save create", function() {
        it("should return created project object with new project id", async() => {
            const project = { "name": "unit_test_prj"};
            const savedProject = await projectService.save(project);

            assert.strictEqual(savedProject.id > 0, true);
            savedProjId = savedProject.id;
        })
    });

    describe("get", function() {
        it("get project successfully", async() => {
            if (savedProjId > 0) {
                const project = await projectService.get(savedProjId);

                assert.strictEqual(project !== null, true);
                assert.strictEqual(project.id === savedProjId, true);
            } else {
                assert.fail("wrong test condition");
            }
        });

        it("project not found", async() => {
            const project = await projectService.get(-1);
            assert.strictEqual(project == null, true);
        })
    });

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
});