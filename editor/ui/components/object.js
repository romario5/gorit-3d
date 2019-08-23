UI.register({
    namespace: 'Gorit3D/Layers list',

    name: 'Object',

    scheme: {
        wrap: {
            header: {
                name: ''
            },

            objects: '|Object'
        }
    },

    params: {
        object: null
    },

    methods: {
        update() {
            let object = this.params().object;
            this.name.text(object.name === '' ? object.id : object.name);

            for (let id in object.visibleHelpers.objects) {
                this.objects.addOne({
                    object: object.visibleHelpers.objects[id]
                });
            }
        },

        deselect(inst) {
            if (inst !== this) {
                this.header.removeClass('active');
            }
            
            let objects = this.objects.children();
            for (let i = 0; i < objects.length; i++) {
                objects[i].deselect(inst);
            }
        }
    },

    onRender(inst, params) {
        inst.update();
        let channel = EventsChannel('Gorit3D');

        inst.header.on('click', () => {
            channel.triggerEvent('objectSelect', params.object, inst);
            inst.header.addClass('active');
        });
    },

    styles: {
        wrap: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '0.25rem',
            position: 'relative',

            '::before': {
                content: '',
                width: '1px',
                height: '0.85rem',
                borderLeft: '1px solid #000',
                position: 'absolute',
                top: 0,
                left: 0
            },
            position: 'relative',

            '::after': {
                content: '',
                height: '1px',
                width: '0.5rem',
                borderTop: '1px solid #000',
                position: 'absolute',
                top: '0.85rem',
                left: 0
            },

            header: {
                display: 'flex',
                marginLeft: '0.5rem',
                cursor: 'default',

                name: {
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    borderRadius: '0.15rem',
                    border: '1px solid transparent'
                },

                '.active > *:first-child': {
                    backgroundColor: '#363e45',
                    borderColor: '#000'
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