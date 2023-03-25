import { Button } from '@mantine/core';
import { useState } from 'react';

type LabRequest = {
  id: number;
  patientName: string;
  tests: {
    id: number;
    testName: string;
    result: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
};
const labRequests: LabRequest[] = [
    {
      id: 1,
      patientName: 'John Doe',
      tests: [
        {
          id: 1,
          testName: 'Complete Blood Count (CBC)',
          result: '',
          status: 'pending'
        },
        {
          id: 2,
          testName: 'Basic Metabolic Panel (BMP)',
          result: '',
          status: 'pending'
        }
      ]
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      tests: [
        {
          id: 1,
          testName: 'Urinalysis',
          result: '',
          status: 'pending'
        }
      ]
    }
  ];
  

export const LabRequests = () => {
  const [requests, setRequests] = useState<LabRequest[]>(labRequests);

  const handlePatientNameChange = (index: number, value: string) => {
    setRequests(prevRequests =>
      prevRequests.map((request, i) =>
        i === index ? { ...request, patientName: value } : request
      )
    );
  };

  const handleTestNameChange = (requestIndex: number, testIndex: number, value: string) => {
    setRequests(prevRequests =>
      prevRequests.map((request, i) =>
        i === requestIndex
          ? {
              ...request,
              tests: request.tests.map((test, j) =>
                j === testIndex ? { ...test, testName: value } : test
              )
            }
          : request
      )
    );
  };

  const handleTestResultChange = (requestIndex: number, testIndex: number, value: string) => {
    setRequests(prevRequests =>
      prevRequests.map((request, i) =>
        i === requestIndex
          ? {
              ...request,
              tests: request.tests.map((test, j) =>
                j === testIndex ? { ...test, result: value } : test
              )
            }
          : request
      )
    );
  };

  const handleStatusChange = (
    requestIndex: number,
    testIndex: number,
    value: 'pending' | 'in-progress' | 'completed'
  ) => {
    setRequests(prevRequests =>
      prevRequests.map((request, i) =>
        i === requestIndex
          ? {
              ...request,
              tests: request.tests.map((test, j) =>
                j === testIndex ? { ...test, status: value } : test
              )
            }
          : request
      )
    );
  };

  const handleAddTest = (requestIndex: number) => {
    setRequests(prevRequests =>
      prevRequests.map((request, i) =>
        i === requestIndex
          ? {
              ...request,
              tests: [
                ...request.tests,
                {
                  id: request.tests.length + 1,
                  testName: '',
                  result: '',
                  status: 'pending'
                }
              ]
            }
          : request
      )
    );
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(requests);
    // TODO: Send lab requests data to the server
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Patient Name</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Tests</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((labRequest, requestIndex) => (
              <tr key={labRequest.id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{labRequest.id}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>
                <input
                  type="text"
                  value={labRequest.patientName}
                  onChange={e => handlePatientNameChange(requestIndex, e.target.value)}
                />
              </td>
              <td style={{ border: '1px solid black', padding: '10px' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid black', padding: '10px' }}>ID</th>
                      <th style={{ border: '1px solid black', padding: '10px' }}>Test Name</th>
                      <th style={{ border: '1px solid black', padding: '10px' }}>Result</th>
                      <th style={{ border: '1px solid black', padding: '10px' }}>Status</th>
                      <th style={{ border: '1px solid black', padding: '10px' }}>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labRequest.tests.map((test, testIndex) => (
                      <tr key={test.id}>
                        <td style={{ border: '1px solid black', padding: '10px' }}>{test.id}</td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>
                          <input
                            type="text"
                            value={test.testName}
                            onChange={e =>
                              handleTestNameChange(requestIndex, testIndex, e.target.value)
                            }
                          />
                        </td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>
                          <input
                            type="text"
                            value={test.result}
                            onChange={e =>
                              handleTestResultChange(requestIndex, testIndex, e.target.value)
                            }
                          />
                        </td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>
                          <select
                            value={test.status}
                            onChange={e =>
                              handleStatusChange(requestIndex, testIndex, e.target.value as any)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>
                          {test.status !== 'completed' && (
                            <button type="button" onClick={() => handleAddTest(requestIndex)}>
                              Add Test
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="submit">Save</Button>
    </form>
  </div>
  )}