import { SkyboxShader } from './SkyboxShader';

export class SkyBox {
    private skybox: BABYLON.AbstractMesh;
    private skyboxShader: SkyboxShader;

    constructor(scene: BABYLON.Scene, size: BABYLON.ISize) {
        let skybox = BABYLON.Mesh.CreateBox('skyBox', 1000.0, scene);
        skybox.infiniteDistance = true;

        this.skyboxShader = new SkyboxShader(scene, size);
        skybox.material = this.skyboxShader.shader;
        this.skybox = skybox;
    }

    resize(size: BABYLON.ISize) {
        this.skyboxShader.resize(size);
    }

    dispose() {
        this.skybox.dispose();
        this.skyboxShader.shader.dispose();
        this.skyboxShader.dispose();
    }
}