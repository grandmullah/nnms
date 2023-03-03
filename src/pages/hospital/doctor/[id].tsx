import { NextPage } from 'next'
import { ActionsGridPatients } from '@/components/Doctors/ActionGrid'
interface Props {}

const Patients: NextPage<Props> = ({}) => {
  return <div>
    <ActionsGridPatients/>
  </div>
}

export default Patients