import React from 'react'
import { FullScreenCode } from 'mdx-deck/layouts'

export default ({ children }) =>
  <div
    style={{
      width: '100vw',
      height: '100vw',
      fontSize: '16px',
      overflowY: 'auto'
    }}>
    {children}
  </div>