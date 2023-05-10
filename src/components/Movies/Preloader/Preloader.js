import React from 'react'
import './Preloader.css'

export default function Preloader({ className }) {
  return (
    <div className={`preloader ${className}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};
