UI.register({
    namespace: 'Gorit3D/Layers list',

    name: 'Layer',

    scheme: {
        wrap: {
            header: {
                name: ''
            },

            objects: '|Object'
        }
    },

    params: {
        layer: null
    },

    methods: {
        update() {
            let layer = this.params().layer;
            this.name.text(layer.name);

            for (let id in layer.objects) {
                this.objects.addOne({
                    object: layer.objects[id]
                });
            }
        },

        deselectObject(objInst) {
            let objects = this.objects.children();
            for (let i = 0; i < objects.length; i++) {
                objects[i].deselect(objInst);
            }
        }
    },

    onRender(inst, params) {
        inst.update();
    },

    styles: {
        wrap: {
            display: 'flex',
            flexDirection: 'column',

            header: {
                display: 'flex',
                padding: '0.5rem',
                backgroundColor: '#363e45',
                color: '#fff',

                name: {
                    fontSize: '0.75rem'
                }
            },

            objects: {
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '1rem'
            }
        }
    }
})