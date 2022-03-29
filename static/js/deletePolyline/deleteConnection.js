export default async (type, id, subId) => {
  let url;
  if (type === 'pointToPoint') {
    url = `/api/ptp-connection?id=${id}`;
  } else if (type === 'corporate') {
    url = `/api/corporate-connection?id=${id}`;
  } else if (type === 'reseller') {
    url = `/api/reseller-connection?id=${id}`;
  } else if (type === 'localFiber') {
    url = `/api/local-fiber-connection?id=${id}&subId=${subId}`;
  } else {
    alert('error');
    return;
  }

  const response = await fetch(url, {
    method: 'DELETE',
  });

  const { status, message } = await response.json();
  if (status === 'success') {
    location.reload();
  } else {
    alert(message);
  }
};
