import { forwardRef } from 'react';

const Div = forwardRef((props, ref) => {
    return (
        <div ref={ref} {...props}>{props.children}</div>
    )
});

Div.displayName = 'Div';

export default Div;
