import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '../../../css/style.css'
import React, { useState } from "react";
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Ad(props) {
    const { t } = useLaravelReactI18n();

    let advertisementID = props.advertisement.data[0].question_id;
    let advertisementActive = props.advertisement.data[0].active;

    let [adNr, setAdNr] = useState(advertisementID);
    let [isAdOn, setIsAdOn] = useState(advertisementActive);

    function handleToggle() {
        setIsAdOn(!isAdOn);
    }

    let onSubmitAd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/ad/update', { 
                question_id: adNr || null,
                active: isAdOn,
            })
            .then(response => { window.alert('Addvertisment updated successfully'); window.location.reload();})
            .catch(error => { console.log(error); });
        } catch (error) {
            alert("Something went wrong! Error: " + error);
        }
    }

    let onChangeAdNR = (e) => {
        setAdNr(e.target.value);
    }
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">Advertisement</h2>}
            >
            <div className='admin_bg'>
                <div className='flex justify-center mt-10'>
                    <div className=' bg-gray-500 p-4 rounded-lg text-white'>
                        <p className='pb-4 flex justify-center text-white ' style={{color:'#fff'}}> {t('advertisement')} </p>

                        <form className='flex flex-row justify-center items-center' onSubmit={onSubmitAd}>
                            
                            <button className={`text-white font-bold mx-4 py-2 px-4 rounded-full inline-flex items-center ${isAdOn ? 'bg-green-500' : 'bg-red-500'} hover:scale-105`} onClick={handleToggle}>
                                <span className="mr-2">{isAdOn ? t('on') : t('off') }</span>
                                <div className="relative">
                                    <input type="checkbox" id="toggle" className="sr-only" checked={isAdOn} onChange={handleToggle} />
                                </div>
                            </button>

                            <div className="mx-auto pl-6 text-black">
                                <input
                                    placeholder='Question ID'
                                    type="number"
                                    required
                                    value={adNr}
                                    onChange={onChangeAdNR}
                                />
                            </div>
                            
                            <div className='ml-auto mr-4'>
                                <input type="submit" value={t('update')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"/>
                            </div>                            
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
