<script setup lang="ts">
// import type { CreateAccount } from "@/types";
import { type Ref, ref, reactive, onMounted, defineEmits } from "vue";
import { useBilling } from "@/branchmanagerdomain/finances/stores";
import { useNotificationsStore } from "@/stores/notifications";
import { useTillStore } from "@/branchmanagerdomain/tills/stores";
import type { AllocateFloat } from "@/types";
import { useBalance } from "@/branchmanagerdomain/balance/stores";

const tillStore = useTillStore();
const balanceStore = useBalance();
const billingStore = useBilling();

// allocate float form
const form: AllocateFloat = reactive({
  firstName: "",
  branchId: null,
});

const notify = useNotificationsStore();
const loading: Ref<boolean> = ref(false);
const emit = defineEmits(["cancel", "floatAllocated"]);
const store = useBilling();
// function submit() {
//   loading.value = true
//   store.createAccount(form)
//     .then(() => {
//       loading.value = false
//       notify.success(`An account verification email has been sent to ${form.username.toLowerCase()}.`)
//       emit("cancel")
//     })
//     .catch(() => {
//       loading.value = false
//     })
// }

// submit function to assign float
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

// function submit() {
//  let payload = {
//     amount: form.amount,
//     branchId: form.branchId,
//   };
//   loading.value = true;
//   store.allocateFloat(payload) // Simply add the branch
//   billingStore.adjustFloatLedger(payload);
//   balanceStore.decreaseTotalBalance(payload.amount);
//    notify.success(`Float allocated to ${form.branchId}.`)
//   emit("floatAllocated");
//   loading.value = false;
// }

// function submit() {
//    let payload = {
//     amount: form.amount,
//     branchId: form.branchId,
//   };
//   console.log("Payload:", payload);
//   console.log("Initial balance:", balanceStore.totalBalance.value);
//   balanceStore.decreaseTotalBalance(payload.amount);
//   console.log("Updated balance:", balanceStore.totalBalance.value);
// }

function submit() {
  const payload = {
    amount: form.amount,
    branchId: form.branchId,
  };

  console.log("Submitting payload:", payload);

  loading.value = true;
  store.allocateFloat(payload); // API call to allocate float
  // .then(() => {
  billingStore.adjustFloatLedger(payload); // Adjust ledger
  balanceStore.decreaseTotalBalance(payload.amount); // Update balance
  // notify.success(`Float allocated to branch: ${form.branchId}`);
  notify.success(`Float allocated to ${form.branchId}`);
  emit("floatAllocated");
  // })
  // .catch((err) => {
  // console.error("Error allocating float:", err);
  // notify.error("Failed to allocate float.");
  // })
  // .finally(() => {
  // loading.value = false;
  // });
}

onMounted(() => {
  // loading.value = true;
  tillStore.fetchTills();
  // .finally(() => (loading.value = false));
});
</script>

<template>
  <div class="bg-white py-5">
    <p class="text-xl font-bold">Allocate Float</p>
    <p class="text-sm text-gray-500">
      The allocation of funds by a Super Agent to a designated branch or till to
      ensure liquidity for transactions and service delivery.
    </p>
    <form @submit.prevent="submit" class="pt-5">
      <div class="flex">
        <div class="cell-full">
          <label class="block uppercase text-neutral-600 text-xs font-bold mb-1"
            >Amount (UGX)</label
          >
          <input
            autocomplete="off"
            type="number"
            v-model.number="form.amount"
            class="noFocus form-element e-input w-full"
            required
          />
          <span v-if="form.amount">
            <pre class="font-semibold text-green-600 py-2"
              >{{ form.amount.toLocaleString() }}/=</pre
            >
          </span>
        </div>
      </div>

      <div class="flex">
        <!-- <div class="cell">
          <label class="block uppercase text-neutral-600 text-xs font-bold mb-1">Email Address</label>
          <input autocomplete="off" type="email" v-model="form.username" class="noFocus form-element e-input w-full"
            required />
        </div> -->
        <!-- <div class="cell">
          <label class="block uppercase text-neutral-600 text-xs font-bold mb-1">Phone Number</label>
          <input autocomplete="off" type="tel" v-model="form.phone" class="noFocus form-element e-input w-full"
            required />
        </div> -->
      </div>

      <!-- <div class="flex">
        <div class="cell-full">
          <label class="block uppercase text-neutral-600 text-xs font-bold mb-1">Select Branch</label>
          <select autocomplete="off" v-model="form.role" class="noFocus form-element e-input w-full">
            <option value="public">Branch</option>
            <option value="public">Branch</option>
          </select>
        </div>
      </div> -->

      <div class="">
        <label class="block uppercase text-neutral-600 text-xs font-bold mb-1"
          >Select Branch</label
        >
        <select
          v-model="form.branchId"
          class="noFocus form-element e-input w-full"
        >
          <option :value="null">-- Select Branch --</option>
          <option
            v-for="(branch, idx) in tillStore.branches"
            :key="idx"
            :value="branch.name"
          >
            {{ branch.name }}
          </option>
        </select>
      </div>

      <div class="flex my-2 py-5">
        <div class="w-6/12 px-1">
          <button class="button-outline" type="button" @click="emit('cancel')">
            <i class="fa-solid fa-ban"></i> Cancel
          </button>
        </div>
        <div class="w-6/12 px-1">
          <button class="button" type="submit">
            <i class="fa-solid fa-hand-pointer"></i> Submit

            <span class="lds-ring mx-1" v-if="loading">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "@/assets/styles/button.css";
@import "@/assets/styles/forms.css";
@import "@/assets/styles/ring.css";
@import "@/assets/styles/ripple.css";

.cell {
  @apply w-6/12 px-1 my-2;
}

.cell-full {
  @apply w-full px-1 my-2;
}
</style>@/branchmanagerdomain/finances/stores@/branchmanager/tills/stores@/branchmanager/balance/stores