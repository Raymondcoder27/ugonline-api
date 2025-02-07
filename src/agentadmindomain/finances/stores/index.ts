// domain/billing/stores.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Transaction, FloatLedger, BackofficeUser, BranchManager, FloatAllocation, FloatRequest } from "@/agentadmindomain/finances/types";
import type { AllocateFloat } from "@/types";

export const useBilling = defineStore("billing", () => {
  //  data for testing

  // use this for  transactions
  // <tr class="text-left">
  //           <!-- <th>#</th> -->
  //           <th>Tracking Number</th>
  //           <th>Service</th>
  //           <th>Provider</th>
  //           <th>Till</th>
  //           <!-- <th>Transaction Type</th> -->
  //           <th>Fee</th>
  //           <!-- <th>Status</th> -->
  //           <th>Date</th>
  //           <!-- <th>Actions</th> -->
  //         </tr>

  // const Transactions: Transaction[] = [
  //   { id: 1, trackingNumber: "TA123456",
  //     service: "Company Name Reservation", provider: "URSB", till: "Till 001",
  //     fee: 25000, date: "2021-09-01", status: "success" 
  //   },
  //   { id: 2, trackingNumber: "TB123457",
  //     service: "Create Postal Account", provider: "Posta Uganda",
  //      till: "Till 002", fee: 20000, date: "2021-09-02", status: "failed"
  //     },
  //   { id: 3, trackingNumber: "TC123458",
  //     service: "National ID registration", provider: "NIRA",
  //      till: "Till 003", fee: 35000, date: "2021-09-03", status: "pending" },
  // ];

  const Transactions: Transaction[] = [
    {
      id: 1, trackingNumber: "TA123456",
      service: "Company Name Reservation", provider: "URSB", till: "Till 001", transactionID: "TR23183",
      fee: 25000, date: "2021-09-01", status: "success"
    },
    {
      id: 2, trackingNumber: "TB123457",
      service: "Create Postal Account", provider: "Posta Uganda", transactionID: "TR43512",
      till: "Till 002", fee: 20000, date: "2021-09-02", status: "failed"
    },
    {
      id: 3, trackingNumber: "TC123458",
      service: "National ID registration", provider: "NIRA", transactionID: "TR00984",
      till: "Till 003", fee: 35000, date: "2021-09-03", status: "pending"
    },
  ];


  // use this for  float requests
  // <th class="text-left">Date</th>
  // <th class="text-left">Name</th>
  // <th class="text-left">Branch</th>
  // <th class="text-left">Amount</th>
  // <th class="text-left">Actions</th>

  const FloatRequests: FloatRequest[] = [
    { id: 1, requestDate: "2021-09-01", amount: 10000000, status: "pending", branch: "Branch 1", approvedBy: null },
    { id: 4, requestDate: "2021-09-04", amount: 40000000, status: "pending", branch: "Branch 4", approvedBy: null },
    { id: 2, requestDate: "2021-09-02", amount: 20000000, status: "approved", branch: "Branch 2", approvedBy: "Manager One" },
    { id: 3, requestDate: "2021-09-03", amount: 30000000, status: "rejected", branch: "Branch 3", approvedBy: null },
  ];

  const FloatLedgers: FloatLedger[] = [
    { id: 1, date: "2021-09-01", description: "Recharge", amount: 120000000, balance: 120000000 },
    // { id: 2, date: "2021-09-02", description: "Branch 1", amount: -20000000, balance: 300000000 },
  ];

  const BackofficeUsers: BackofficeUser[] = [
    { id: 1, username: "admin1", fullName: "Jack Mwebe", role: "Administrator", branch: "Branch 1", status: "Active" },
    { id: 2, username: "manager1", fullName: "Katamba Johnson", role: "Manager", branch: "Branch 2", status: "Active" },
    { id: 3, username: "admin2", fullName: "Kasule Ronald", role: "Administrator", branch: "Branch 3", status: "Inactive" },
  ];

  //  branch manager data
  const BranchManagers: BranchManager[] = [
    { id: 1, username: "manager1", fullName: "Manager User One", role: "Manager", branch: "Branch 1", status: "Active" },
    { id: 2, username: "manager2", fullName: "Manager User Two", role: "Manager", branch: "Branch 2", status: "Active" },
    { id: 3, username: "manager3", fullName: "Manager User Three", role: "Manager", branch: "Branch 3", status: "Inactive" },
  ];

  //  float assignment data
  const FloatAllocations: FloatAllocation[] = [
    { id: 1, dateAssigned: "2021-09-01", amount: 20000000, status: "Allocated", branch: "Branch 1" },
    { id: 2, dateAssigned: "2021-09-02", amount: 21000000, status: "pending", branch: "Branch 2" },
    { id: 3, dateAssigned: "2021-09-03", amount: 37000000, status: "failed", branch: "Branch 3" },
  ];


  // State variables
  const transactions = ref<Transaction[]>(Transactions); // Use  data for now
  const totalAmount = ref(600); // Set a test value
  const totalBalance = ref(3000); // Set a test value
  const floatLedgers = ref<FloatLedger[]>(FloatLedgers); // Use  data for now
  const backofficeUsers = ref<BackofficeUser[]>(BackofficeUsers);
  const branchManagers = ref<BranchManager[]>(BranchManagers);
  const floatAllocations = ref<FloatAllocation[]>(FloatAllocations);
  const floatRequests = ref<FloatRequest[]>(FloatRequests);


  // const floatRequests = JSON.parse(localStorage.getItem('floatRequestToBranchManagerLocalStorage') || '[]');

  // if (floatRequests) {
  //   floatRequests.value = floatRequests;
  // }


  // Actions to fetch data
  async function fetchTransactions(filter: any) {
    // Simulate API call
    // const response = await fetch(`/api/transactions?limit=${filter.limit}&page=${filter.page}`);
    // const data = await response.json();
    // Use  data for now
    transactions.value = Transactions;
    // totalAmount.value = 600;  // Set a test value
    // totalBalance.value = 300000000; // Set a test value
  }

  async function fetchFloatLedgers(filter: any) {
    // Simulate API call
    // const response = await fetch(`/api/float-ledgers?limit=${filter.limit}&page=${filter.page}`);
    // const data = await response.json();
    // Use  data for now
    floatLedgers.value = FloatLedgers;
  }

  async function fetchBackofficeUsers(filter: any) {
    // Simulate API call
    // You can adjust this based on the filtering criteria or paging
    backofficeUsers.value = BackofficeUsers;
  }

  async function fetchBranchManagers(filter: any) {
    // Simulate API call
    // You can adjust this based on the filtering criteria or paging
    branchManagers.value = BranchManagers;
  }

  async function fetchFloatAllocations(filter: any) {
    // Simulate API call
    // You can adjust this based on the filtering criteria or paging
    floatAllocations.value = FloatAllocations;
  }

  async function fetchFloatRequests() {
    // Simulate API call
    // You can adjust this based on the filtering criteria or paging
    floatRequests.value = FloatRequests;
  }

  // function submit() {
  //   let payload = {
  //     amount: form.firstName,
  //     branchId: form.branchId,
  //   };
  //   loading.value = true;
  //   store
  //     .allocateFloat(payload)
  //     .then(() => {
  //       loading.value = false;
  //       notify.success(`Float assigned to ${form.branchId}.`);
  //       emit("cancel");
  //     })
  //     .catch(() => {
  //       loading.value = false;
  //     });
  // }

  // allocate float function, push to the float allocation array
  function allocateFloat(payload: AllocateFloat) {
    floatAllocations.value.push({
      id: floatAllocations.value.length + 1,
      dateAssigned: new Date().toISOString(),
      amount: payload.amount,
      status: "Allocated",
      branch: payload.branchId,
    })
    //save to localstorage
    // saveTransactionsToLocalStorage();
  }

  const branchManagerFloatBalance = ref(0);

  // const saveTransactionsToLocalStorage = () => {
  //   localStorage.setItem('branchManagerFloatBalance', JSON.stringify(floatAllocations.value))
  // }

  // const savedFloatManagerBalance = JSON.parse(localStorage.getItem('branchManagerFloatBalance') || '0');

  // if (savedFloatManagerBalance) {
  //   branchManagerFloatBalance.value = savedFloatManagerBalance;
  // }


  // pass in the requestId
  // const approveFloatRequest = (requestId: any) => {
  //   store.approveFloatRequest(requestId);
  //   store.fetchFloatRequests();
  //   balanceStore.approveFloatRequest(requestId);
  //   store.reduceFloatLedger(requestId); 
  //   store.allocateFloat(requestId);
  //   console.log(`float request with id ${requestId} approved`);
  // };

  // allocate float based on approved float request
  function allocateFloatFromRequest(requestId: any) {
    const floatRequest = floatRequests.value.find((request) => request.id === requestId);
    if (floatRequest) {
      floatAllocations.value.push({
        id: floatAllocations.value.length + 1,
        dateAssigned: new Date().toISOString(),
        amount: floatRequest.amount,
        status: "Allocated",
        branch: floatRequest.branch,
      });


      // allocateFloatFromRequestToLocalStorage.value.push({
      //   id: allocateFloatFromRequestToLocalStorage.value.length + 1,
      //   dateAssigned: new Date().toISOString(),
      //   status: "Allocated",
      //   payload: floatRequest.amount,
      //    branchId: floatRequest.branch,
      // })
      // saveFloatRequestToLocalStorage();
    }
    //save to localstorage
    // allocateFloatFromRequestToLocalStorage.value.push({
    //   id: allocateFloatFromRequestToLocalStorage.value.length + 1,
    //   dateAssigned: new Date().toISOString(),
    //   status: "Allocated",
    //   payload: floatRequest.amount,
    //    status: "Allocated",
    //    branchId: floatRequest.branch,
    // })
    // saveFloatRequestToLocalStorage();
  }

  // const allocateFloatFromRequestToLocalStorage = ref<FloatRequest[]>([]);

  // const saveFloatRequestToLocalStorage = () => {
  //   localStorage.setItem('allocateFloatFromRequestToLocalStorage', JSON.stringify(allocateFloatFromRequestToLocalStorage.value))
  // }
  // allocate float allocation to float ledger array
  function adjustFloatLedger(payload: AllocateFloat) {
    floatLedgers.value.push({
      id: floatLedgers.value.length + 1,
      date: new Date().toISOString(),
      // description: "Branch " + payload.branchId,
      description: payload.branchId,
      amount: -payload.amount,
      // balance: totalBalance.value + payload.amount,
    })
  }

  //   const allocateFloatFromRequestToLocalStorage = ref<FloatRequest[]>([]);

  // const saveFloatRequestToLocalStorage = () => {
  //   localStorage.setItem('allocateFloatFromRequestToLocalStorage', JSON.stringify(allocateFloatFromRequestToLocalStorage.value))
  // }

  // pass in the requestId
  // const approveFloatRequest = (requestId: any) => {
  //   store.approveFloatRequest(requestId);
  //   store.fetchFloatRequests();
  //   balanceStore.approveFloatRequest(requestId);
  //   store.reduceFloatLedger(requestId); 
  //   console.log(`float request with id ${requestId} approved`);
  // };

  async function reduceFloatLedger(requestId: any) {
    //  This is local storage 
    // end of local storage

    console.log("Approving float request with ID:", requestId);
    // Simulate API call
    // const response = await fetch(`/api/float-requests/${requestId}/approve`, {
    //   method: "POST",
    // });
    // const data = await response.json();

    // use request in floatledgers array id to figure out amount 
    const floatRequest = floatRequests.value.find(
      (request) => request.id === requestId
    );
    if (!floatRequest) {
      console.error("Float request not found");
      return;
    }
    floatLedgers.value.push({
      id: floatLedgers.value.length + 1,
      date: new Date().toISOString(),
      description: floatRequest.branch,
      amount: -floatRequest.amount,
      // balance: 300000000 - floatRequest.amount,
    });
  }


  // const rejectFloatRequest = (requestId: any) => {
  //   store.rejectFloatRequest(requestId);
  //   store.fetchFloatRequests();
  //   console.log(`float request with id ${requestId} rejected`);
  // };



  // const approveFloatRequest = (requestId: any) => {
  //   store.approveFloatRequest(requestId);
  // };

  // const rejectFloatRequest = (requestId: any) => {
  //   store.rejectFloatRequest(requestId);
  // };

  // approve float request using passed in Id and set status to approved
  // function approveFloatRequest(requestId: any) {
  //   const floatRequest = floatRequests.value.find((request) => request.id === requestId);
  //   if (floatRequest) {
  //     floatRequest.status = "Approved";
  //     floatRequest.approvedBy = "Manager One";
  //   }
  // }

  // approve float request using passed in Id and set status to approved and modify the floatrequests array
  function approveFloatRequest(requestId: any) {
    console.log("changing status")
    const floatRequest = floatRequests.value.find((request) => request.id === requestId);
    if (floatRequest) {
      floatRequest.status = "approved";
      // floatRequest.approvedBy = "Manager One";
    }
  }
    //edit float request amount and allocated the new amount inserted in the form
    async function editFloatRequest(requestId: any, payload: any) {
      try {
        const floatRequest = floatRequests.value.find((request) => request.id === requestId);
        if (!floatRequest) {
          console.error("Float request not found for ID:", requestId);
          return;
        }
  
        const { data } = await api.put("/branch-manager/update-float-request/" + requestId, {
          amount: payload.amount,
          till: payload.till,
          // status: "request edited",
          status: "edited",
          description: payload.description,
          approvedBy: "Manager One",
        });
        floatRequests.value = data.data;
        console.log("Float Requests:", floatRequests.value);
  
          // Approve the ledger entry if applicable
          if (floatRequest.ledgerId) {
            api.put(`/branch-manager/update-float-ledger/${floatRequest.ledgerId}`, {
              amount: payload.amount,
              till: payload.till,
              // status: "request edited",
              status: "edited",
              description: payload.description,
              approvedBy: "Manager One",
            });
          }
      } catch (error) {
        console.error("Error editing float request:", error);
      }
    }

  // reject float request using passed in Id and set status to rejected
  function rejectFloatRequest(requestId: any) {
    const floatRequest = floatRequests.value.find((request) => request.id === requestId);
    if (floatRequest) {
      floatRequest.status = "rejected";
    }
  }

  return {
    transactions,
    totalAmount,
    totalBalance,
    floatLedgers,
    backofficeUsers,
    branchManagers,
    floatAllocations,
    floatRequests,
    branchManagerFloatBalance,
    reduceFloatLedger,
    approveFloatRequest,
    adjustFloatLedger,
    rejectFloatRequest,
    fetchFloatRequests,
    editFloatRequest,
    fetchTransactions,
    fetchFloatLedgers,
    fetchBackofficeUsers,
    fetchBranchManagers,
    fetchFloatAllocations,
    allocateFloat,
    allocateFloatFromRequest,
  };
});
