import React, { useState } from 'react';

interface Prescription {
  id: number;
  drugName: string;
  dosage: string;
  quantity: number;
  isDispensed: boolean;
}

interface Props {
  prescriptions: Prescription[];
}
const prescriptions = [
    {
      id: 1,
      drugName: 'Aspirin',
      dosage: '100mg',
      quantity: 10,
      isDispensed: false
    },
    {
      id: 2,
      drugName: 'Amoxicillin',
      dosage: '500mg',
      quantity: 5,
      isDispensed: false
    },
    {
      id: 3,
      drugName: 'Lisinopril',
      dosage: '10mg',
      quantity: 2,
      isDispensed: true
    }
  ];
  

export const PharmacyPage: React.FC<Props> = () => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const handleSelectPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleDispenseDrug = () => {
    if (selectedPrescription) {
      const updatedPrescriptions = prescriptions.map(prescription =>
        prescription.id === selectedPrescription.id ? { ...prescription, isDispensed: true } : prescription
      );
      setSelectedPrescription(null);
      // TODO: send updatedPrescriptions to server to update database
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>Pharmacy</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black', fontWeight: 'bold' }}>
            <th style={{ padding: '10px 0' }}>Drug Name</th>
            <th style={{ padding: '10px 0' }}>Dosage</th>
            <th style={{ padding: '10px 0' }}>Quantity</th>
            <th style={{ padding: '10px 0' }}>Dispensed</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(prescription => (
            <tr
              key={prescription.id}
              style={{ borderBottom: '1px solid lightgray', cursor: 'pointer' }}
              onClick={() => handleSelectPrescription(prescription)}
            >
              <td style={{ padding: '10px 0' }}>{prescription.drugName}</td>
              <td style={{ padding: '10px 0' }}>{prescription.dosage}</td>
              <td style={{ padding: '10px 0' }}>{prescription.quantity}</td>
              <td style={{ padding: '10px 0' }}>{prescription.isDispensed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPrescription && (
        <div style={{ marginTop: '30px', backgroundColor: 'lightgray', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ marginBottom: '10px' }}>Dispense {selectedPrescription.drugName}</h2>
          <p style={{ marginBottom: '10px' }}>Dosage: {selectedPrescription.dosage}</p>
          <p style={{ marginBottom: '10px' }}>Quantity: {selectedPrescription.quantity}</p>
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={handleDispenseDrug}
          >
            Dispense Drug
          </button>
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;
