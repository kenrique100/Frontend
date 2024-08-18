import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "./Helpers";

export const FarmSuppliesApi = {
  getFeedStock,
  createFeedStock,
  updateFeedStock,
  deleteFeedStock,
  getMixedFeed,
  createMixedFeed,
  updateMixedfeed,
  deleteMixedfeed,
  getMixedFeedByFlockId,
  createMixedFeedByFlockId,
  getMixedFeedByFishStockId,
  createMixedFeedByFishStockId,
  updateFeedStockUsage,
};

function getFeedStock(user) {
  return instance.get("/kbf/api/1.0/feedstock", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createFeedStock(user, feedstock) {
  return instance.post("/kbf/api/1.0/feedstock", feedstock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateFeedStock(user, feedStockId, feedstock) {
  return instance.put(`/kbf/api/1.0/feedstock/${feedStockId}`, feedstock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateFeedStockUsage(user, feedStockId, feedstock) {
  return instance.put(
    `/kbf/api/1.0/feedstock/usage/${feedStockId}`,
    feedstock,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: bearerAuth(user),
      },
    }
  );
}
function deleteFeedStock(user, feedStockId) {
  return instance.delete(`/kbf/api/1.0/feedstock/${feedStockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getMixedFeed(user) {
  return instance.get("/kbf/api/1.0/provender", {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createMixedFeed(user, mixedfeed) {
  return instance.post("/kbf/api/1.0/provender", mixedfeed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function getMixedFeedByFlockId(user, flockId) {
  return instance.get(`/kbf/api/1.0/birdprovender/${flockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createMixedFeedByFlockId(user, mixedfeed, flockId) {
  return instance.post(`/kbf/api/1.0/birdprovender/${flockId}`, mixedfeed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function getMixedFeedByFishStockId(user, stockId) {
  return instance.get(`/kbf/api/1.0/fishprovender/${stockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createMixedFeedByFishStockId(user, mixedfeed, stockId) {
  return instance.post(`/kbf/api/1.0/fishprovender/${stockId}`, mixedfeed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function updateMixedfeed(user, mixedfeedId, mixedfeed) {
  return instance.put(`/kbf/api/1.0/provender/${mixedfeedId}`, mixedfeed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteMixedfeed(user, mixedfeedId) {
  return instance.delete(`/kbf/api/1.0/provender/${mixedfeedId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}
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
