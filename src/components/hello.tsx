import * as React from "react"

//構造体的な(Object型というらしい)
interface Props {
    userName: string;
}

//引数も props(名前):Props(型)
export const HelloComponent = (props:Props) =>{
    return <h2> Hello Component! user:{props.userName}</h2>
}
