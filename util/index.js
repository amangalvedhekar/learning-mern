const sendResponseObject = (
  res,
  statusNumber = 200,
  responseObject,
  requestBody
) => {
  console.log(`response sent with`, requestBody);
  return res
    .status(statusNumber)
    .json(responseObject);
};

module.exports = {
  sendResponseObject,
};
