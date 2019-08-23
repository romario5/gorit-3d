UI.register({
    namespace: 'Gorit3D/components/layersList',

    name: 'Layers list',

    scheme: {
        wrap: {
            toolbar: '',
            list: '|Layer'
        }
    },

    params: {
        scene: null
    },

    methods: {
        setScene(scene) {
            this.params().scene = scene;
            this.update();
        },

        update() {
            this.list.removeChildren();
            
            let scene = this.params().scene;
            if (scene === null) return;

            for (let id in scene.layers) {
                this.list.addOne({layer: scene.layers[id]});
            }
        }
    },

    onRender(inst, params) {
        inst.update();
        
        let channel = EventsChannel('Gorit3D');

        channel.on('objectSelect -> layersList', (obj, objInst) => {
            let layers = inst.list.children();
            for (let i = 0; i < layers.length; i++) {
                layers[i].deselectObject(objInst);
            }
        });
    },

    styles: {
        wrap: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.25rem',
            flexGrow: 1,

            toolbar: {
                display: 'flex',
                height: '2rem',
                flexShrink: 0
            },

            list: {
                flexGrow: 1,
                margin: '0.25rem',
                padding: '0.25rem',
                border: '1px solid #999',
                //backgroundColor: 'rgba(0,0,0,0.1)'
            }
        }
    }
});