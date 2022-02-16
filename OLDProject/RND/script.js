// main cable information
const mainCable = {
  totalCore: 4,
  coordinates: [],
  coreUsed: {
    blue: null,
    orange: null,
    green: null,
    brown: null,
  },
};
// console.log(mainCable);

// Point To Point (company)
const PointToPoint = {
  portNo: '1',
  companyName: 'unknown',
  coordinates: [],
  coreColor: 'blue',
};

// main local line
const mainLocal = {
  coreColor: 'orange',
  oltSwitchNo: '32323',
  portNo: '1',
  oltType: 'EPON' || 'GPON',
  coordinates: [],
  totalConnectionLimit: 64,
  totalUsedConnection: 12,
  oltPorts: {
    1: null,
    2: null,
    3: null,
    4: null,
  },
};

// local Splitter connection
const localSplitter = {
  splitterType: '1/4',
  coordinates: [],
  oltPort: 1,
  coreUsed: {
    blue: null,
    orange: null,
    green: null,
    brown: null,
  },
};

// home connection
const homeConnection = {
  onuNo: '34234234',
  coordinates: [],
};
