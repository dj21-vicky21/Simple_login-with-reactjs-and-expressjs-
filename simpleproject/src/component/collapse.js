import React, { useState } from 'react';

const Collapse=(props)=> {
    const {details,index}=props



//   const [isOpen, setIsOpen] = useState(false);


//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

  return (
    <div className={'userdetails-collapse' }>
      <div className='userlist' >
        <span className='username_in_tab'>{index+1} . {details.user_name}</span>
        <span>{details.role}</span>
      </div>
      {/* {isOpen && <div className='alluserdetails'>
        <span className='fname'>{details.first_name}</span>
        <span className='sname'>{details.second_name}</span>
        <span className='dob'>{details.dob}</span>
        </div>} */}
    </div>
  );
}

export default Collapse;