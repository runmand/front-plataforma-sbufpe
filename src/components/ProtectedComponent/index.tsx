import React from 'react'
import { ProtectedComponentProps } from './ProtectedComponentProps.dt'

export const index = ({permissions,user_permission,children}:ProtectedComponentProps) => {
  return (
    <div>index</div>
  )
}
