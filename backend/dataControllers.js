const data = require("./data");

// getAllCenters
exports.getAllCenter = async (req, res) => {
  let centers = []; //{name, id}
  data.map((record, i) => {
    let found = 0;
    for (let j = 0; j < centers.length; j++) {
      if (centers[j].name === record.location) {
        found = 1;
        break; //duplicate center
      }
    }
    if (!found)
      centers.push({
        name: record.location,
        id: i,
      });
  });

  return res.status(200).json({
    success: true,
    centers,
  });
};

// getAllRooms
exports.getAllRooms = async (req, res) => {
  if (!req.query.centerName) {
    let rooms = [{}];
    return res.status(200).json({
      success: true,
      rooms,
    });
  }
  const centerName = req.query.centerName;
  let filterData = data.filter((records) => {
    return records.location === centerName;
  });

  let rooms = []; //{roow, id}

  filterData.map((record, i) => {
    let found = 0;
    for (let j = 0; j < rooms.length; j++) {
      if (rooms[j].name === record.room) {
        found = 1;
        break;
      }
    }
    if (!found)
      rooms.push({
        name: record.room,
        id: i,
      });
  });

  return res.status(200).json({
    success: true,
    rooms,
  });
};

// getData
exports.getAllData = async (req, res) => {
  if (
    !req.query ||
    (req.query.center === "" && req.query.room === "") ||
    (req.query.center === undefined && req.query.room === undefined)
  ) {
    return res.status(200).json({
      success: true,
      data,
    });
  }

  let query = req.query;
  let filterData = [];
  if (
    query.room !== "" &&
    query.center !== "" &&
    query.room !== undefined &&
    query.center !== undefined
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].location === query.center && data[i].room === query.room)
        filterData.push(data[i]);
    }
  } 
  else if (query.center !== "") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].location === query.center) filterData.push(data[i]);
    }
  }
  res.status(200).json({
    success: true,
    data: filterData,
  });
};
