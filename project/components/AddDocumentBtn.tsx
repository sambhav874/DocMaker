'use client'
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from './ui/button';
import createDocument from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
const router = useRouter();
    const addDocumentHandler = async () => {
        
        try{
            const room = await createDocument({userId , email});
            console.log(room);
            if(room) router.push(`/documents/${room.id}`)
        }catch(error){
            console.log(error);
        }
    }

    return (
      <Button type="submit" onClick={addDocumentHandler} className="add-document-btn  justify-center items-center hover:bg-white hover:text-dark-200 text-white space-x-1 p-2 mt-4 gap-1 shadow-md">
        <p className='hidden sm:block'>Start a new document</p>
        
        <FontAwesomeIcon icon={faAdd} className="hover:text-dark-200 text-xl font-light h-4 w-4" />
      </Button>
    );
  };
export default AddDocumentBtn;