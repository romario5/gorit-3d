UI.register({
    namespace: 'Gorit3D/controls',
    name: 'Input',

    scheme: {
        wrap: {
            field: '@input'
        }
    },

    params: {
        placeholder: '',
        type: 'text',
        value: ''
    },

    methods: {
        val(value) {
            if (value === undefined) return this.field.val();
            this.field.val(value);
        },
        isFocused() {
            return this.field.node() === document.activeElement;
        }
    },

    onRender(inst, params) {
        inst.field.val(params.value);

        inst.field.on('change', () => {
            inst.triggerEvent('change', inst.val());
        });
    },

    onGather(inst, data) {
        data.value(inst.field.val());
    },

    styles: {
        wrap: {
            display: 'flex',
            
            field: {
                width: '100%',
                flexGrow: 1,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: Theme('colors.darkest').default('#999'),
                height: '1.5rem',
                padding: '0.15rem 0.5rem',
                outline: 'none',
                color: '#333',

                ':focus': {
                    backgroundColor: Theme('colors.dark').default('#f9f9f9'),
                    borderColor: '#666',
                    color: '#000'
                }
            }
        }
    }
})