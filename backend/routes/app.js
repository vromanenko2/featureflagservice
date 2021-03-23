import * as projectService from "../app/services/project.js";
import * as express from "express";

let router = express.Router();

router.get('/project/:projId', (req, res, next) => {
    const project = projectService.get(req.params.projId);
    res.json(project);
});

router.post('/project', (req, res, next) => {
    let project = req.body;
    projectService.save(project)
    res.json(project);
});

router.delete('/project/:projId', (req, res, next) => {
    projectService.remove(req.params.projId);
    res.json({});    
});

router.get('/project/:projId/version/:verId', function(req, res, next){
    res.json();
});

router.post('project/:projId/version', function(req, res, next){
    res.json();
});

export { router };

