import React from 'react'

const Notification = ({ updateMessage }) => {

    if (updateMessage === null) {
      return null
    }


    return (
      <div className={ updateMessage.type==="error" ? "error" : "update"}>
       {updateMessage.text}
      </div>
    )
    
}

export default Notification