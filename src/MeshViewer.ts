/* Lecture 13
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class MeshViewer extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
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
}