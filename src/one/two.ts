import { BlinnPhongMaterial, Camera, Color, DirectLight, Entity, GLTFResource, MeshRenderer, PrimitiveMesh, Scene, Script, Vector3, WebGLEngine } from "oasis-engine"

import { OrbitControl } from "@oasis-engine/controls";

class Rotate extends Script {
    private _tempVector = new Vector3(0, 1, 0);
    onUpdate(deltaTime: number): void {
        // console.log(deltaTime);
        this.entity.transform.rotate(this._tempVector);
    }
}

class Two3d {
    engine: WebGLEngine
    scene!: Scene
    rootEntity!: Entity
    camera!: Camera
    constructor(selector: String) {
        this.engine = new WebGLEngine(selector)  // 创建引擎实例
        this.scene
        this.rootEntity
        this.camera
        this.init()
        this.anmate()
    }
    init() {
        this.initScene()    //创建场景根节点
        this.initCamera()   //创建场景根节点
        this.initLight()    //创建光照
        this.initMesh()     //创建立方体
    }
    initScene() {
        this.engine.canvas.resizeByClientSize()   // 创建引擎实例
        this.scene = this.engine.sceneManager.activeScene
        this.scene.background.solidColor.setValue(0, 0, 0, 0)   //场景背景色
        this.rootEntity = this.scene.createRootEntity('root') // Get root entity of current scene
    }
    initCamera() {
        let cameraEntity = this.rootEntity.createChild("camera_entity")
        cameraEntity.transform.position = new Vector3(0, 5, 10)
        cameraEntity.transform.lookAt(new Vector3(0, 0, 0))
        cameraEntity.addComponent(OrbitControl)
        this.camera = cameraEntity.addComponent(Camera)

    }
    initLight() {
        let lightEntity = this.rootEntity.createChild('light');
        let directLight = lightEntity.addComponent(DirectLight)
        directLight.color = new Color(1.0, 1.0, 1.0)
        directLight.intensity = 0.5
        lightEntity.transform.rotation = new Vector3(45, 45, 45)

        let ambientLight = this.scene.ambientLight
        ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1)
        ambientLight.diffuseIntensity = 0.5
    }
    initMesh() {
        this.engine.resourceManager
            .load<GLTFResource>("https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf")
            .then((gltf) => {
                const duck = gltf.defaultSceneRoot
                this.rootEntity.addChild(duck)
                duck.addComponent(Rotate)
                // this.rootEntity.addChild(gltf.defaultSceneRoot);
            });
    }
    anmate() {
        this.engine.run();
    }
}
export default Two3d