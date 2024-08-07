import React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./select"

const UserTypeSelector = ({userType , setUserType , onClickHandler} : UserTypeSelectorParams) => {

    const accessChangeHandler = (type: UserType) => {
        setUserType(type);
        onClickHandler && onClickHandler(type);
    }


    return(
        <Select  value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)}  >
  <SelectTrigger className=" w-fit bg-dark-400 border-none bg-transparent text-blue-100">
    <SelectValue  />
  </SelectTrigger>
  <SelectContent className="border-none bg-dark-200 text-white">

    <SelectItem value="viewer cursor-pointer bg-dark-200 text-blue-100 focus:bg-dark-300 hover:bg-dark-300 focus:text-blue-100 !important">can view</SelectItem>

    <SelectItem value="editor cursor-pointer bg-dark-200 text-blue-100 focus:bg-dark-300 hover:bg-dark-300 focus:text-blue-100 !important">can edit</SelectItem>
    
    
  </SelectContent>
</Select>

    )
}

export default UserTypeSelector;