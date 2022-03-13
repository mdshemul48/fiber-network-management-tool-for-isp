exports.createSplitterConnection = async (req, res) => {
  const {
    parent,
    parentType,
    name,
    type,
    coordinates,
    splitterLimit,
    color,
    portNo,
  } = req.body;

  let reseller;
  if (parentType === 'reseller') {
  }

  console.log(req.body);
  res.send('gggs');
};
