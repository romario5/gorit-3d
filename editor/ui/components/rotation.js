UI.register({
    namespace: 'Gorit3D/components',
    name: 'Rotation',

    scheme: {
        wrap: {
            title: '(text = Rotation)',
            xWrap: {
                xLabel: '(text = X:)',
                xInput: '<<< Input {name = x}'
            },
            yWrap: {
                yLabel: '(text = Y:)',
                yInput: '<<< Input {name = y}'
            },
            zWrap: {
                zLabel: '(text = Z:)',
                zInput: '<<< Input {name = z}'
            }
        }
    },

    onRender(inst, params) {
        let channel = EventsChannel('Gorit3D');

        let obj = null,
            xInp = inst.xInput.inclusion(),
            yInp = inst.yInput.inclusion(),
            zInp = inst.zInput.inclusion();

        xInp.on('change', val => {
            if (obj !== null) obj.rotation.x = parseFloat(val) * Math.PI / 180;
        });

        yInp.on('change', val => {
            if (obj !== null) obj.rotation.y = parseFloat(val) * Math.PI / 180;
        });

        zInp.on('change', val => {
            if (obj !== null) obj.rotation.z = parseFloat(val) * Math.PI / 180;
        });

        new NAT.FramesLoop(() => {
            if (obj !== null) {
                let r = obj.rotation.inDegrees();
                if (!xInp.isFocused()) xInp.val(r.x.toFixed(4));
                if (!yInp.isFocused()) yInp.val(r.y.toFixed(4));
                if (!zInp.isFocused()) zInp.val(r.z.toFixed(4));
            }
        });

        channel.on('objectSelect -> rotationDisplay', selectedObject => {
            obj = selectedObject;
        });
    },

    styles: {
        wrap: {
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',

            title: {
                fontWeight: 600,
                color: '#333',
                fontSize: '0.9rem',
                marginBottom: '0.25rem'
            },

            ' > *': {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                margin: '0.15rem 0'
            },

            ' > * > *:first-child': {
                width: '1rem',
                marginRight: '0.5rem',
                color: '#333',
                fontWeight: 400,
                fontSize: '0.8rem'
            },

            ' > * > *:last-child': {
                flexGrow: 1
            }
        }
    }
});