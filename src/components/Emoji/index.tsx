import React from 'react'

const Emoji: React.FC<{ shortcodes: string; size: string }> = (props) => (
  // @ts-ignore
  <em-emoji shortcodes={`:${props.shortcodes}:`} size={props.size} id={props.shortcodes} />
)

export default Emoji
