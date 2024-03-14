import { ReactNode } from "react"

export type ProtectedComponentProps = {
    user_permission:string
    permissions:string[]
    children:ReactNode
}