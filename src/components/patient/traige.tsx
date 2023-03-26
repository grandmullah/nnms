
import React, { useState } from "react";

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  temperature: string;
}

interface Complaints {
  chiefComplaint: string;
  otherComplaints: string;
}

const TriagePage = () => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
  });
  const [complaints, setComplaints] = useState<Complaints>({
    chiefComplaint: "",
    otherComplaints: "",
  });
  const [pastVitalSigns, setPastVitalSigns] = useState<VitalSigns[]>([]);
  const [pastComplaints, setPastComplaints] = useState<Complaints[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPastVitalSigns([...pastVitalSigns, vitalSigns]);
    setPastComplaints([...pastComplaints, complaints]);
    setVitalSigns({
      bloodPressure: "",
      heartRate: "",
      respiratoryRate: "",
      temperature: "",
    });
    setComplaints({ chiefComplaint: "", otherComplaints: "" });
  };

  return (
    <div>
        
    </div>
   )
}