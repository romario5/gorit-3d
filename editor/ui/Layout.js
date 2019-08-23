UI.register({
    namespace: 'Gorit3D/layout',

    name: 'Layout',

    scheme: {
        wrap: {
            topBar: {
                fileInp: '@input [type = file]'
            },
            panelsWrap: {
                contentWrap: {
                    content: {
                        leftPanel: '<<< Layers list',
                        viewport: ''
                    },
                    bottomBar: ''
                },
                rightPanel: {
                    position: '<<< Position',
                    rotation: '<<< Rotation'
                }
            }
            
        }
    },

    params: {
        app: null
    },

    methods: {
        getApp() {
            return this.params().app;
        },

        initApp() {
            let app = this.params().app;
            if (app == null) return;


            app.init(this.viewport.node());

            let scene = app.currentScene;

            // Create additional camera.
            let camera = new NAT.Camera('Camera');
            camera.targeted = true;
            scene.addObject(camera);
            camera.position.setValues(-7, 10, 7);

            // Create lights.
            let light = new NAT.lights.PointLight({
                intensity: 1
            });
            light.position.setValues(-10, 10, 5);
            scene.addObject(light);

            let q = new NAT.Quaternion();
            let up = new NAT.Vector3(0, 1, 0);
            let pos = new NAT.Vector3(0, -1, 0);
            
            new NAT.FramesLoop(dt => {
                q.setFromAxisAngle(up, 0.0005*dt);

                pos.copyValuesFrom(camera.position)
                    .sub(camera.target.position)
                    .applyQuaternion(q)
                    .add(camera.target.position);

                camera.position.copyValuesFrom(pos);
            });

            let viewport = new NAT.Viewport({
                name: 'Additional',
                x: 0,
                y: 0,
                width: 400,
                height: 200,
                background: new NAT.Color(1,1,1,1),
                handleEvents: false
            });
            viewport.camera = camera;
            app.addViewport(viewport);
            console.log(app);

            let layersList = this.leftPanel.inclusion();
            layersList.setScene(scene);
        }
    },

    onRender(inst, params) {
        inst.initApp();

        inst.fileInp.on('change', () => {
            NAT.readFile(inst.fileInp.node().files[0]).then(mesh => {
                let obj = new NAT.Object3D(mesh.name);
                obj.addMesh(mesh);
                
                let scene = params.app.currentScene;
                let layer = scene.currentLayer;

                layer.addObject(obj);

                inst.leftPanel.inclusion().update();

                console.log(obj);
            });
        });
    },

    styles: {
        wrap: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Theme('colors/bg').default('#f9f9f9'),
            height: '100%',

            topBar: {
                display: 'flex',
                flexShrink: 0,
                height: '3rem',
                borderBottom: '1px solid #111',
                position: 'relative',
                backgroundColor: Theme('colors/bg').default('#f9f9f9'),
                zIndex: 5
            },
            
            panelsWrap: {
                display: 'flex',
                height: 'calc(100% - 3rem)',

                contentWrap: {
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,

                    content: {
                        display: 'flex',
                        flexGrow: 1,
                        height: 'calc(100% - 15rem)',

                        leftPanel: {
                            display: 'flex',
                            flexDirection: 'column',
                            width: '20rem',
                            flexShrink: 0,
                            flexGrow: 0,
                            borderRight: '1px solid #111',
                            position: 'relative',
                            zIndex: 1
                        },

                        viewport: {
                            flexGrow: 1,
                            background: '#fff'
                        }
                    },

                    bottomBar: {
                        display: 'flex',
                        height: '15rem',
                        flexShrink: 0,
                        flexGrow: 0,
                        borderTop: '1px solid #111',
                        position: 'relative',
                        backgroundColor: Theme('colors/bg').default('#f9f9f9'),
                        zIndex: 1
                    }
                },

                rightPanel: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20rem',
                    flexShrink: 0,
                    flexGrow: 0,
                    borderLeft: '1px solid #111',
                    position: 'relative',
                    backgroundColor: Theme('colors/bg').default('#202020'),
                    zIndex: 3
                }
            }
        }
    }
});