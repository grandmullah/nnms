import { useState } from 'react'
import Head from 'next/head'
import { IconNote, IconGridDots, IconMedicineSyrup, IconVaccine,IconSettingsAutomation, IconWallet, IconCoin, IconMessageDots, IconArrowLeft, IconArrowRight } from '@tabler/icons-react' 
import { Button } from '@mantine/core'
import { px } from '@mantine/styles'
import PatientPage from '@/components/patient/detailsPage'


const links = [
  { title: 'Overview', icon: IconGridDots },
  { title: 'Nurse Notes', icon: IconNote },
  { title: 'Medication', icon: IconMedicineSyrup },
  { title: 'Lab Investigation', icon: IconVaccine },
  { title: 'Operations', icon: IconSettingsAutomation },
  { title: 'Charges', icon: IconWallet },
  { title: 'Payment', icon: IconCoin }, 
  { title: 'Live Consultation', icon: IconMessageDots },
]

// function Link({ title, icon, active, onClick }) {
//   return (
//     <a
//       onClick={onClick}
//       className={`flex items-center py-2 px-4 text-black hover:text-blue-500 ${active && 'text-blue-500 underline'}`}
//     >
//       <span className="mr-2"><icon /></span>
//       {title}
//     </a>
//   )
// }

export default function MyPage() {
  const [activeIndex, setActiveIndex] = useState('')

  // const handlePrev = () => setActiveIndex((prev) => prev === 0 ? links.length - 1 : prev - 1)
  // const handleNext = () => setActiveIndex((prev) => prev === links.length - 1 ? 0 : prev + 1)

  return (
    <div>
        <div style={{backgroundColor:"#F0F0F0", padding:"50"}}>
          <Head>
            <title>Patient</title>
          </Head>
          {/* <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Carousel Header</div>
            <div className="flex items-center">
              <button onClick={handlePrev} className="mr-4"><IconArrowLeft /></button>
              <button onClick={handleNext}><IconArrowRight /></button>
            </div>
          </div> */}
          <div className="flex justify-between mt-4" style={{  padding:50} }>
            {links.map((link, index) => (
              <Button variant="subtle"
                key={index}
                title={link.title}
                leftIcon={<link.icon/>}
                // active={activeIndex === index}
                onClick={() => setActiveIndex(link.title)}
                >{link.title}</Button>
            ))}
          </div>
        </div>
        {activeIndex === 'Overview' && <PatientPage/> }
    </div>
    
  )
}
