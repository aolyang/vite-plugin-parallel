import type { DOMAttributes, FC, PropsWithChildren } from "react"

import React from "react"

type Props = PropsWithChildren<DOMAttributes<HTMLButtonElement>>
export const RcButton: FC<Props> = ({children, ...btnProps}) => {
    return <button {...btnProps}>RC Button {children}</button>
}
