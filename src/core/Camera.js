import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
import CameraMesh from "../meshes/CameraMesh";
import Object3D from "./Object3D";
import DummyMesh from "../meshes/DummyMesh";
import Line from "../meshes/Line";
import Color from "../math/Color";

export default class Camera extends Object3D
{
    constructor(name) {
        super(name);

        this.position.x = 15;
        this.position.y = 15;
        this.position.z = 15;
        
        // Defines if camera is targeted.
        this.targeted = false;

        this.fieldOfView = 45;
        this.near = 0.1;
        this.far = 20000;
        this.aspectRatio = 1;

        // Creates line to display camera direction.
        let lineObj = new Object3D();
        let lineMesh = new Line({color: new Color(1, 0.75, 0.1, 1)});
        lineObj.addMesh(lineMesh);
        this.addHelper(lineObj, false);

        // Create helper for camera.
        let cameraObject = new Object3D('Camera');
        let cameraMesh = new CameraMesh({size: 1});
        cameraObject.addMesh(cameraMesh);
        this.addHelper(cameraObject, false);


        // Create helper for target.
        this.target = new Object3D('Target');
        let targetMesh = new DummyMesh({
            size: 0.1
        });
        this.target.addMesh(targetMesh);
        this.addHelper(this.target, true);
        

        // Change camera helper orientation on camera orientation change.
        this.rotation.onChange(() => {
            cameraObject._rotationQ.copyValuesFrom(this._rotationQ);
        });

        this.position.onChange(v => {
            cameraObject.position.copyValuesFrom(v);
            lineMesh.start.copyValuesFrom(v);

            // Update camera transform depending on target position.
            if (this.targeted) {
                lookAtTarget.call(this);
            }
        });
        this.position.x = this.position.x;
 
        this.target.position.onChange(v => {
            // Update line end position.
            lineMesh.end.copyValuesFrom(v);

            // Update camera transform depending on target position.
            if (this.targeted) {
                lookAtTarget.call(this);
            }
        });
        this.target.x = this.target.x;

        function lookAtTarget() {
            let direction = this.position.clone().sub(this.target.position);
            let lookAtMatrix= Matrix4.lookAt(direction);
            this._rotationQ.setFromRotationMatrix(lookAtMatrix);
        }

        lookAtTarget.call(this);
    }


    getCameraMatrix() {
        return Matrix4.createTranslation(this.position)
                .multiply(Matrix4.createFromQuaternion(this._rotationQ));
    }


    getViewMatrix() {
        return this.getCameraMatrix().clone().inverse();
    }


    getProjectionMatrix() {
        return Matrix4.createPerspective(this.fieldOfView, this.near, this.far, this.aspectRatio);
    }
}
