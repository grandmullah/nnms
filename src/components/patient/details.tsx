
import { useState } from 'react'

type PatientData = {
  gender: string;
  access: string[];
  occupation: string;
  kinName: string;
  address: string;
  state: {
    active: boolean;
    hospital: string;
    stage: string;
  };
  secondName: string;
  id: string;
  DOB: {
    seconds: number;
    nanoseconds: number;
  };
  maritalStatus: string;
  kinPhoneNumber: string;
  tribe: string;
  religion: string;
  kinAddress: string;
  registered: number;
  kinEmail: string;
  nationality: string;
  firstName: string;
  email: string;
  kinRelationship: string;
  surname: string;
  kinOccupation: string;
  county: string;
  phoneNumber: string;
}

type Props = {
  patient: PatientData;
}


export default function PatientDetails({ patient }:Props) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const detailsStyles = {
    display: showDetails ? 'block' : 'none',
    backgroundColor: '#F8F8F8',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  }

  const buttonStyles = {
    backgroundColor: showDetails ? '#BFBFBF' : '#4CAF50',
    color: '#FFFFFF',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: '1rem 0',
    minWidth: '10rem',
    maxWidth: '20rem',
    width: '100%',
    transition: 'background-color 0.3s ease-in-out',
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ECEFF1',
  }

  const patientDetailsStyles = {
    backgroundColor: '#FFFFFF',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    margin: '1rem',
    width: '100%',
    maxWidth: '40rem',
  }

  return (
    <div style={containerStyles} >
      <div style={patientDetailsStyles}>
        <h2>{patient.firstName} {patient.secondName} {patient.surname}</h2>
        <p>Gender: {patient.gender}</p>
        <p>DOB: {patient.DOB.seconds}</p>
        <p>Phone Number: {patient.phoneNumber}</p>
        <p>Email: {patient.email}</p>
        <p>County: {patient.county}</p>
        <p>Address: {patient.address}</p>
        <button onClick={toggleDetails} style={buttonStyles}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <div style={detailsStyles}>
          <p>Access: {patient.access.join(', ')}</p>
          <p>Occupation: {patient.occupation}</p>
          <p>Marital Status: {patient.maritalStatus}</p>
          <p>Tribe: {patient.tribe}</p>
          <p>Religion: {patient.religion}</p>
          <p>Kin Name: {patient.kinName}</p>
          <p>Kin Relationship: {patient.kinRelationship}</p>
          <p>Kin Phone Number: {patient.kinPhoneNumber}</p>
          <p>Kin Email: {patient.kinEmail}</p>
          <p>Kin Address: {patient.kinAddress}</p>
          <p>Kin Occupation: {patient.kinOccupation}</p>
          <p>Registered: {patient.registered}</p>
          <p>State: {patient.state.active ? 'Active' : 'Inactive'} - {patient.state.stage} at {patient.state.hospital}</p>
        </div>
      </div>
    </div>
  )
}
