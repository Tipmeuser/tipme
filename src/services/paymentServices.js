import INSTANCE from './api';
import SERVICE_URL from './serviceUrl';

const getUserById = async (id) => {
    try {
      const requestUrl = `${SERVICE_URL.USER}/${id}`;
      const response = await INSTANCE.get(requestUrl);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };
  const getSplitWorkersDetails = async (workerId) => {
    try {
      const requestUrl = `${SERVICE_URL.SPLIT_WORKER_DETAILS}/${workerId}`;
      const response = await INSTANCE.get(requestUrl);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };
  const getAdminBankDetails = async () => {
    try {
      const requestUrl = SERVICE_URL.ADMIN_BANK_DETAILS;
      const response = await INSTANCE.get(requestUrl);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };

  const createPaymentIntent = async (data) => {
    try {
      const requestUrl = SERVICE_URL.PAYMENT_INTENT;
      const response = await INSTANCE.post(requestUrl, data);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };

  const createTransfer = async (data) => {
    try {
      const requestUrl = SERVICE_URL.CREATE_TRANSFER;
      const response = await INSTANCE.post(requestUrl, data);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };

  const getCustomerPaymentMethod = async (queryParams) => {
    try {
      const requestUrl = SERVICE_URL.GET_PAYMENT_METHOD;
      const response = await INSTANCE.get(requestUrl, { params: queryParams });
      return response.data;
    } catch (erry) {
      return err?.response?.data;
    }
  };

  const createTransaction = async (data) => {
    try {
      const requestUrl = SERVICE_URL.CREATE_TRANSACTION;
      const response = await INSTANCE.post(requestUrl, data);
      return response.data;
    } catch (err) {
      return err?.response?.data;
    }
  };

  export default {
    getUserById,
    getSplitWorkersDetails,
    getAdminBankDetails,
    createPaymentIntent,
    createTransfer,
    getCustomerPaymentMethod,
    createTransaction
  };
  
  