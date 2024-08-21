import React from 'react'
import Tag from './tag'

const Tags = ({ Java, Kotlin, Javascript, CSS, HTML, CPlus, CAD}) => {
  return (
    <div className='p-2 flex flex-wrap gap-2 space-x-2'>
        {Java ? <Tag name="Java" color="#007396" /> : null}
        {Kotlin ? <Tag name="Kotlin" color="#7F52FF" /> : null}
        {Javascript ? <Tag name="JavaScript" color="#F7E02D" /> : null}
        {CSS ? <Tag name="CSS" color="#2965F1" /> : null}
        {HTML ? <Tag name="HTML" color="#E44D26" /> : null}
        {CPlus ? <Tag name="C++" color="#bf1722" /> : null}
        {CAD ? <Tag name="CAD" color="#6e0e80" /> : null}
    </div>
  )
}

export default Tags