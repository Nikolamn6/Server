import React from 'react'
import { Link } from 'react-router-dom';

function LinkedButton(props) {
  return (
    <Link to={props.link}>{ props.text }</Link>
  )
}

export default LinkedButton