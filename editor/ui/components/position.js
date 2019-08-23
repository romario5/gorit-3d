UI.register({
    namespace: 'Gorit3D/components',
    name: 'Position',

    scheme: {
        wrap: {
            title: '(text = Position)',
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
            },
        }
    },

    onRender(inst, params) {
        let channel = EventsChannel('Gorit3D');

        let obj = null,
            xInp = inst.xInput.inclusion(),
            yInp = inst.yInput.inclusion(),
            zInp = inst.zInput.inclusion();

        xInp.on('change', val => {
            if (obj !== null) obj.position.x = parseFloat(val);
        });

        yInp.on('change', val => {
            if (obj !== null) obj.position.y = parseFloat(val);
        });

        zInp.on('change', val => {
            if (obj !== null) obj.position.z = parseFloat(val);
        });

        new NAT.FramesLoop(() => {
            if (obj !== null) {
                if (!xInp.isFocused()) xInp.val(obj.position.x.toFixed(4));
                if (!yInp.isFocused()) yInp.val(obj.position.y.toFixed(4));
                if (!zInp.isFocused()) zInp.val(obj.position.z.toFixed(4));
            }
        });

        channel.on('objectSelect -> positionDisplay', selectedObject => {
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
                fontWeight: 400,
                color: '#333',
                fontSize: '0.8rem'
            },

            ' > * > *:last-child': {
                flexGrow: 1
            }
        }
    }
});