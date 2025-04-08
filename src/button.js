import React from 'react'

const Button = () => {

    const handleclick = () => {
        console.log('hi')
    }

  return (
    <>
        <div>Button</div>
         <button  onClick={handleclick} type='button'> hi </button>
    </>
  )
}

export default Button