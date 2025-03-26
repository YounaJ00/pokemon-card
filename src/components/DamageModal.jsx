import React from 'react'
import DamageRelations from './DamageRelations'

const DamageModal = ({setIsModalOpen, damages}) => {
  return (
    <div className='flex items-center justify-center z-40 fixed left-0 bottom- w-full h-full bg-gray-800'> 
    
        <div className='modal bg-white rounded-lg w-1/2'>
            <div className='flex flex-col items-start p-4'>
                <div className='flex items-center w-full justify-between'>
                    
                    <div className='text-gray-900 font-medium'>
                    데미지 관계
                    </div>
                    <span 
                    onClick={() => setIsModalOpen(false)}
                    className='text-gray-900 font-medium text-lg cursor-pointer'>
                        X
                    </span>
                </div>
                
                <DamageRelations 
                    damages={damages}
                    />

            </div>
        </div>
    
    </div>
  )
}

export default DamageModal