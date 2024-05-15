import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import {  faSquare } from '@fortawesome/free-regular-svg-icons'



export const CheckBox = ({ name,value, onChange, label, className }: any) => {

    const state = value 

    const onClick = () => {
        onChange(!state)
    }

    return (
        <div className={`${className} flex cursor-pointer`} onClick={onClick}>
            {
                state
                    ? <FontAwesomeIcon icon={faSquareCheck} className='text-cyan-600' size="lg" />
                    : <FontAwesomeIcon icon={faSquare} className='text-slate    -600'size="lg"  />
            }
            <div className='ml-3 relative bottom-px'>  
                {label}
            </div>

        </div>
    )
}

