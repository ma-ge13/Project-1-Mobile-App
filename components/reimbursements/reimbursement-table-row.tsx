import { DataTable } from "react-native-paper";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Reimbursement from "../../DTOs/reimbursement";
import { Button } from "react-native";

export default function ReimbursementRecordsRow(props: { reimbursement: Reimbursement }, {navigation}) {
      
  function displayReimbursementDetails() {
      navigation.navigate("Reimbursement Details", {reimbursementId: props.reimbursement.id});
  }

  return (
    <DataTable.Row>
      <DataTable.Cell>
        {new Date(props.reimbursement.submittalTime).toLocaleString()}
      </DataTable.Cell>

      <DataTable.Cell>
        {props.reimbursement.lastName}, {props.reimbursement.firstName}
      </DataTable.Cell>

      <DataTable.Cell>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(props.reimbursement.amount)}
      </DataTable.Cell>

      <DataTable.Cell>
        <Button title="Details" onPress={displayReimbursementDetails}></Button>
      </DataTable.Cell>
    </DataTable.Row>
    //   <tr>
    //     <td>
    //       {new Date(props.reimbursement.submittalTime).toLocaleString()}
    //     </td>

    //     {isManager &&
    //       <td>
    //         {props.reimbursement.lastName}, {props.reimbursement.firstName}
    //       </td>
    //     }

    //     <td>
    //       {new Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency: "USD",
    //       }).format(props.reimbursement.amount)}
    //     </td>

    //     {!isManager &&
    //       <td>{props.reimbursement.status}</td>
    //     }

    //     <td style={{ textAlign: "center" }}>
    //       <button onClick={displayReimbursementDetails}>Details</button>
    //     </td>
    //   </tr>
  );
}