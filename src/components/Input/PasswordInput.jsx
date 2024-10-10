import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({value, onChange, Placeholder}) => {

  const [isShowPassword, setisShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setisShowPassword(!isShowPassword);
  };

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 mb-3 rounded'>
      
      <input type={isShowPassword ? "text" : "password"}
        value={value} onChange={onChange} placeholder={Placeholder || "Password"}
        className='w-full bg-transparent text-sm py-3 mr-3 rounded outline-none'/>
      
      {isShowPassword ? 
        <FaRegEyeSlash size={22} className='text-primary cursor-pointer' onClick={toggleShowPassword} /> : 
        <FaRegEye size={22} className='text-primary cursor-pointer' onClick={toggleShowPassword} />
      }
    </div>
  )
}

export default PasswordInput;
