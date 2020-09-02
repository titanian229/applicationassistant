import React from 'react'


const TabItem = (props) => {
    const {tab, currentTab, children} = props
    if (tab !== currentTab) return ''
    return <>{children}</>
}

export default TabItem