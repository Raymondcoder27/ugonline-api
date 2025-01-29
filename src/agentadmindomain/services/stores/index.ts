import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import api from "@/config/api";
import type { Service, ServiceResponseInterface, ServiceSpecification } from "@/agentadmindomain/services/types";

export const useServicesStore = defineStore("services", () => {
  const services: Ref<Service[] | undefined> = ref();
  const subscribedServices: Ref<Service[] | undefined> = ref();
  const service: Ref<Service | undefined> = ref();
  const serviceSpecification: Ref<ServiceSpecification | undefined> = ref();
  const serviceSpecifications: Ref<ServiceSpecification[] | undefined> = ref();
  const isLoading: Ref<boolean> = ref(false);
  
  // Core service management functions
  async function fetchServices(filter: any) {
    isLoading.value = true;
    try {
      const { data } = await api.get("/agent-admin/services", { params: filter });
      services.value = data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchSubscribedServices(filter: any) {
    isLoading.value = true;
    try {
      const { data } = await api.get("/agent-admin/services", { 
        params: { ...filter, subscribed: true } 
      });
      subscribedServices.value = data;
    } catch (error) {
      console.error("Error fetching subscribed services:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function subscribeToService(serviceId: string) {
    isLoading.value = true;
    try {
      await api.post(`/agent-admin/subscribe-to-service/${serviceId}`);
      await Promise.all([fetchServices({}), fetchSubscribedServices({})]);
    } catch (error) {
      console.error("Error subscribing to service:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function unsubscribeFromService(serviceId: string) {
    isLoading.value = true;
    try {
      await api.post(`/agent-admin/unsubscribe-from-service/${serviceId}`);
      await Promise.all([fetchServices({}), fetchSubscribedServices({})]);
    } catch (error) {
      console.error("Error unsubscribing from service:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  // Service specification functions (keep original implementation)
  const createService = async (payload: any) => {
    return api.post<ServiceResponseInterface>("/registry/v1/create", payload)
      .then((response: any) => {
        createServiceResponse.value = response.data;
      });
  };

  const findServiceSpecById = async (id: any) => {
    return api.get("/registry/v1/specs/" + id + "/list")
      .then((response: any) => {
        serviceSpecifications.value = response.data.data;
      });
  };

  // Removed local storage interactions and hardcoded data
  // Keep other original functions that don't conflict with agent-admin endpoints

  return {
    services,
    subscribedServices,
    service,
    serviceSpecification,
    serviceSpecifications,
    isLoading,
    fetchServices,
    fetchSubscribedServices,
    subscribeToService,
    unsubscribeFromService,
    createService,
    findServiceSpecById,
    // Include other original functions as needed
  };
});