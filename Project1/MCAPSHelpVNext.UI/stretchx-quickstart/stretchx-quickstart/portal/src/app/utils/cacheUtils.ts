const getCurrentTimestamp = () => Math.floor(new Date().getTime() / 1000);

const getDataFromCache = (key) => {
  const cachedData = JSON.parse(localStorage.getItem(key)) || {};
  const { data, timestamp } = cachedData;

  // Check if data is present and the cache is not older than 30 minutes
  if (data && timestamp && getCurrentTimestamp() - timestamp < 30 * 60) {
    return data;
  }

  return null;
};

const setDataToCache = (key, data) => {
  const cachedData = {
    data,
    timestamp: getCurrentTimestamp(),
  };
  localStorage.setItem(key, JSON.stringify(cachedData));
};

export { getDataFromCache, setDataToCache };
