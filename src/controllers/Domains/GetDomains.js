const axios = require("axios");

exports.getAllDomains = async (req, res) => {
  const data = JSON.stringify({
    secretapikey: process.env.PORKBUN_SECRET_KEY,
    apikey: process.env.PORKBUN_API_KEY,
    start: "0",
    includeLabels: "yes",
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.porkbun.com/api/json/v3/domain/listAll",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    let domains = response.data.domains || [];
    // Set status to 'EXPIRED' if expireDate is in the past
    const now = new Date();
    domains = domains.map((domain) => {
      if (domain.expireDate) {
        // Convert to ISO format for reliable parsing
        const exp = new Date(domain.expireDate.replace(" ", "T"));
        if (!isNaN(exp) && exp < now) {
          return { ...domain, status: "EXPIRED" };
        }
      }
      return domain;
    });
    res.json(domains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the count of ACTIVE domains
exports.countActiveDomains = async (req, res) => {
  const data = JSON.stringify({
    secretapikey: process.env.PORKBUN_SECRET_KEY,
    apikey: process.env.PORKBUN_API_KEY,
    start: "0",
    includeLabels: "yes",
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.porkbun.com/api/json/v3/domain/listAll",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    let domains = response.data.domains || [];
    const now = new Date();
    const activeCount = domains.filter((domain) => {
      if (domain.expireDate) {
        const exp = new Date(domain.expireDate.replace(" ", "T"));
        return !isNaN(exp) && exp >= now;
      }
      return true; // If no expireDate, consider as active
    }).length;
    res.json({ count: activeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the count of EXPIRED domains
exports.countExpiredDomains = async (req, res) => {
  const data = JSON.stringify({
    secretapikey: process.env.PORKBUN_SECRET_KEY,
    apikey: process.env.PORKBUN_API_KEY,
    start: "0",
    includeLabels: "yes",
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.porkbun.com/api/json/v3/domain/listAll",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    let domains = response.data.domains || [];
    const now = new Date();
    const expiredCount = domains.filter((domain) => {
      if (domain.expireDate) {
        const exp = new Date(domain.expireDate.replace(" ", "T"));
        return !isNaN(exp) && exp < now;
      }
      return false;
    }).length;
    res.json({ count: expiredCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
