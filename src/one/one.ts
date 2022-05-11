import { BlinnPhongMaterial, Camera, Color, DirectLight, Entity, MeshRenderer, PrimitiveMesh, Scene, Script, Vector3, WebGLEngine } from "oasis-engine"

import { OrbitControl } from "@oasis-engine/controls";

class One3d {
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
        this.scene.background.solidColor.setValue(1, 1, 1, 1)   //场景环境光
        this.rootEntity = this.scene.createRootEntity('root') // Get root entity of current scene
    }
    initCamera() {
        let cameraEntity = this.rootEntity.createChild("camera_entity")
        cameraEntity.transform.position = new Vector3(0, 5, 10)
        cameraEntity.transform.lookAt(new Vector3(0, 0, 0))

        this.camera = cameraEntity.addComponent(Camera)
        cameraEntity.addComponent(OrbitControl)
        
    }
    initLight() {
        let lightEntity = this.rootEntity.createChild('light');
        let directLight = lightEntity.addComponent(DirectLight)
        directLight.color = new Color(1.0, 1.0, 1.0)
        directLight.intensity = 0.5

        lightEntity.transform.rotation = new Vector3(45, 45, 45)
    }
    initMesh() {

        let cubEntity = this.rootEntity.createChild('cube');
        let cube = cubEntity.addComponent(MeshRenderer)
        cube.mesh = PrimitiveMesh.createCuboid(this.engine, 2, 2, 2);
        console.log(cube);

        cube.setMaterial(new BlinnPhongMaterial(this.engine))
    }
    anmate() {
        this.engine.run();
    }
}
export default One3d