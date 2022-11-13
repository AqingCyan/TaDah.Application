import React from 'react'
import 'umi/typings'

interface EmojiProps extends HTMLElement {
  shortcodes: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'em-emoji': React.DetailedHTMLProps<React.HTMLAttributes<EmojiProps>, EmojiProps>
    }
  }
}
