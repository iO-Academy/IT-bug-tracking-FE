import React from 'react';

function Collapse({toggle, children}) {
    return <div id="collapseOne" className={'accordion-collapse collapse' + (toggle ? ' show' : '')}>
        <div className="accordion-body">
            {children}
        </div>
    </div>
}

export default Collapse
