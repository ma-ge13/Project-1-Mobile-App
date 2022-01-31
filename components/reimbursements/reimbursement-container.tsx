import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PendingReimbursementsTable from "./pending-reimbursements-table";
import axios from "axios";

export default function ManagerReimbursementContainer({navigation}) {

  const [pendingList, updatePendingList] = useState([]);
  
  function retrievePendingReimbursements() {
    axios.get("https://ponzi-bank.azurewebsites.net/reimbursements/pending").
      then((response) => {
        updatePendingList(response.data)
      });
  }

  useEffect(() => {
      retrievePendingReimbursements();
  }, [pendingList]);

  return (
    <>
      {/* <table style={{ borderSpacing: "25px" }}>
        <tbody>
          <tr>
            <td>
              <button onClick={endSession}>
                Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table> */}
      
      <PendingReimbursementsTable
        reimbursements={pendingList}
        updateFunction={retrievePendingReimbursements}
      />
    </>
  );
}