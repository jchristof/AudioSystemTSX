import * as React from 'react';
import * as BABYLON from 'babylonjs';
import { SkyBox } from './SkyBox';
import { BabylonScene, SceneEventArgs } from './BabylonScene';

export default class PageWithScene extends React.Component<{}, {}> {
    public skybox: SkyBox;

    onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;

        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        this.skybox = new SkyBox(scene, canvas as BABYLON.ISize);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    onResize = () => {
        this.skybox.resize({width: window.innerWidth, height: window.innerHeight});
    }

    render() {               
        return (
            <BabylonScene onSceneMount={this.onSceneMount} onResize={this.onResize} />
        );
    }
}