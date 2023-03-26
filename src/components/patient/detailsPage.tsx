import PatientDetails from './details';

export default function PatientPage() {
  const patient = {
    gender: "male",
    access: ["002"],
    occupation: "farmer",
    kinName: "viny",
    address: "000,nrb",
    state: {
      active: true,
      hospital: "002",
      stage: "clinic"
    },
    secondName: "james",
    id: "345678",
    DOB: {
      seconds: 1577826000,
      nanoseconds: 0
    },
    maritalStatus: "Single",
    kinPhoneNumber: "070856765",
    tribe: "Kalenjin",
    religion: "Muslim",
    kinAddress: "",
    registered: 1678204192899,
    kinEmail: "",
    nationality: "Kenyan",
    firstName: "victor",
    email: "hi@g.com",
    kinRelationship: "spouu",
    surname: "ko",
    kinOccupation: "yuoi",
    county: "047, Nairobi",
    phoneNumber: "070845678"
  }

  return (
    <div>
      <PatientDetails patient={patient} />
    </div>
  );
}
