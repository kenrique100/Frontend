import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "./Helpers";

export const PoultryApi = {
  getAllFlocks,
  createFlock,
  updateFlock,
  deleteFlock,
  getSamplingDataByFlock,
  createFlockSample,
  updateFlockSample,
  deleteFlockSample,
  getFeedingDataByFlock,
  createFlockFeeding,
  updateFlockFeeding,
  deleteFlockFeeding,
  getFlockArchives
};

function getAllFlocks(user) {
  return instance.get("/kbf/api/1.0/flocks", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function getFlockArchives(user) {
  return instance.get("/kbf/api/1.0/flock-history", {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createFlock(user, flock) {
  return instance.post("/kbf/api/1.0/flock", flock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateFlock(user, flockId, flock) {
  return instance.put(`/kbf/api/1.0/flock/${flockId}`, flock, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function deleteFlock(user, flockId) {
  return instance.delete(`/kbf/api/1.0/flock/${flockId}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function getSamplingDataByFlock(user, flockId) {
  return instance.get(`/kbf/api/1.0/birdsample/${flockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}
function createFlockSample(user, flockId, sample, flockType) {
  return instance.post(
    `/kbf/api/1.0/birdsample/${flockId}/${flockType}`,
    sample,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: bearerAuth(user),
      },
    }
  );
}

function updateFlockSample(user, sampleId, sample, flockType) {
  return instance.put(
    `/kbf/api/1.0/birdsample/${sampleId}/${flockType}`,
    sample,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: bearerAuth(user),
      },
    }
  );
}
function deleteFlockSample(user, sampleId) {
  return instance.delete(`/kbf/api/1.0/birdsample/${sampleId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getFeedingDataByFlock(user, flockId) {
  return instance.get(`/kbf/api/1.0/birdfeed/${flockId}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function createFlockFeeding(user, flockId, feed) {
  return instance.post(`/kbf/api/1.0/birdfeed/${flockId}`, feed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function updateFlockFeeding(user, feedingId, feed) {
  return instance.put(`/kbf/api/1.0/birdfeed/${feedingId}`, feed, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function deleteFlockFeeding(user, feedingId) {
  return instance.delete(`/kbf/api/1.0/birdfeed/${feedingId}`, {
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
