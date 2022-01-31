import _ from "lodash"
import { Provider } from "react-redux";
import Reimbursement from "../../DTOs/reimbursement"
import { sessionStore } from "../../sessionStore";
import ReimbursementRecordsRow from "./reimbursement-table-row";
import { DataTable } from "react-native-paper";

export default function PendingReimbursementsTable(props: {reimbursements: Reimbursement[], updateFunction: Function}) {

    const pendingReimbursementsRow = props.reimbursements.map(
        r =>
        <Provider store={sessionStore} key={r.id}>
            <ReimbursementRecordsRow key={r.id} reimbursement={r} />
        </Provider>
    );

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Submittal Date</DataTable.Title>
                    <DataTable.Title>Employee</DataTable.Title>
                    <DataTable.Title>Amount Requested</DataTable.Title>
                </DataTable.Header>

                {pendingReimbursementsRow}
            </DataTable>
      </>

      // {/* <h2><u>Pending Reimbursements</u></h2>
      //     <br /> */}
      // {/* <Text>Pending Reimbursements</Text>

      // {_.isEmpty(pendingReimbursementsRow) ? <h3 style={{ textAlign: "center" }}>No pending reimbursement requests.</h3> :
      //     (
      //         <table style={{ borderSpacing: "15px" }}>
      //             <thead>
      //                 <tr style={{textAlign: "center"}}>
      //                     <th><u>Submittal Date</u></th>
      //                     <th><u>Employee</u></th>
      //                     <th><u>Amount Request</u></th>
      //                     <th></th>
      //                     <th></th>
      //                 </tr>
      //             </thead>
      //             <tbody>
      //                 {pendingReimbursementsRow}
      //             </tbody>
      //         </table>
      //     )
      // } */}
    );
}