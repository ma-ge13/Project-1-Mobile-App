import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Alert, Button, TextInput } from "react-native";
import { DataTable } from "react-native-paper";
import Reimbursement from "../../DTOs/reimbursement";
// import ReceiptsList from "../shared/reimbursement-receipts-list";

export default function ReimbursementDetails({route}) {

    const reimbursementId = route.params.reimbursementId;
    const [comment, setComment] = useState(null);
    const [reimbursement, setReimbursement] = useState<Reimbursement>();
//     // reimbursement.receipts.forEach(r => <ReceiptsList receipt={r} />);
    
  
    function approveReimbursement() {
      
      const updateReimbursement: Reimbursement = { ...reimbursement };
      
      !_.isEmpty(comment) && (updateReimbursement.comment = comment);
      updateReimbursement.status = "Approved";

      const response = axios.put(
          "https://ponzi-bank.azurewebsites.net/reimbursements/update",
          JSON.stringify(updateReimbursement),
          { headers: { "Content-Type": "application/json" } }
      ).then(              
        (response) => {
            if (response.status === 200) {
                Alert.alert("Reimbursement status was successfully updated to 'Approved'.");
            }
          }
        );
    }

    function denyReimbursement() {
        const updateReimbursement: Reimbursement = { ...reimbursement };
        
        !_.isEmpty(comment) && (updateReimbursement.comment = comment);
        updateReimbursement.status = "Denied";

        axios.put(
            "https://ponzi-bank.azurewebsites.net/reimbursements/update",
            JSON.stringify(updateReimbursement),
            {headers: { "Content-Type": "application/json" }}
        ).then((response) => {
            if (response.status === 200) {
                Alert.alert("Reimbursement status was successfully updated to 'Denied'.");
            }
        })
    }

    useEffect(() => {
      axios
        .get(
          `https://ponzi-bank.azurewebsites.net/reimbursements/${reimbursementId}`
        )
        .then((response) => {
          setReimbursement(response.data);
        });
    }, [reimbursementId]);

    return (
        <>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>
                        Date Submitted: 
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {new Date(reimbursement.submittalTime).toLocaleString()}
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>
                        Amount Requested: 
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).
                            format(reimbursement.amount)}
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>
                        Description: 
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {reimbursement.description}
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>
                        Request Status: 
                    </DataTable.Cell>

                    <DataTable.Cell>
                        {reimbursement.status}
                    </DataTable.Cell>
                </DataTable.Row>

                {reimbursement.comment &&
                    (
                        <DataTable.Row>
                        <DataTable.Cell>
                            Comment: 
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {reimbursement.comment}
                        </DataTable.Cell>
                        </DataTable.Row>
                    )
                }

                {reimbursement.resolutionTime &&
                    (
                        <DataTable.Row>
                            <DataTable.Cell>
                                Date Concluded:
                            </DataTable.Cell>
                            
                            <DataTable.Cell>
                                {new Date(reimbursement.resolutionTime).toLocaleString()}
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                }
            </DataTable>

            <TextInput
                onChangeText={setComment}
                multiline
                numberOfLines={5}
            />

            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Button title="Approve" onPress={approveReimbursement}></Button>
                    </DataTable.Cell>

                    <DataTable.Cell>
                        <Button title="Deny" onPress={denyReimbursement}></Button>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    //     <>
    //         {reimbursement ? (
    //             <>
    //                 <button onClick={returnToReimbursements}>
    //                     Return to Reimbursement Records
    //                 </button>
                    
    //                 <br /><br />
                    
    //                 <table style={{ borderSpacing: "25px" }}>
    //                     <tbody>
    //                         <tr>
    //                             <td>
    //                                 Date Submitted: 
    //                             </td>
                                
    //                             <td>
    //                                 {new Date(reimbursement.submittalTime).toLocaleString()}
    //                             </td>
    //                         </tr>
                            
    //                         <tr>
    //                             <td>
    //                                 Amount Requested: 
    //                             </td>
                                
    //                             <td>
    //                                 {
    //                                     new Intl.NumberFormat("en-US", {
    //                                         style: "currency",
    //                                         currency: "USD",
    //                                     }).format(reimbursement.amount)
    //                                 }
    //                             </td>
    //                         </tr>
                            
    //                         <tr>
    //                             <td>
    //                                 Description: 
    //                             </td>
                                
    //                             <td>
    //                                 {reimbursement.description}
    //                             </td>
    //                         </tr>
                            
    //                         {/* <tr>
    //                             <td>Receipts: </td>
    //                             <td>{reimbursement.receipts}</td>
    //                         </tr> */}
                            
    //                         <tr>
    //                             <td>
    //                                 Request Status: 
    //                             </td>
                                
    //                             <td>
    //                                 {reimbursement.status}
    //                             </td>
    //                         </tr>

    //                         {reimbursement.comment && (
    //                             <tr>
    //                                 <td>
    //                                     Comment: 
    //                                 </td>

    //                                 <td>
    //                                     {reimbursement.comment}
    //                                 </td>
    //                             </tr>
    //                         )}
                            
    //                         {reimbursement.resolutionTime && (
    //                             <tr>
    //                                 <td>
    //                                     Date Concluded: 
    //                                 </td>
                                
    //                                 <td>
    //                                     {new Date(reimbursement.resolutionTime).toLocaleString()}
    //                                 </td>
    //                             </tr>
    //                         )}
    //                     </tbody>
    //                 </table>

    //                 {isManager &&
    //                     <>
    //                         <h3><b><u>Comments</u></b></h3>
    //                         <br />
    //                             <textarea ref={commentInput} cols={75} rows={5} placeholder="Provide the reason(s) for updating this reimbursement request" />
                            
    //                         <table style={{ borderSpacing: "50px" }}>
    //                             <tbody>
    //                                 <tr>
    //                                     <td style={{ textAlign: "center" }}>
    //                                         <button onClick={approveReimbursement}>Approve</button>
    //                                     </td>
                                    
    //                                     <td style={{ textAlign: "center" }}>
    //                                         <button onClick={denyReimbursement}>Deny</button>
    //                                     </td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                     </>
    //                 }
    //             </>
    //         ) :
                
    //             null
    //     }
    //   </>
    );
}