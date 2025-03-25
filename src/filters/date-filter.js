import moment from "moment";

export default (value) => {
  const dateObject = moment(value);
  return dateObject.format("MMMM Do, YYYY");
};
