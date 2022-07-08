import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Model } from "../../../models"

const Demo01 = () => {
    const global = useSelector((state: Model) => state.global)
    const disptach = useDispatch();

    return (
        <div>
            demo01
            <button
                onClick={() => {
                    disptach({
                        type: 'global/setToken',
                        payload: 'hello'
                    })
                }}
            >
                {global.token}
            </button>
        </div>
    )
}

export default Demo01
