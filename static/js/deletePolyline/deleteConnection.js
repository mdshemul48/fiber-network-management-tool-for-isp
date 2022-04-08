import { showError } from '../utility/showMessageAndError.js';

export default async (type, id) => {
  const confirmBar = confirm(
    'Are you sure you want to delete this connection?'
  );
  if (!confirmBar) {
    return;
  }

  let url;
  if (type === 'pointToPoint') {
    url = `/api/ptp-connection?id=${id}`;
  } else if (type === 'corporate') {
    url = `/api/corporate-connection?id=${id}`;
  } else if (type === 'reseller') {
    url = `/api/reseller-connection?id=${id}`;
  } else if (type === 'localFiber') {
    url = `/api/local-fiber-connection?id=${id}`;
  } else if (type === 'splitter') {
    url = `/api/splitter-connection?id=${id}`;
  } else if (type === 'home') {
    url = `/api/home-connection?id=${id}`;
  } else {
    alert('error from Mars');
    return;
  }

  const response = await fetch(url, {
    method: 'DELETE',
  });

  const { status, message } = await response.json();
  if (status !== 'success') {
    showError(message);
  }
  return { status };
};
