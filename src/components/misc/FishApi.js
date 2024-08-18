import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "./Helpers";

export const FishApi = {  
  getPond,
  createPond,
  updatePond,
  deletePond,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  getSamplingDataByStock,
  createSample,
  updateSample,
  deleteSample,
  getFeedingDataByStock,
  createFeeding,
  updateFeeding,
  deleteFeeding,
  getStockHistory
};


function getPond(user) {
  return instance.get("/kbf/api/1.0/pond", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createPond(user, pond) {
  return instance.post("/kbf/api/1.0/pond", pond, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updatePond(user, pondId, pond) {
  return instance.put(`/kbf/api/1.0/pond/${pondId}`, pond, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deletePond(user, pondId) {
  return instance.delete(`/kbf/api/1.0/pond/${pondId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getStock(user) {
  return instance.get("/kbf/api/1.0/fishstock", {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getStockHistory(user) {
  return instance.get("/kbf/api/1.0/fishstock-history", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createStock(user, stock) {
  return instance.post("/kbf/api/1.0/fishstock", stock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateStock(user, stockId, stock) {
  return instance.put(`/kbf/api/1.0/fishstock/${stockId}`, stock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteStock(user, stockId) {
  return instance.delete(`/kbf/api/1.0/fishstock/${stockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getSamplingDataByStock(user, stockId) {
  return instance.get(`/kbf/api/1.0/sample/${stockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createSample(user, stockId, sample) {
  return instance.post(`/kbf/api/1.0/sample/${stockId}`, sample, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateSample(user, sampleId, sample) {
  return instance.put(`/kbf/api/1.0/sample/${sampleId}`, sample, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteSample(user, sampleId) {
  return instance.delete(`/kbf/api/1.0/sample/${sampleId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getFeedingDataByStock(user, stockId) {
  return instance.get(`/kbf/api/1.0/fishfeed/${stockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createFeeding(user, stockId, feed) {
  return instance.post(`/kbf/api/1.0/fishfeed/${stockId}`, feed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateFeeding(user, feedingId, feed) {
  return instance.put(`/kbf/api/1.0/fishfeed/${feedingId}`, feed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteFeeding(user, feedingId) {
  return instance.delete(`/kbf/api/1.0/fishfeed/${feedingId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

/* function numberOfUsers() {
  return instance.get("/public/numberOfUsers");
}

function numberOfOrders() {
  return instance.get("/public/numberOfOrders");
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : "/api/users";
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getOrders(user, text) {
  const url = text ? `/api/orders?text=${text}` : "/api/orders";
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteOrder(user, orderId) {
  return instance.delete(`/api/orders/${orderId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createOrder(user, order) {
  return instance.post("/api/orders", order, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function getUserMe(user) {
  return instance.get("/api/users/me", {
    headers: { Authorization: bearerAuth(user) },
  });
}
 */
// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        window.location.href = "/login";
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`;
}
