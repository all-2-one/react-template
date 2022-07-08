import React from "react"

interface BasicLayoutProps {
    children: React.ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    return (
        <div>
            <h1>BasicLayout</h1>
            {props.children}
        </div>
    )
}

export default BasicLayout