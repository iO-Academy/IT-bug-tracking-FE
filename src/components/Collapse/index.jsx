import React, { useState } from 'react';

function Collapse({ header, children }) {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => setCollapsed(!collapsed)

    return (
        <div className="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button 
                        className={'accordion-button' + (collapsed ? '' : ' collapsed')}
                        type="button" data-target="#collapseOne" 
                        data-bs-toggle="collapse"
                        aria-expanded={!collapsed}
                        onClick={toggle}
                    >
                        {header}
                    </button>
                </h2>
                <div className={'accordion-collapse collapse' + (collapsed ? ' show' : '')}>
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collapse
