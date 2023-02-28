/* Lecture 13
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class MeshViewer extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;
    private character: gfx.Transform3;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.character = new gfx.Transform3();
    }

    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, .1, 20)
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 1, 0));
        this.cameraControls.setDistance(3);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);

        // Create a directional light
        const pointLight = new gfx.PointLight(new gfx.Color(1.25, 1.25, 1.25));
        pointLight.position.set(2, 1, 3)
        this.scene.add(pointLight);

        // Create the ground
        const ground = gfx.MeshFactory.createBox(5, 1, 5);
        ground.material.setColor(new gfx.Color(0, 0.5, 0.5));
        ground.position.y = -0.5;
        this.scene.add(ground);

        
    }

    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }

    private loadMorphMesh(meshFile1: string, meshFile2: string, textureFile: string): gfx.MorphMesh
    {
        // Create morph mesh
        const morphMesh = new gfx.MorphMesh();

        // Load and copy buffer data from the first mesh into the buffers
        gfx.ObjLoader.load(meshFile1, (loadedMesh: gfx.Mesh)=>{
            morphMesh.positionBuffer = loadedMesh.positionBuffer;
            morphMesh.normalBuffer = loadedMesh.normalBuffer;
            morphMesh.texCoordBuffer = loadedMesh.texCoordBuffer;
            morphMesh.colorBuffer = loadedMesh.colorBuffer;
            morphMesh.indexBuffer = loadedMesh.indexBuffer;
            morphMesh.vertexCount = loadedMesh.vertexCount;
            morphMesh.triangleCount = loadedMesh.triangleCount;
        });

        // Load and copy buffer data from the second mesh into the morph buffers
        gfx.ObjLoader.load(meshFile2, (loadedMesh: gfx.Mesh)=>{
            morphMesh.morphTargetPositionBuffer = loadedMesh.positionBuffer;
            morphMesh.morphTargetNormalBuffer = loadedMesh.normalBuffer;
        });

        // Load the texture and assign it to the material
        morphMesh.material.texture = new gfx.Texture(textureFile);

        return morphMesh;
    }
}